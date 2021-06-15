const axios = require('axios').default;

const LOCATION_HEADER = "location";
const CONTENT_TYPE_HEADER = "application/json";
const ACCEPT_HEADER = "application/json";
const USER_AGENT_HEADER = "r7:insightappsec-azure-devops-extension/1.0.8";

export default class InsightAppSecApi
{
    endpoint: string;
    apiKey: string;
    debugMode: boolean;
    axiosInst;

    constructor(endpoint, apiKey, debugMode)
    {
        this.endpoint = endpoint;
        this.debugMode = debugMode;

        this.axiosInst = axios.create({
            baseURL: endpoint,
            headers: {
                "X-Api-Key": apiKey,
                "Content-Type": CONTENT_TYPE_HEADER,
                "Accept": ACCEPT_HEADER,
                "User-Agent": USER_AGENT_HEADER
            },
            responseType: "text",
            transformResponse: [data => data]
        });

        this.axiosInst.interceptors.request.use(request => {
            if(debugMode){
                console.log('##[debug]Request made: ', JSON.stringify(request, null));
            }
            return request;
        });

        this.axiosInst.interceptors.response.use(response => {
            if(debugMode){
                console.log('##[debug]Response headers: ', JSON.stringify(response.headers, null));
            }
            return response;
        });
    }

    public async getAppId(appName)
    {
        return new Promise(async function (resolve, reject)
        {
            let response;
            let payload = {type: "APP", query: "app.name='" + appName + "'"};
            let app;

            try
            {
                response = await this.makeApiRequest(this.endpoint + "/search", "POST", payload);

                if (response != null)
                {
                    app = JSON.parse(response);
                }
                else
                {
                    reject("Error retrieving application ID for " + appName + ". Response: " + response);
                }

                if (app.data.length > 0) {
                    resolve(app.data[0].id);
                }
                else {
                    reject("Failed to find application ID for " + appName + ". Please ensure the spelling is correct and the application still exists.")
                }
            }
            catch (err)
            {
                reject("Error retrieving application ID - " + err + "; payload: " + JSON.stringify(payload) +
                    "; response: " + response);
            }
        }.bind(this));
    }

    public async getScanConfigId(configName, applicationId)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                var response;
                var payload = {type: "SCAN_CONFIG", query: "scanconfig.name='" + configName + "' && scanconfig.app.id='" + applicationId + "'"};

                response = await this.makeApiRequest(this.endpoint + "/search", "POST", payload);

