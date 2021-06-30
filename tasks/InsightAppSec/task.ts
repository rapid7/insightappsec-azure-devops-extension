//Grab the vsts task library helpers
import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');
import path = require('path');
import fs = require('fs');
var AdmZip = require('adm-zip');
import InsightAppSecApi from './helpers/insightAppSecApi';

const metricsFileName = "insightappsec-scan-metrics.json";
const findingsFileName = "insightappsec-scan-findings.json";
const reportOutputFolderName = "Rapid7_Report_Output";
const UUID_REGEX = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/

async function run() {
    try {

        var appId;
        var appName;
        var scanConfigId;
        var scanConfigName;
        // Retrieve user input
        var appInput = tl.getInput("application");
        var scanConfigInput = tl.getInput("scanConfig");
        var waitForCompletion = tl.getBoolInput("waitForCompletion");
        var hasTimeout = tl.getBoolInput("hasTimeout");
        var hasScanGating = tl.getBoolInput("hasScanGating");
        var generateFindingsReport = tl.getBoolInput("generateFindingsReport");
        var publishPipelineArtifactsBool = tl.getBoolInput("publishPipelineArtifacts");
        var artifactPerReport = tl.getBoolInput("artifactPerReport");

        var debugModeStr = tl.getVariable("system.debug");
        var debugMode = false;
        if (debugModeStr == 'true'){
            debugMode = true;
        }
        console.log("Debug mode: " + debugMode);

        // Retrieve the connection that the user selected
        var connectedService = tl.getInput("apiConnection", true);
        var region = tl.getEndpointDataParameter(connectedService, "region", true);
        var endpointAuth = tl.getEndpointAuthorization(connectedService, true);
        var endpoint = "https://" + region + ".api.insight.rapid7.com/ias/v1";
        var apiKey = endpointAuth.parameters["apitoken"];
        
        var scanCheckInterval = 0;
        var scanTimeout = 0;
        var vulnQuery = "";

        // Retrieve params if their parent fields were selected as true
        if (waitForCompletion)
        {
            scanCheckInterval = parseInt(tl.getInput("scanCheckInterval"));
        }
        if (hasTimeout)
        {
            scanTimeout = parseInt(tl.getInput("timeout"));
        }
        if (hasScanGating)
        {
            vulnQuery = tl.getInput("vulnQuery");
        }

        var scanId;
        var iasApi = new InsightAppSecApi(endpoint, apiKey, debugMode);

        // Check if input is in UUID format to determine whether to get name or ID from API
        let appUuidMatch = UUID_REGEX.exec(appInput);
        if (appUuidMatch){
            appId = appInput;
            appName = await iasApi.getAppName(appId);
        }
        else{
            if(debugMode){
                console.log('##[debug]Detected existing app name input, retrieving ID from API.');
            }
            appName = appInput;
            appId = await iasApi.getAppId(appName);
            
        }
        console.log("Application ID for " + appName + ": " + appId);

        let scanConfigUuidMatch = UUID_REGEX.exec(scanConfigInput);
        if (scanConfigUuidMatch){
            scanConfigId = scanConfigInput;
            scanConfigName = await iasApi.getScanConfigName(scanConfigId, appId);
        }
        else{
            if(debugMode){
                console.log('##[debug]Detected existing scan config name input, retrieving ID from API.');
            }
            scanConfigName = scanConfigInput;
            scanConfigId = await iasApi.getScanConfigId(scanConfigName, appId)
        }

        console.log("Scan Config ID for " + scanConfigName + ": " + scanConfigId);

        // Submit a new scan
        if (appId != null && scanConfigId != null)
        {
            scanId = await iasApi.submitScan(scanConfigId);
            console.log("InsightAppSec scan has been started. Scan ID: " + scanId);
        }
        else
        {
            throw Error("Invalid application or scan configuration. Aborting task");
        }

        // Check if we should continue on to the next task
        if (!waitForCompletion)
        {
            console.log("Scan launched. Continuing to next task");
            return;
        }

        // Check scan ID and monitor scan status
        if (scanId == null || scanId == "")
        {
            throw Error("Scan ID is null. Aborting task");
        }
        else
        {
            var scanResults = await monitorScan(scanId, scanCheckInterval, iasApi, hasTimeout, scanTimeout);
        }

        // If the scan failed, we want to return since we can't retrieve vulns
        if (scanResults == null || !scanResults["success"])
        {
            throw Error("Scan was not successful. Aborting task");
        }

        var query = "vulnerability.scans.id='" + scanId + "'"

        // Check vulnerability query if one was given
        if (hasScanGating && vulnQuery)
        {
            var formattedQuery = query + "&&" + vulnQuery;
            var queryVulns = await iasApi.getScanVulns(formattedQuery);

            if (queryVulns != null && queryVulns.length > 0)
            {
                throw Error("Findings (" + queryVulns.length.toString() + ") were found matching the scan gating query for Scan ID " + scanId + ". Failing build.");
            }
        }

        // Continue to grab vuln and report info if scan was successful
        var vulnerabilities = await iasApi.getScanVulns(query);

        if (vulnerabilities != null)
        {
            var vulnSeverities = await iasApi.getVulnSeverities(vulnerabilities);
            var attackModules = await iasApi.getAttackModules(vulnerabilities);

            var metricsReport = await generateMetrics(vulnSeverities, attackModules);
            var hostType = process.env.SYSTEM_HOSTTYPE;
            var baseReportPath = getBaseReportPath(hostType);
            var metricsFilePath = baseReportPath + "\\" + metricsFileName;            
            writeReport(metricsFilePath, metricsReport);
            let artifacts: string[] = [metricsFilePath]
            
            if (generateFindingsReport)
            {
                var findingsReportPath = baseReportPath + "\\" + findingsFileName;
                writeReport(findingsReportPath, JSON.stringify(vulnerabilities));
                artifacts.push(findingsReportPath)
            }
            if (publishPipelineArtifactsBool){
                if (hostType != "build"){
                    publishReleasePipelineArtifacts(artifacts, baseReportPath);
                }
                else {
                    publishBuildPipelineArtifacts(artifacts, artifactPerReport);
                }
            }
        }
    }
    catch (err)
    {
        tl.setResult(tl.TaskResult.Failed, err);
        console.log("Error in InsightAppSec task - " + err);
    }
}

