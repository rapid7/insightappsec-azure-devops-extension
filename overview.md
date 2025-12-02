# Rapid7 Application Security (InsightAppSec) Extension

The Rapid7 Application Security (InsightAppSec) Extension for Azure DevOps allows application and security teams to embed Dynamic Application
 Security Testing (DAST) into their build and release pipelines.

More information about Application Security can be found here: https://www.rapid7.com/products/insightappsec/

### Key Features

The extension is designed with the following features in mind:

- Launch a new Rapid7 Application Security scan during build or release
- Perform scan monitoring
- Enforce scan gating based on vulnerability query filtering
- Provide a metrics report of scan results
- Provide raw scan results


## GETTING STARTED


### Installation

The following steps can be used in installing the shared extension within an organization.

1. From the Visual Studio Marketplace page, select `Get it free`

2. Select the proper Azure DevOps organization followed by `Install`

The Rapid7 Application Security extension and task will now be available to add in build and release pipelines.


###  Configuration

The following steps can be used in configuring the extension within a project's build or release pipeline. If a Service
Connection has already been configured for Application Security, the `Service Connection` section can be skipped.

#### Service Connection

Before configuring the build or release pipeline, first generate an Insight platform API key.  This API key is used to
authorize the Azure DevOps Extension to interact with the Application Security API.  Steps for creating an organization or user
API key can be found [here](https://insight.help.rapid7.com/docs/managing-platform-api-keys#section-generating-an-organization-key).

Once an API key has been generated, a Service Connection in Azure DevOps used for connecting to the Application Security API
 can be configured:

1. Navigate to the desired project in Azure DevOps

2. Select Project Settings > Service Connections

3. Select `+ New service connection`

4. Select `Rapid7 Application Security` from the dropdown

5. Enter the connection name, Application Security region, and API key accordingly

6. Save the connection and ensure it appears in the list of service connections for that project

#### Pipeline Configuration

After a Service Connection has been created, the Application Security extension can be implemented within build and release
pipelines.  The steps below are generalized for adding to either a build or release pipeline:

1.  From within Azure DevOps, create or find the pipeline where the task will be added

2.  Edit the pipeline within scope

3.  Identify the agent used for running the task and select the `+` icon

4.  Search or scroll the list tasks until you find `Rapid7 Application Security` and select `Add`

5.  For the newly added task, enter all required parameters as desired (see below for details on parameters)

6. `Save` your pipeline to keep the changes

------------------

| Field    | Description                 | Required|
|----------|------------------------------|---------||
| Display name | The name of the task as it will appear in the pipeline. | true
| Application Security Connection | A service connection that allows for connection and authentication to the Application Security API. Drop-down menu containing the connection that was shown configured in a previous step. | true
| Application | A drop-down menu to select the Application Security application that will be scanned. | true
| Scan Configuration | A text field to input the Application Security scan configuration that will be utilized in the scan. | true
| Wait for scan completion? | Option used to determine whether the pipeline will continue to the next step after launching the scan, or whether it will wait for its completion. | false
| Scan Status Interval | The frequency (in minutes) that the scan’s status will be checked upon and logged. Dependent on the option `Wait for scan completion` being checked. | false
| Generate findings report? | Option used to generate a raw JSON report that contains all findings from a completed scan. | false
| Fail scan on timeout? | Option used to determine whether the scan will be cancelled and marked as failed if it reaches the timeout limit (value set in minutes). Dependent on “Wait for scan completion” being checked. | false
| Timeout | The timeout for the scan completion (in minutes). Dependent on the option `Fail scan on timeout` being checked. | false
| Scan Gating| Option used to determine whether the build will fail if the provided query returns results. | false
| Vulnerability Query | The query executed against the completed scan's findings to retrieve any matching vulnerabilities. Dependent on the option `Scan Gating` being checked. | false


## DEVELOPMENT and CONTRIBUTIONS

If you would like to contribute to this project, it can be found on GitHub at https://github.com/rapid7/insightappsec-azure-devops-extension.
Contributions typically come in the form of filed bugs/issues or pull requests (PRs). Once approved and merged,
contributions will be included with tagged releases and published to the Visual Studio Marketplace.