                if (response != null)
                {
                    var scanConfig = JSON.parse(response);
                    var scanConfigId = scanConfig.data[0].id;
                    resolve(scanConfigId);
                }
                else
                {
                    reject("Error retrieving scan configuration ID");
                }
            }
            catch (err)
            {
                reject("Error retrieving scan configuration ID - " + err);
            }
        }.bind(this));
    }

    public async submitScan(scanConfigId)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                var payload = {scan_config: {id: scanConfigId}};

                var scanId = await this.makeApiRequest(this.endpoint + "/scans", "POST", payload);
                resolve(scanId);
            }
            catch (err)
            {
                reject("Error submitting scan - " + err);
            }
        }.bind(this));
    }

    async getScan(scanId)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                var response;
                if (this.debugMode){
                    console.log('##[debug]Getting scan status for ' + scanId);
                }
                response = await this.makeApiRequest(this.endpoint + "/scans/" + scanId, "GET");

                if (response != null)
                {
                    var scan = JSON.parse(response);
                    resolve(scan);
                }
                else
                {
                    reject("Error retrieving scan");
                }
            }
            catch (err)
            {
                reject("Error retrieving scan - " + err);
            }
        }.bind(this));
    }

    public async getScanVulns(query)
    {
        return new Promise<[]>(async function (resolve, reject)
        {
            try
            {
                var response;
                var index = 0;
                var vulns = [];
                var endpoint = "";
                var nextPageUrl = "";
                var payload = {type: "VULNERABILITY", query: query};

                do {
                    if (nextPageUrl == "")
                    {
                        endpoint = this.endpoint + "/search";
                    }
                    else
                    {
                        endpoint = nextPageUrl;
                    }

                    response = await this.makeApiRequest(endpoint, "POST", payload);

                    if (response != null)
                    {
                        var parsedResponse = JSON.parse(response);
                        var numPages = parsedResponse.metadata["total_pages"];
                        vulns = vulns.concat(parsedResponse.data);
                    }
                    else
                    {
                        console.log("Error retrieving scan vulnerabilities, check the 'Vulnerability Query' field is valid.");
                        return reject(new Error("Request to retrieve vulnerabilities was unsuccessful."));
                    }
                    index++;
                    nextPageUrl = await this.getNextPageUrl(parsedResponse.links);
                } while(index < numPages);

                if (vulns == null || vulns == [])
                {
                    resolve(null);
                }
                else
                {
                    resolve(vulns);
                }
            }
            catch (err)
            {
                console.log("Error retrieving scan vulnerabilities - " + err);
                resolve(null);
            }
        }.bind(this));
    }

    public async submitScanAction(action, scanId)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                var payload = {action: action};
                await this.makeApiRequest(this.endpoint + "/scans/" + scanId + "/action", "PUT", payload);
                resolve(true);
            }
            catch (err)
            {
                reject("Error submitting scan action - " + err);
            }
        }.bind(this));
    }

    public async getVulnSeverities(vulns)
    {
        return new Promise(function (resolve, reject)
        {
            try
            {
                var vulnSeverities = {};

                // Loop through the vulns to tally the severities
                for (var i = 0; i < vulns.length; i++)
                {
                    // If it doesn't contain the severity, add it
                    if (vulnSeverities[vulns[i].severity] == null)
                    {
                        vulnSeverities[vulns[i].severity] = 1;
                    }
                    // Otherwise, increment its count
                    else
                    {
                        vulnSeverities[vulns[i].severity]++;
                    }
                }
                resolve(vulnSeverities);
            }
            catch (err)
            {
                console.log("Error retrieving vulnerability severities - " + err);
                resolve(null)
            }
        }.bind(this));
    }

    public async getAttackModules(vulns)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                var moduleIds = [];

                // Get the module IDs from the vulns
                for (var i = 0; i < vulns.length; i++)
                {
                    // Only using the first variances instance because all variances contain the same module ID
                    moduleIds.push(vulns[i].variances[0].module.id);
                }

                var moduleNames = [];

                // Get the module names based on IDs
                for (var i = 0; i < moduleIds.length; i++)
                {
                    var response = await this.makeApiRequest(this.endpoint + "/modules/" + moduleIds[i], "GET");

                    if (response != null)
                    {
                        var module = JSON.parse(response.toString());
                        moduleNames.push(module.name);
                    }
                }

                var moduleCounts = {};

                // Loop through module names to tally the total number of each
                for (var i = 0; i < moduleNames.length; i++)
                {
                    // If it doesn't contain the module, add it
                    if (moduleCounts[moduleNames[i]] == null)
                    {
                        moduleCounts[moduleNames[i]] = 1;
                    }
                    // Otherwise, increment its count
                    else
                    {
                        moduleCounts[moduleNames[i]]++;
                    }
                }
                resolve(moduleCounts);
            }
            catch (err)
            {
                console.log("Error retrieving attack modules - " + err);
                resolve(null);
            }
        }.bind(this));
    }

    public async makeApiRequest(endpoint, requestType, payload = null)
    {
        return new Promise(function (resolve, reject)
        {
            try
            {
                if (payload != null && payload != "")
                {
                    payload = JSON.stringify(payload);
                }
                else
                {
                    payload = null;
                }

                this.axiosInst({
                    baseURL: endpoint,
                    method: requestType,
                    data: payload
                })
                .then((response) => {
                        // Ensure valid status code response
                        if (response.status < 200 || response.status > 299) {
                            console.error("Failed to return valid response from InsightAppSec API; Status Code: " + response.status +
                                ". Please Contact Rapid7 Support if this continues to occur.");
                            console.error("IAS Error response: " + response.data);
                            resolve(null);
                            return;
                        }
    
                        var locationHeader = response.headers[LOCATION_HEADER];
    
                        if (locationHeader != null)
                        {
                            if (this.debugMode){
                                console.log("##[debug]Parsing location header")
                            }
                            var scanId = locationHeader.split("/").pop();
                            resolve(scanId);
                            return;
                        }
                        resolve(response.data);
                    })
                .catch((error) => {
                    if (error.response){
                        console.error("Failed to return valid response from InsightAppSec API; Status Code: " + error.response.status +
                        ". Please Contact Rapid7 Support if this continues to occur.");
                        console.error("IAS Error response: " + error.response.data)
                        console.error("IAS Error response headers: " + JSON.stringify(error.response.headers));
                    }
                    else {
                        console.error("Error in API request - " + error);
                    }
                    resolve(null);
                }
                )
            }
            catch (err)
            {
                console.error("Error in API request - " + err);
                resolve(null);
            }
        }.bind(this));
    }

    public async getNextPageUrl(links)
    {
        var nextPageUrl = "";
        return new Promise(function (resolve, reject)
        {
            try
            {
                links.forEach(link => {
                    if (link["rel"] == "next")
                    {
                        nextPageUrl = link["href"];
                    }
                });
                resolve(nextPageUrl);
            }
            catch (err)
            {
                console.log("Error retrieving API next page URL - " + err);
                resolve("");
            }

        }.bind(this));
    }
}
