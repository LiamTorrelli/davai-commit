# Send email

## Description

## Usage (automatic)
```
node index.js "en" "Here is the branch" "Some description" ./GIT_INFO ./GIT_GRAPH
```
## Usage (not automatic)
**In order to generate GIT_INFO file you have to run this script in bash:**
``` bash
temp=$(git log --no-decorate --shortstat --format=raw --pretty=format:__DEV_NAME__:*%an*__COMMIT_TIMESTAMP__:*%at*__CO
MMIT_NAME__:*%f* --no-merges  master..RELEASE-2.3.9); echo $temp > GIT_INFO;
```
**In order to generate GIT_GRAPH file you have to run this script in bash:**
``` bash
temp=$(git log --pretty=format:'' --graph master..RELEASE-2.3.9);echo $temp > GIT_GRAPH.txt
```

**Info that needs to be generated for a single commit:**
``` bash
changes=$(git diff --numstat);summary=$(git diff --shortstat);echo $changes;echo $summary;
```

**This is waht we call for a single commit:**
``` bash
  node ./js/email/index.js "en" "${BRANCH}" "${cmtMsg}" "${GIT_INFO}"
```

<!-- temp=$(git log --no-decorate --shortstat --format=raw --pretty=format:__DEV_NAME__:*%an*__COMMIT_TIMESTAMP__:*%at*__CO
MMIT_NAME__:*%f* --no-merges  master..RELEASE-2.3.9); echo $temp > GIT_INFO.txt;

temp=$(git log --pretty=format:'' --graph master..RELEASE-2.3.9);echo $temp > GIT_GRAPH.txt

node index.js "en" "KazakovArtem" "08 Aug 23:18:45" "RELEASE-2.3.9" "RELEASE-2.3.9" "RELEASE" ./GIT_INFO ./GIT_GRAPH -->