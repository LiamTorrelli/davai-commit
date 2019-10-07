// Libs
import Listr from 'listr'

// Words
import { tasks } from '../config/words'

// Handlers
import { logSuccess, logInfo, logError } from '../handlers/outputHandler'
import { taskHandler } from '../handlers/taskHandler'

// Stores
import {
  GitInfoStore,
  FilesInfoStore,
  ProjectInfoStore,
  ShellArgumentsStore
} from '../modules/index'

async function submitAllToGithub() {
  const { commitMsg: enteredMsg } = ShellArgumentsStore
  const { currentBranch } = await GitInfoStore.setCurrentBranch()
  await GitInfoStore.setStatusedFiles()
  const { actionTime } = ProjectInfoStore

  const commitMsg = await GitInfoStore
    .createCommitMsg({
      branchName: currentBranch,
      commitMsg: enteredMsg,
      actionTime
    })

  if (commitMsg && currentBranch) {
    try {
      await GitInfoStore.stageFiles()
      const { goingToPush } = await GitInfoStore.commitChanges(commitMsg)

      await GitInfoStore
        .pushCommit({ branchName: currentBranch })

      if (!goingToPush) return logError('Not going to push', 'Nothing to commit')

      return goingToPush
    } catch (err) { console.warn('failed:', err); return false }
  }
  return false
}

export async function submitChangesToGithub() {
  logInfo('Submit changes to github')

  const tasksToRun = new Listr([
    { /*  ** submitAllToGithub **  */
      task: () => taskHandler('submitAllToGithub', submitAllToGithub),
      title: tasks['submitAllToGithub'].title
    }
  ])

  await tasksToRun.run()
    .catch(err => {
      console.log('\n\n')
      logError('Submit changes to github tasks failed:', err)
      process.exit(1)
    })

  logSuccess('Submitting changes to github successfully, let\'s continue')
}
