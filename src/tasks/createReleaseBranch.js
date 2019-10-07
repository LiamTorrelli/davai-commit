// Libs
import Listr from 'listr'

// Words
import { tasks } from '../config/words'

// Handlers
import { logSuccess, logInfo, logError } from '../handlers/outputHandler'
import { taskHandler } from '../handlers/taskHandler'

// Stores
import { GitInfoStore, ProjectInfoStore, FilesInfoStore } from '../modules/index'

async function gitCreateBranch() {
  const { newVersion } = ProjectInfoStore
  const { GIT_RELEASE_BRANCH_NAME_BASE } = FilesInfoStore

  return GitInfoStore.switchToAReleaseBranch(
    GIT_RELEASE_BRANCH_NAME_BASE,
    newVersion
  )
}

async function mergePreProdBranch() {
  try {
    const { STARTUP_BRANCH } = FilesInfoStore
    await GitInfoStore.mergeBranch(`origin/${STARTUP_BRANCH}`)
    await GitInfoStore.pushAfterMerge({ branchName: `${STARTUP_BRANCH}` })
    // This is only for release action
    return true
  } catch (err) { console.warn('failed:', err); return false }
}

/**
 * These are createReleaseBranch tasks. What is happening here?
 *
 ** - gitCreateBranch ->
 *  - getting the new version [ from ProjectInfoStore ]
 *  - setting the new version [ into GitInfoStore ]
 */
export async function createReleaseBranch() {
  logInfo('Create release branch')

  const tasksToRun = new Listr([
    { /*  ** gitCreateBranch **  */
      task: () => taskHandler('gitCreateBranch', gitCreateBranch),
      title: tasks['gitCreateBranch'].title
    },
    { /*  ** mergePreProdBranch **  */
      task: () => taskHandler('mergePreProdBranch', mergePreProdBranch),
      title: tasks['mergePreProdBranch'].title
    }
  ])

  await tasksToRun.run()
    .catch(err => {
      console.log('\n\n')
      logError('Create release branch tasks failed:', err)
      process.exit(1)
    })

  logSuccess('Switched to release branch successfully, let\'s continue')
}
