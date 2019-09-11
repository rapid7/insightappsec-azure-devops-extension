
export default class InsightAppSecApi
{
    endpoint: string;
    apiKey: string;

    constructor(endpoint, apiKey)
    {
        this.endpoint = endpoint;
        this.apiKey = apiKey;
    }

    public async getAppId(appName)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                var response;
                var payload = {type: "APP", query: "app.name='" + appName + "'"};

                response = await this.makeApiRequest(this.endpoint + "/search", "POST", payload);

                if (response != null)
                {
                    var app = JSON.parse(response);
                    var appId = app.data[0].id;
                    resolve(appId);
                }
                else
                {
                    reject("Error retrieving application ID");
                }
            }
            catch (err)
            {
                reject("Error retrieving application ID - " + err);
            }
        }.bind(this));
    }

    public async getScanConfigId(configName)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                var response;
                var payload = {type: "SCAN_CONFIG", query: "scanconfig.name='" + configName + "'"};

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
                        console.log("Error retrieving scan vulnerabilities");
                        resolve(null);
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
                var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
                let xhr = new XMLHttpRequest();
        
                xhr.open(requestType, endpoint);
                xhr.setRequestHeader("X-Api-Key", this.apiKey);
            
                if (payload != null && payload != "")
                {
                    xhr.send(JSON.stringify(payload));
                }
                else
                {
                    xhr.send();
                }
        
                xhr.onerror = function()
                {
                    console.log("Error in API request");
                    resolve(null)
                }
        
                xhr.onload = function()
                {
                    var locationHeader = xhr.getResponseHeader("Location");

                    if (locationHeader != null)
                    {
                        var scanId = locationHeader.split("/").pop();
                        resolve(scanId);
                    }
                    resolve(xhr.responseText);
                }
            }
            catch (err)
            {
                console.log("Error in API request - " + err);
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