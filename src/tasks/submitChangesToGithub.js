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
  ShellArgumentsStore,
  FilesInfoStore,
  SendRequestToApiStore
} from '../modules/index'

async function stageFiles() {
  const { filesAreStaged } = await GitInfoStore.stageFiles()
  return filesAreStaged
}

async function createCommitMsg() {
  const { commitMsg } = ShellArgumentsStore
  const { currentBranch } = await GitInfoStore.setCurrentBranch()

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

async function sendToApi() {
  const { commitMsg, commitDate, commitDateString } = ShellArgumentsStore
  const { currentBranch, developer } = await GitInfoStore.setCurrentBranch()
  const { PROJECT_NAME } = await FilesInfoStore

  try {
    await SendRequestToApiStore
      .sendCommitInfo({
        projectName: PROJECT_NAME,
        branch: currentBranch,
        commitSource: 'davaicommit',
        developer,
        commitDate,
        commitDateString,
        commitMsg
      })

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
    },
    { /*  ** sendToApi **  */
      task: () => taskHandler('sendToApi', sendToApi),
      title: tasks['sendToApi'].title
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
