'use strict';

const { strToArray } = require('../utils/helpers')

const SingleCommitInfo = async str => {
  // The example of the str

  /* summary */
  // 7 files changed, 55 insertions(+), 29 deletions(-)
  /* files */
  // 4      1       .gitignore
  // 10      10      CREDS
  // 1       1       js/email/controllers/filesController.js
  // 12      13      js/email/index.js
  // 18      1       js/email/modules/singleCommit.js
  // 8       2       uploadTimeEntry.sh
  // 2       1       uploadTimeEntryNoCommit.sh
  /* modificationNames */
  // M      .gitignore
  // M       CREDS
  // M       js/email/controllers/filesController.js
  // M       js/email/index.js
  // M       js/email/modules/singleCommit.js
  // M       uploadTimeEntry.sh
  // M       uploadTimeEntryNoCommit.sh

  /* depricated */
  // :100644 100644 725369f... 1da084a... M  pages/locations/show/show.mock.js
  // 0       391     pages/locations/show/chains.mock.js

  const [summary, files, modificationNames] = str.split('|')

  const mergeChangesWithNames = (files, names) => files.map((file, index) => {
      const [ insertions, deletions, fileName ] = file.split('\t')
      return {
        insertions,
        deletions,
        fileName,
        action: names[index].split('\t')[0]
      }
    })

  const filterByAction = arr => ({
    modifiedF: arr.filter(file => file.action === 'M'),
    addedF: arr.filter(file => file.action === 'A'),
    deletedF: arr.filter(file => file.action === 'D'),
    renamedF: arr.filter(file => file.action.includes('R'))
  })

  const {
    modifiedF,
    addedF,
    deletedF,
    renamedF
  } = filterByAction(
    mergeChangesWithNames(strToArray(files), strToArray(modificationNames))
  )

  const getCounters = async (modifiedF, addedF, deletedF, renamedF) => {
    let allInsertions = 0
    let allDeletions = 0
    let filesChanged = 0

    const modifiedStats = { insertions: 0, deletions: 0 }
    const addedStats = { insertions: 0, deletions: 0 }
    const deletedStats = { insertions: 0, deletions: 0 }
    const renamedStats = { insertions: 0, deletions: 0 }

    modifiedF.forEach(file => {
      modifiedStats.insertions+=Number(file.insertions)
      modifiedStats.deletions+=Number(file.deletions)

      allInsertions+=Number(file.insertions)
      allDeletions+=Number(file.deletions)
      filesChanged++
    })
    addedF.forEach(file => {
      addedStats.insertions+=Number(file.insertions)
      addedStats.deletions+=Number(file.deletions)

      allInsertions+=Number(file.insertions)
      allDeletions+=Number(file.deletions)
      filesChanged++
    })
    deletedF.forEach(file => {
      deletedStats.insertions+=Number(file.insertions)
      deletedStats.deletions+=Number(file.deletions)

      allInsertions+=Number(file.insertions)
      allDeletions+=Number(file.deletions)
      filesChanged++
    })
    renamedF.forEach(file => {
      renamedStats.insertions+=Number(file.insertions)
      renamedStats.deletions+=Number(file.deletions)

      allInsertions+=Number(file.insertions)
      allDeletions+=Number(file.deletions)
      filesChanged++
    })

    return await {
      allInsertions,
      allDeletions,
      filesChanged,
      modifiedStats,
      addedStats,
      deletedStats,
      renamedStats
    }
  }


  const {
    allInsertions,
    allDeletions,
    filesChanged,
    modifiedStats,
    addedStats,
    deletedStats,
    renamedStats
  } = await getCounters(modifiedF, addedF, deletedF, renamedF)

  return {
    allInsertions,
    allDeletions,
    filesChanged,
    modifiedF,
    addedF,
    deletedF,
    renamedF,
    modifiedStats,
    addedStats,
    deletedStats,
    renamedStats,
    summary
  }
}

module.exports = {
  SingleCommitInfo
}