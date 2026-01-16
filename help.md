# Description

The Rapid7 Application Security (InsightAppSec) Azure DevOps extension leverages the Application Security RESTful API to automate web application scanning as part of an Azure DevOps build or release pipeline. The extension provides a variety of configuration options to allow for flexibility when utilized within a pipeline. This includes options for scan timeouts, status monitoring, and gating based on the results of a completed scan. This facilitates the implementation of Dynamic Application Security Testing (DAST) and enables organizations to address application security as part of the software development life cycle.

# Key Features

* Performs web application scanning within an Azure DevOps pipeline
* Monitors and records scan status
* Provides scan gating capability with custom user-defined query
* Generates report containing key metrics from scan results

# Requirements

* Rapid7 Platform API Key

# Documentation

## Setup

### Connection

A service connection must be configured in Azure DevOps to allow the extension to perform scanning operations via the Application Security API. Use the following steps to configure this connection:

1. Navigate to the desired project in Azure DevOps
2. Select Project Settings -> Service Connections
3. Select `+ New service connection`
4. Select Rapid7 Application Security as the type
5. Enter the connection name, Application Security region, and API key accordingly
6. Save the connection and ensure it appears in the list of service connections for that project

## Technical Details

### Configuration

The following steps detail the configuration of the extension within a build or release pipeline.

1. From within an Azure DevOps organization, select `Builds` or `Releases` under the Pipelines section on the main menu
2. Select `+ New` and choose the `New Pipeline Build` option
3. Select your repository and click Continue
4. Click the `Empty job` option at the top of the page to start a new pipeline from scratch
5. Click the `+` on Agent job 1 to add a new task
6. Search for Application Security in the task window
7. Select it and click `Add`
8. Click on the task that's been added under the Agent job
9. Configure the fields as desired (see below for details on parameters)
10. Select the `Save` option to save the pipeline (`Save & queue` to immediately run it for your project)

Below are additional details regarding the configurable fields in the extension.

| Field    | Description                 | Required|
|----------|------------------------------|---------|
| Display name | The name of the task as it will appear in the pipeline. | true
| Application Security Connection | A service connection that allows for connection and authentication to the Application Security API. Drop-down menu containing the connection that was shown configured in a previous step. | true
| Application | A drop-down menu to select the Application Security application that will be scanned. | true
| Scan Configuration | A text field to input the Application Security scan configuration that will be utilized in the scan. | true
| Wait for scan completion? | Option used to determine whether the pipeline will continue to the next step after launching the scan, or whether it will wait for its completion. | false
| Scan Status Interval | The frequency (in minutes) that the scan’s status will be checked upon and logged. Dependent on the option `Wait for scan completion` being checked. | false
| Generate findings report? | Option used to generate a raw JSON report that contains all findings from a completed scan. | false
| Fail scan on timeout? | Option used to determine whether the scan will be cancelled and marked as failed if it reaches the timeout limit (value set in minutes). Dependent on “Wait for scan completion” being checked. | false
| Timeout | The timeout for the scan completion (in minutes). Dependent on the option `Fail scan on timeout` being checked. | false
| Scan Gating| Option used to determine whether the pipeline will fail if the provided query returns results. | false
| Vulnerability Query | The query executed against the completed scan's findings to retrieve any matching vulnerabilities. Dependent on the option `Scan Gating` being checked. | false

### Contributing

Rapid7 welcomes contributions to the Application Security Azure DevOps extension and has designated its repository as open source. For a full guide on configuring a development environment, as well as deploying, packaging, and testing the extension, please refer to the [project README](https://github.com/rapid7/insightappsec-azure-devops-extension/blob/master/README.md).

## Troubleshooting

When attempting to configure the extension, if it does not appear as an option for use within the pipeline, first ensure that it's been correctly installed via the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=rapid7.rapid7-insightappsec-extension).

If the extension step in the pipeline fails with no scan having been performed, confirm that the correct application and scan config were selected in the configuration.

If the pipeline proceeds to the next action immediately after launching the scan, thus performing no gating or scan results, check the `Wait for scan completion?` option. This option determines whether the pipeline proceeds to the next step just after scan submission.

If the scan gating doesn't appear to occur as expected, confirm that the vulnerability query is formatted correctly. There are several examples of formatted queries in the [Application Security API documentation](https://help.rapid7.com/insightappsec/en-us/api/v1/docs.html).

### Debug logging
To enable debug logging for:
* #### Build pipeline:
    After selecting `Run pipeline` you can either check `Enable system diagnostics` or change `system.debug` to `true` under `Advanced Options`/`Variables`.
* #### Release pipeline:
    In the pipeline configuration, under `Variables`/`Pipeline variables` add `system.debug` with a value of `true`.

# Version History
* 1.3.0 - Rename InsightAppSec to Application Security
* 1.2.3 - Replaced Scan Config dropdown with text input field.
* 1.2.2 - Update dependencies. Update follow-redirects and shelljs version.
* 1.2.1 - Update dependencies. Update to run on Node10. Update TS version.
* 1.2.0 - Support for unauthenticated proxies when using a self hosted agent. Bug fixes.
* 1.1.2 - Scan Config name can now be entered manually in dropdown list.
* 1.1.1 - Bug fix for duplicated directory name. 
* 1.1.0 - Added option to upload report output for both build and release pipelines, added self-populating Scan Config dropdown list
* 1.0.8 - Added improved error logging for bad requests, all requests are now logged with system.debug set to true
* 1.0.7 - Bug fix for empty Vulnerability Query with Scan Gating checked, bug fix for undefined report path for release pipelines, replaced XMLHttpRequest module with Axios, added us2 and us3 regions
* 1.0.6 - Add basic validation to the Vulnerability Query field and additional logging if the vulnerability request fails
* 1.0.5 - Bug fix to filter Scan Configuration lookup by Application ID
* 1.0.4 - Additional logging during Application search; add Content-Type and Accept headers on all API requests
* 1.0.3 - Patch for vulnerability gating; improvements for build/release process
* 1.0.0 - Initial extension

# Links

## References

* [Application Security API Documentation](https://help.rapid7.com/insightappsec/en-us/api/v1/docs.html)
* [Visual Studio Marketplace Listing](https://marketplace.visualstudio.com/items?itemName=rapid7.rapid7-insightappsec-extension)
* [Create a Rapid7 Platform API Key](https://insightappsec.help.rapid7.com/docs/get-started-with-the-insightappsec-api)
