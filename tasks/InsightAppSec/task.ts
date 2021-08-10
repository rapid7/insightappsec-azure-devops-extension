//Grab the vsts task library helpers
import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');
import path = require('path');
import fs = require('fs');
var AdmZip = require('adm-zip');
import InsightAppSecApi from './helpers/insightAppSecApi';

const METRICS_FILE_NAME = "insightappsec-scan-metrics.json";
const FINDINGS_FILE_NAME = "insightappsec-scan-findings.json";
const REPORT_OUTPUT_FOLDER_NAME = "Rapid7_Report_Output";
const BUILD_HOST_TYPE = "build"

async function run() {
    try {
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
        if (debugModeStr == 'true') {
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
        if (waitForCompletion) {
            scanCheckInterval = parseInt(tl.getInput("scanCheckInterval"));
        }
        if (hasTimeout) {
            scanTimeout = parseInt(tl.getInput("timeout"));
        }
        if (hasScanGating) {
            vulnQuery = tl.getInput("vulnQuery");
        }

        var scanId;
        var iasApi = new InsightAppSecApi(endpoint, apiKey, debugMode, tl.getVariable("agent.proxyurl") || tl.getVariable("Agent.ProxyUrl"));

        var appId, appName;
        await iasApi.getApplicationData(appInput).then(appResult => {
            appId = appResult[0];
            appName = appResult[1];
        });
        console.log("Application ID for " + appName + ": " + appId);

        var scanConfigId, scanConfigName;
        await iasApi.getScanConfigData(scanConfigInput, appId).then(scanConfigResult => {
            scanConfigId = scanConfigResult[0];
            scanConfigName = scanConfigResult[1];
        });
        console.log("Scan Config ID for " + scanConfigName + ": " + scanConfigId);

        // Submit a new scan
        if (appId != null && scanConfigId != null) {
            scanId = await iasApi.submitScan(scanConfigId);
            console.log("InsightAppSec scan has been started. Scan ID: " + scanId);
        }
        else {
            throw Error("Invalid application or scan configuration. Aborting task");
        }

        // Check if we should continue on to the next task
        if (!waitForCompletion) {
            console.log("Scan launched. Continuing to next task");
            return;
        }

        // Check scan ID and monitor scan status
        if (scanId == null || scanId == "") {
            throw Error("Scan ID is null. Aborting task");
        }
        else {
            var scanResults = await monitorScan(scanId, scanCheckInterval, iasApi, hasTimeout, scanTimeout);
        }

        // If the scan failed, we want to return since we can't retrieve vulns
        if (scanResults == null || !scanResults["success"]) {
            throw Error("Scan was not successful. Aborting task");
        }

        var query = "vulnerability.scans.id='" + scanId + "'"

        // Check vulnerability query if one was given
        if (hasScanGating && vulnQuery) {
            var formattedQuery = query + "&&" + vulnQuery;
            var queryVulns = await iasApi.getScanVulns(formattedQuery);

            if (queryVulns != null && queryVulns.length > 0) {
                throw Error("Findings (" + queryVulns.length.toString() + ") were found matching the scan gating query for Scan ID " + scanId + ". Failing build.");
            }
        }

        // Continue to grab vuln and report info if scan was successful
        var vulnerabilities = await iasApi.getScanVulns(query);

        if (vulnerabilities != null) {
            var vulnSeverities = await iasApi.getVulnSeverities(vulnerabilities);
            var attackModules = await iasApi.getAttackModules(vulnerabilities);

            var metricsReport = await generateMetrics(vulnSeverities, attackModules);
            var hostType = process.env.SYSTEM_HOSTTYPE;
            var baseReportPath = getBaseReportPath(hostType);
            var metricsFilePath = baseReportPath + "\\" + METRICS_FILE_NAME;
            writeReport(metricsFilePath, metricsReport);
            let artifacts: string[] = [metricsFilePath]

            if (generateFindingsReport) {
                var findingsReportPath = baseReportPath + "\\" + FINDINGS_FILE_NAME;
                writeReport(findingsReportPath, JSON.stringify(vulnerabilities));
                artifacts.push(findingsReportPath)
            }
            if (publishPipelineArtifactsBool) {
                if (hostType != BUILD_HOST_TYPE) {
                    publishReleasePipelineArtifacts(artifacts, baseReportPath);
                }
                else {
                    publishBuildPipelineArtifacts(artifacts, artifactPerReport);
                }
            }
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err);
        console.log("Error in InsightAppSec task - " + err);
    }
}

async function monitorScan(scanId, scanCheckInterval, iasApi, hasTimeout, scanTimeout = 0) {
    return new Promise(async function (resolve, reject) {
        try {
            var stopStatuses = ["COMPLETE", "FAILED"];
            var scan = await iasApi.getScan(scanId);

            var scanStatus = scan.status;
            console.log("Scan status: " + scanStatus);

            // Must calculate cancellation time beforehand, based on current time
            if (hasTimeout) {
                var date = new Date();
                var currentTime = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(),
                    date.getHours(), date.getMinutes(), date.getSeconds());
                var cancelTime = new Date(currentTime.getTime() + scanTimeout * 60000);
            }

            // While the scan status isn't one of the defined 'stop statuses'
            while (scanStatus != null && stopStatuses.indexOf(scanStatus.toString()) < 0) {
                if (hasTimeout) {
                    var isCancelled = await checkScanTimeout(cancelTime, scanId, iasApi);

                    if (isCancelled) {
                        reject("Scan timeout of " + scanTimeout + " minutes reached. Cancelling scan");
                        break;
                    }
                }

                await sleep(scanCheckInterval * 60000); // convert mins to ms
                scan = await iasApi.getScan(scanId);

                scanStatus = scan.status;
                console.log("Scan status: " + scanStatus);
            }

            if (scanStatus == "COMPLETE") {
                resolve({ "success": true, "failureReason": "" });
            }
            else {
                reject("Scan " + scanId + " failed - " + scan.failure_reason);
            }
        }
        catch (err) {
            console.log("Error in monitoring scan - " + err);
            resolve(null);
        }
    });
}

