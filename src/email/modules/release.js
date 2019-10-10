'use strict';

const fs = require('fs')
const {
  getFormattedDate,
  cleanDuplicates
} = require('../utils/helpers')
const { LOG } = require('../utils/logger')

const sanitizeReleaseInfo = async (INFO_FILE, GRAPH_FILE) => {
  console.log('Sanitizing release info')
  const INFO_FILE_STRING = fs.readFileSync(INFO_FILE, 'utf8')
  const GRAPH_FILE_STRING = fs.readFileSync(GRAPH_FILE, 'utf8')
  // console.log('GRAPH_FILE_STRING', await GRAPH_FILE_STRING)

  // console.log('HERE', await INFO_FILE_LINES)
  // GRAPH_FILE.on('line', async line => { await GRAPH_FILE_LINES.push(line) })
  // console.log('INFO_FILE_STRING', INFO_FILE_STRING)
  // console.log('INFO_FILE_STRING', INFO_FILE_STRING)

  // __DEV_NAME__:*Ode Manzi*__COMMIT_TIMESTAMP__:*1564382196*__COMMIT_NAME__:*WHZN-142-Remove-blank-lines-in-CSS*
  const infoArray = []
  const graphArray = []

  const getDevName = str => str.split(/__DEV_NAME__:\*(.*)\*__COMMIT_TIMESTAMP__/).filter(Boolean)[0]
  const getCommitDate = str => str.split(/__COMMIT_TIMESTAMP__:\*(.*)\*__COMMIT_NAME__/).filter(Boolean)[1]
  const getCommitName = str => str.split(/__COMMIT_NAME__:\*(.*)\*/).filter(Boolean)[1]
  const getBranchName = str => str.split(/([A-Z]{4,7})\-(([0-9]{2,4})|([0-9]\.[0-9]\.[0-9]))/).filter(Boolean)[1]
  const cutCommitName = str => str.slice(0, 300)
  const getCommitInfo = str => str.split(' ').join('').match(/\d+/g)
  const sanitizeNumber = num => num === undefined ? 0 : Number(num)

  let sortedGitInfoArray = []
  let branches = []

  INFO_FILE_STRING.split('\n').filter(Boolean).forEach((line, index) => {
    if ((line.includes('files changed,') || (line.includes('file changed,'))) > 0)
      infoArray.push((getCommitInfo(line)))
    else {
      branches.push(getBranchName(cutCommitName(getCommitName(line))))
      sortedGitInfoArray.push({
        commitName: cutCommitName(getCommitName(line)),
        commitDate: getFormattedDate(getCommitDate(line)),
        developerName: getDevName(line)
      })
    }
  })

  let mergesCount = 0

  GRAPH_FILE_STRING.split('\n').forEach((line, index) => {
    if (index <= infoArray.length) {
      const isMergeLine = line.includes('*')
      if (isMergeLine) mergesCount++
      graphArray.push(line)
    }
  })

  let filesChanged = 0
  let insertions = 0
  let deletions = 0
  let changes = 0

  await infoArray.forEach(async info => {
    filesChanged+=sanitizeNumber(info[0])
    insertions+=sanitizeNumber(info[1])
    deletions+=sanitizeNumber(info[2])
    changes+=(sanitizeNumber(info[1]) + sanitizeNumber(info[2]))
  })

  const allGitInfo = await sortedGitInfoArray.map((obj, index) => ({
    ...obj,
    graph: graphArray[index],
    commitInfo: {
      filesChanged: sanitizeNumber(infoArray[index][0]),
      insertions: sanitizeNumber(infoArray[index][1]),
      deletions: sanitizeNumber(infoArray[index][2])
    }
  }))

  return await {
    numberOfCommits: allGitInfo.length,
    filesChanged,
    insertions,
    deletions,
    changes,
    branches: cleanDuplicates(branches),
    allGitInfo
  }
}

module.exports = {
  sanitizeReleaseInfo
}