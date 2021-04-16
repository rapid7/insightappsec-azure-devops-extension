# Unit tests

## Setup

The unit tests use the jest framework. This can be installed using node package manager.

1. From the insightappsec-azure-devops-extension directory _npm  install_ (only the first time)

## Execution

To execute all tests
1. From the insightappsec-azure-devops-extension folder run _npm t_

For a code coverage report
1. From the insightappsec-azure-devops-extension folder run _npm run coverage_


## Writing

1. All unit tests should live in insightappsec-azure-devops-extension/tests
2. All unit tests should end in .test.ts

## Debugging

A VSCode launch.json file can be created at _insightappsec-azure-devops-extension/.vscode_ with the following contents

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Jest Current File",
            "program": "${workspaceFolder}/node_modules/.bin/jest",
            "args": ["${relativeFile}"],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "windows": {
              "program": "${workspaceFolder}/node_modules/jest/bin/jest"
            }
      }
    ]
}
```