async function checkScanTimeout(cancelTime, scanId, iasApi) {
    return new Promise(async function (resolve, reject) {
        try {
            var date = new Date();
            var currentTime = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(),
                date.getHours(), date.getMinutes(), date.getSeconds());

            if (currentTime >= cancelTime) {
                await iasApi.submitScanAction("CANCEL", scanId);
                resolve(true);
            }
            else {
                resolve(false);
            }
        }
        catch (err) {
            console.log("Error checking for scan timeout - " + err);
            resolve(false);
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateMetrics(severities, modules) {
    return new Promise(async function (resolve, reject) {
        try {
            var data = {};
            var metrics = {};
            data["metrics"] = metrics;
            metrics["severity"] = severities;
            metrics["module"] = modules;
            var reportData = JSON.stringify(data, null, 2);

            resolve(reportData);
        }
        catch (err) {
            console.log("Failed to generate report - " + err);
            resolve("");
        }
    });
}

function checkDirectory(filePath) {
    var dirname = path.dirname(filePath);

    if (fs.existsSync(dirname)) {
        return true;
    }

    checkDirectory(dirname);
    fs.mkdirSync(dirname);
}

function writeReport(filePath, fileContent) {
    // Create the folder, if needed
    checkDirectory(filePath);

    // Create the file, default behaviour is to overwrite if the file already exists.
    tl.writeFile(filePath, fileContent, 'utf8');

    // Check if the file is created
    if (tl.exist(filePath)) {
        console.log("Report created: " + filePath);
    }
    else {
        console.error("Report not created/overwritten: " + filePath);
    }
}

function getBaseReportPath(hostType) {
    var baseReportPath = null;
    if (hostType != "build") {
        baseReportPath = process.env.SYSTEM_ARTIFACTSDIRECTORY;
    }
    else {
        baseReportPath = process.env.BUILD_ARTIFACTSTAGINGDIRECTORY;
    }

    if (baseReportPath.endsWith("\a")) {
        baseReportPath = baseReportPath.slice(0, -1);
    }

    baseReportPath = baseReportPath + REPORT_OUTPUT_FOLDER_NAME;
    return baseReportPath;
}

function publishReleasePipelineArtifacts(artifacts, baseReportPath) {
    var zip = new AdmZip();
    for (let index in artifacts) {
        zip.addLocalFile(artifacts[index]);
    }
    var artifactZip: string = `${baseReportPath}.zip`;
    zip.writeZip(artifactZip);
    console.log(`Uploading ${artifactZip} to logs...`);
    console.log(`##vso[task.uploadfile]${artifactZip}`);
    console.log('Finished uploading - task complete')
}

function publishBuildPipelineArtifacts(artifacts, artifactPerReport) {
    var folderName;
    for (let index in artifacts) {
        if (artifactPerReport) {
            if (artifacts[index].endsWith(FINDINGS_FILE_NAME)) {
                folderName = FINDINGS_FILE_NAME;
            }
            else {
                folderName = METRICS_FILE_NAME;
            }
        }
        else {
            folderName = REPORT_OUTPUT_FOLDER_NAME;
        }
        console.log(`Uploading ${artifacts[index]} to artifacts...`);
        console.log(`##vso[artifact.upload containerfolder=${folderName};artifactname=${folderName};]${artifacts[index]}`);
        console.log('Finished uploading - task complete')
    }
}

run();