async function monitorScan(scanId, scanCheckInterval, iasApi, hasTimeout, scanTimeout = 0)
{
    return new Promise(async function (resolve, reject)
    {
        try
        {
            var stopStatuses = ["COMPLETE", "FAILED"];
            var scan = await iasApi.getScan(scanId);

            var scanStatus = scan.status;
            console.log("Scan status: " + scanStatus);

            // Must calculate cancellation time beforehand, based on current time
            if (hasTimeout)
            {
                var date = new Date();
                var currentTime = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(),
                                            date.getHours(), date.getMinutes(), date.getSeconds());
                var cancelTime = new Date(currentTime.getTime() + scanTimeout * 60000);
            }

            // While the scan status isn't one of the defined 'stop statuses'
            while (scanStatus != null && stopStatuses.indexOf(scanStatus.toString()) < 0)
            {
                if (hasTimeout)
                {
                    var isCancelled = await checkScanTimeout(cancelTime, scanId, iasApi);

                    if (isCancelled)
                    {
                        reject("Scan timeout of " + scanTimeout + " minutes reached. Cancelling scan");
                        break;
                    }
                }

                await sleep(scanCheckInterval * 60000); // convert mins to ms
                scan = await iasApi.getScan(scanId);

                scanStatus = scan.status;
                console.log("Scan status: " + scanStatus);
            }

            if (scanStatus == "COMPLETE")
            {
                resolve({"success": true, "failureReason": ""});
            }
            else
            {
                reject("Scan " + scanId + " failed - " + scan.failure_reason);
            }
        }
        catch (err)
        {
            console.log("Error in monitoring scan - " + err);
            resolve(null);
        }
    });
}

async function checkScanTimeout(cancelTime, scanId, iasApi)
{
    return new Promise(async function (resolve, reject)
    {
        try
        {
            var date = new Date();
            var currentTime = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(),
                                            date.getHours(), date.getMinutes(), date.getSeconds());

            if (currentTime >= cancelTime)
            {
                await iasApi.submitScanAction("CANCEL", scanId);
                resolve(true);
            }
            else
            {
                resolve(false);
            }
        }
        catch (err)
        {
            console.log("Error checking for scan timeout - " + err);
            resolve(false);
        }
    });
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateMetrics(severities, modules)
{
    return new Promise(async function (resolve, reject)
    {
        try
        {
            var data = {};
            var metrics = {};
            data["metrics"] = metrics;
            metrics["severity"] = severities;
            metrics["module"] = modules;
            var reportData = JSON.stringify(data, null, 2);

            resolve(reportData);
        }
        catch (err)
        {
            console.log("Failed to generate report - " + err);
            resolve("");
        }
    });
}

function checkDirectory(filePath)
{
    var dirname = path.dirname(filePath);

    if (fs.existsSync(dirname))
    {
        return true;
    }

    checkDirectory(dirname);
    fs.mkdirSync(dirname);
}

function writeReport(filePath, fileContent)
{
    // Check if file exists
    if (!tl.exist(filePath))
    {
        // Create the folder, if needed
        checkDirectory(filePath);

        // Create the file
        tl.writeFile(filePath, fileContent, 'utf8');

        // Check if the file is created
        if (tl.exist(filePath))
        {
            console.log("Report created: " + filePath);
        }
        else
        {
            console.log("Report not created/overwritten: " + filePath);
        }
    }
    else
    {
        console.log("File already exists: " + filePath);
    }
}

function getBaseReportPath(hostType){
    var baseReportPath = null;
    if (hostType != "build"){
        baseReportPath = process.env.SYSTEM_ARTIFACTSDIRECTORY;
    }
    else {
        baseReportPath = process.env.BUILD_ARTIFACTSTAGINGDIRECTORY;
    }

    if (baseReportPath.endsWith("\a")){
        baseReportPath = baseReportPath.slice(0, -1);
        baseReportPath = baseReportPath + reportOutputFolderName

    }
    return baseReportPath;
}

function publishReleasePipelineArtifacts(artifacts, baseReportPath){
    var zip = new AdmZip();
    for (let index in artifacts){
        zip.addLocalFile(artifacts[index]);
    }
    var artifactZip: string = `${baseReportPath}.zip`;
    zip.writeZip(artifactZip);
    console.log(`Uploading ${artifactZip} to logs...`);
    console.log(`##vso[task.uploadfile]${artifactZip}`);
    console.log('Finished uploading - task complete')
    
}

function publishBuildPipelineArtifacts(artifacts, artifactPerReport){
    for (let index in artifacts){
        if (artifactPerReport){
            if (artifacts[index].endsWith(findingsFileName)){
                var folderName = findingsFileName;
            }
            else{
                var folderName = metricsFileName;
            }
        }
        else{
            folderName = reportOutputFolderName;
        }
        console.log(`Uploading ${artifacts[index]} to artifacts...`);
        console.log(`##vso[artifact.upload containerfolder=${folderName};artifactname=${folderName};]${artifacts[index]}`);
        console.log('Finished uploading - task complete')
    }
}

run();