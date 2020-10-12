//Grab the vsts task library helpers
import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');
import path = require('path');
import fs = require('fs');
import InsightAppSecApi from './helpers/insightAppSecApi';


async function run() {
    try {
        // Retrieve user input
        var application = tl.getInput("application");
        var scanConfig = tl.getInput("scanConfig");
        var waitForCompletion = tl.getBoolInput("waitForCompletion");
        var hasTimeout = tl.getBoolInput("hasTimeout");
        var hasScanGating = tl.getBoolInput("hasScanGating");
        var generateFindingsReport = tl.getBoolInput("generateFindingsReport");

        // Retrieve the connection that the user selected
        var connectedService = tl.getInput("apiConnection", true);
        var region = tl.getEndpointDataParameter(connectedService, "region", true);
        var endpointAuth = tl.getEndpointAuthorization(connectedService, true);
        var endpoint = "https://" + region + ".api.insight.rapid7.com/ias/v1"
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
        var iasApi = new InsightAppSecApi(endpoint, apiKey);

        // Get the Appplication ID and Scan Config ID via API
        var appId = await iasApi.getAppId(application);
        console.log("Application ID for " + application + ": " + appId);

        var scanConfigId = await iasApi.getScanConfigId(scanConfig);
        console.log("Scan Config ID for " + scanConfig + ": " + scanConfigId);

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
        if (hasScanGating)
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

            var path = process.env.BUILD_ARTIFACTSTAGINGDIRECTORY;
            var metricsReport = await generateMetrics(vulnSeverities, attackModules);
            var metricsFilePath = path + "\\" + "insightappsec-scan-metrics.json";
            writeReport(metricsFilePath, metricsReport);

            if (generateFindingsReport)
            {
                var findingsReportPath = path + "\\" + "insightappsec-scan-findings.json";
                writeReport(findingsReportPath, JSON.stringify(vulnerabilities));
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

run();
