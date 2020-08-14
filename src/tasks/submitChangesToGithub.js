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
  ProjectInfoStore,
  ShellArgumentsStore
} from '../modules/index'

async function stageFiles() {
  const { filesAreStaged } = await GitInfoStore.stageFiles()
  return filesAreStaged
}

async function createCommitMsg() {
  const { commitMsg } = ShellArgumentsStore
  const { currentBranch } = await GitInfoStore.setCurrentBranch()
  // await GitInfoStore.setStatusedFiles()
  const { actionTime } = ProjectInfoStore

  const { commitMessage } = await GitInfoStore
    .createCommitMsg({
      branchName: currentBranch,
      commitMsg,
      actionTime
    })

  if (commitMessage) {
    const { goingToPush } = await GitInfoStore.commitChanges({ commitMessage })
    return goingToPush
  }

  return false
}

async function pushCommit() {
  const { currentBranch } = await GitInfoStore.setCurrentBranch()

  try {
    await GitInfoStore
      .pushCommit({ branchName: currentBranch })

    return true
  } catch (err) { console.warn('failed:', err); return false }
}

export async function submitChangesToGithub() {
  logInfo('Submit changes to github')

  const tasksToRun = new Listr([
    { /*  ** stageFiles **  */
      task: () => taskHandler('stageFiles', stageFiles),
      title: tasks['stageFiles'].title
    },
    { /*  ** createCommitMsg **  */
      task: () => taskHandler('createCommitMsg', createCommitMsg),
      title: tasks['createCommitMsg'].title
    },
    { /*  ** pushCommit **  */
      task: () => taskHandler('pushCommit', pushCommit),
      title: tasks['pushCommit'].title
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
