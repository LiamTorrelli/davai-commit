# DAVAI-COMMIT

## Usage
```shell
  davai-commit
```
## Description
- `davai-commit`
  > Creates a commit

## Example DAVAI-CONFIG.json
```json
{
  "DEV_TOOLS_PATH": "/Applications/wechatwebdevtools.app/Contents/MacOS/cli",
  "DEFAULT_PAGE_PATH": ["pages/index/index"],
  "STARTUP_BRANCH": "integration",
  "VERSION_FILE": "VERSION",
  "GIT_RELEASE_BRANCH_NAME_BASE": "COMPANYNAME-RELEASE",
  "GIT_RELEASE_TAG_NAME_BASE": "COMPANYNAME-BUILD",
  "GIT_INTEGRATION_RELEASE_BRANCH_BASE": "INTEGRATION-RELEASE",
  "STARTUP_FILES": [
    "VERSION",
    "app.settings.js",
    "project.config.json",
    "package.json",
    "README.md"
  ],
  "FILES_TO_ADD_THEN_DELETE": ["PRODUCTION.js"],
  "FILES_TO_UPDATE_WITH_VERSION": [
    {
      "fileName": "app.settings.js",
      "lookingFor": "const APP_VERSION ="
    },
    {
      "fileName": "VERSION",
      "lookingFor": ""
    },
    {
      "fileName": "package.json",
      "lookingFor": "version",
      "isJson": true
    }
  ],
  "FILES_TO_UPDATE_WITH_VERSION_AFTER_RELEASE": [
    {
      "fileName": "README.md",
      "lookingFor": "## PRODUCTION RELEASE-",
      "isReadme": true
    }
  ],
  "FILES_TO_UPDATE_WITH_VERSION_NEW_RELEASE": [
    {
      "fileName": "README.md",
      "lookingFor": "## DEVELOPMENT RELEASE-",
      "isNewRelease": true
    }
  ]
}
```
