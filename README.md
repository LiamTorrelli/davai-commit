# DAVAI-COMMIT

## VERSIONS
 - DEVELOPMENT RELEASE 1.2.0
 - PRODUCTION RELEASE 1.1.0

## First installation

### Set up git project
```shell
  mkdir davai-commit && cd davai-commit
  git init
  git remote add origin git@github.com:LiamTorrelli/davai-commit.git
  ... do changes

  git push -u origin [ branch ]

```

### Set the project in the npm
1) Mac [ sudo ], Windows [ need permissions ]
```shell
  cd davai-commit
  sudo npm link
```
2) Reopen the terminal
3) Start using `davai-commit` globally on your computer in the terminal

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
  "PROJECT_NAME": "DAVAI-COMMIT"
}
```
