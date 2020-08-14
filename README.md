# DAVAI-COMMIT

## VERSIONS
 - DEVELOPMENT RELEASE 2.0.0
 - PRODUCTION RELEASE 2.0.0

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

```shell
  davai-commit -s 10
```

## Description
- `davai-commit`
  > Creates a commit
- `davai-commit -s 10`
  > Prints the last 10 commits

```
## Debug
```
  node --inspect --experimental-modules bin/davai-commit
```