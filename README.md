# Rapid7 InsightAppSec Extension

The Rapid7 InsightAppSec Extension for Azure DevOps is a TypeScript-based project that leverages the Rapid7
InsightAppSec RESTful API to automate the scanning and gating of Dynamic Application Security Testing (DAST) as part of
an Azure DevOps build or release pipeline.  The project utilizes the [tfx-cli](https://www.npmjs.com/package/tfx-cli)
node-based utility for interacting with Azure DevOps and follows the standard development framework as
[documented](https://docs.microsoft.com/en-us/azure/devops/extend/get-started/node?view=azure-devops).

More information about InsightAppSec can be found here: https://www.rapid7.com/products/insightappsec/

If you would like to start using the InsigtAppSec Extension for Azure DevOps today, it can be found on the Visual Studio
Marketplace: https://marketplace.visualstudio.com/items?itemName=rapid7.rapid7-insightappsec-extension


## GETTING STARTED

The details provided in this README are for those maintaining the extension.  For details on Getting Started using the
published extension, either reference the [extension listing](https://marketplace.visualstudio.com/items?itemName=rapid7.rapid7-insightappsec-extension)
on Visual Studio Marketplace or the included [Overview](overview.md).  To get started developing the Rapid7
InsightAppSec Extension for Azure DevOps, an Azure DevOps organization is required.

### Prerequisites

The below prerequisites must first be installed on the development environment in order to get started with local
development and testing:

  - [Visual Studio Code](https://code.visualstudio.com/) was used in the course of its development and is recommended as an IDE
  - [Azure DevOps organization](https://azure.microsoft.com/en-us/services/devops/) with permissions to install extensions
  - [Visual Studio Marketplace publisher account](https://marketplace.visualstudio.com/manage/publishers)
  - Installation of [Node.js](https://nodejs.org/en/)
  - Installation of node development dependencies

### Initializing Project
Ensure the necessary node development dependencies are installed prior to making modifications or packaging the
extension.  From within the project, run:
```
> npm install -g tfx-cli
> npm install -g typescript
> cd tasks/InsightAppSec
> npm install
```

### Local Testing
Prior to publishing the extension to Visual Studio for testing within Azure DevOps, ensure it has been tested
locally.  There are several parameters that must be supplied to correctly execute the logic contained within. This is
because parameters are traditionally pulled by the extension from the user-entered values in the Azure DevOps UI, and
those will not exist in local testing.

The following block of code contains the required parameters that must be set:

```
// Vars for testing locally
var application = "Application Name";
var scanConfig = "Scan Configuration Name";

var endpoint = "https://us.api.insight.rapid7.com/ias/v1";
var apiKey = "your-api-key";

var waitForCompletion = true;
var scanCheckInterval = 5;
var hasTimeout = true;
var scanTimeout = 60;

var hasScanGating = false;
var generateFindingsReport = true;
```

With all prerequisites and configurations in place, you can now compile the project and then test:
```
> cd tasks/InsightAppSec
> tsc task.ts --lib ES2015
> node task.js
```


## PACKAGING

After completing a checkout of the project from GitHub, open and build it in your IDE.

VS Code was originally used in the development of this project. The following steps can be used in VS Code to build it:

  1. Select `View`, then `Command Palette`
  2. Select `Tasks: Run Build Task`
  3. Choose the single tsconfig.json file

In a command prompt, `cd` to the project root directory and run the command:

`tfx extension create --manifest-globs vss-extension.json`

This should create a .vsix file, which is a Visual Studio Extension file that will be uploaded to the Marketplace to share the extension. If this fails, there should be output in the CLI listing the errors.


## UPLOADING & SHARING

The following steps can be used in uploading the extension to the Marketplace, and then sharing it with a specific organization. There are two options - uploading it manually via the website, or doing it via CLI.

### Publishing Via Browser

1. Navigate to the VS Marketplace at https://marketplace.visualstudio.com/manage/publishers

2. Login with a publisher account

3. Click the `+ New Extension` button and select Azure DevOps

4. Navigate locally to select the .vsix file that was previously created

5. Click Upload

6. Right click the extension once it appears in the UI and select `Share/Unshare`

7. Click `+ Organization` and enter the organization name

8. Close the window and ensure the Share has saved

### Publishing Via CLI

1. Go to Security under your profile in your Azure DevOps organization

2. Generate a new personal access token with the `All accessible organizations` option selected under the Organization field

3. Save this token

4. In the CLI, `cd` to the root project directory

5. Use the command `tfx extension publish --token [token]` to package and publish the extension, replacing `[token]` with the personal access token that was previously generated

### Publishing as rapid7
Any new commits merged to master will result in a build of the extension and the attempt to publish it to the extension library. It is important to ensure that a new version is defined appropriate for the changes and that the version does not collide with a previous release version. Once merged, the following actions will be automatically performed by the GitHub Actions `publish` action:

1. A tag is created

2. A release is created

3. Extension is compiled

4. Extension is published to the rapid7 publisher account (public immediately)

After publishing it's good practice to install the latest version of the plugin and validate functionality by running a job.


### Installation

 The following steps can be used in installing the shared extension within an organization.

1. Navigate to your organization (eg., dev.azure.com/orgName)

2. Select `Organization Settings`

3. Navigate to the Extensions section there

4. Select the Rapid7 InsightAppSec extension

5. When redirected to the extension's page in the Marketplace, select `Get it free` and follow the directions to complete the installation process


###  Configuration

The following steps can be used in configuring the extension within a project's build or release pipeline. This is invaluable for doing any troubleshooting or testing within the actual product.


#### Service Connection

Before configuring the build or release pipeline, we need to setup a custom service connection to allow for connection to the InsightAppSec API.

1. Navigate to the desired project in Azure DevOps

2. Select Project Settings > Service Connections

3. Select `+ New service connection`

4. Select Rapid7 InsightAppSec as the type

5. Enter the connection name, InsightAppSec region, and API key accordingly

6. Save the connection and ensure it appears in the list of service connections for that project

#### Pipeline Configuration

The following steps detail configuration within a build pipeline, though the same can be done for releases as well.

1.  Click the icon at the top right of the page that contains account settings

2.  Select Preview Features

3.  Scroll down to the `New YAML pipeline creation experience` option and turn it off

4.  Return to the main menu bar on the left and select `Builds` under the Pipelines section

5.  Select `+ New` and choose the `New Pipeline Build` option

6.  Select your repository and click Continue

7.  Click the `Empty job` option at the top of the page to start a new build pipeline from scratch

8.  Click the `+` on Agent job 1 to add a new task

9. Search for InsightAppSec in the task window

10. Select it and click `Add`

11. Click on the task that's been added under the Agent job

12. Enter required parameters as desired (see below for details on parameters)

13. Select the `Save` option to save the build (`Save & queue` to immediately run it for your project)

Once the build completes, you're able to see whether the build succeeded or failed, as well as return to the build pipeline and edit your task as desired.

------------------

| Field    | Description                 | Required|
|----------|------------------------------|---------|
| Display name | The name of the task as it will appear in the pipeline. | true
| InsightAppSec Connection | A service connection that allows for connection and authentication to the InsightAppSec API. Drop-down menu containing the connection that was shown configured in a previous step. | true
| Application | A drop-down menu to select the InsightAppSec application that will be scanned. | true
| Scan Configuration | A text field to input the InsightAppSec scan configuration that will be utilized in the scan. | true
| Wait for scan completion? | Option used to determine whether the pipeline will continue to the next step after launching the scan, or whether it will wait for its completion. | false
| Scan Status Interval | The frequency (in minutes) that the scan’s status will be checked upon and logged. Dependent on the option `Wait for scan completion` being checked. | false
| Generate findings report? | Option used to generate a raw JSON report that contains all findings from a completed scan. | false
| Fail scan on timeout? | Option used to determine whether the scan will be cancelled and marked as failed if it reaches the timeout limit (value set in minutes). Dependent on “Wait for scan completion” being checked. | false
| Timeout | The timeout for the scan completion (in minutes). Dependent on the option `Fail scan on timeout` being checked. | false
| Scan Gating| Option used to determine whether the build will fail if the provided query returns results. | false
| Vulnerability Query | The query executed against the completed scan's findings to retrieve any matching vulnerabilities. Dependent on the option `Scan Gating` being checked. | false
