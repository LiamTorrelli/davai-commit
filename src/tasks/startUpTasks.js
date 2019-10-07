// Libs
import Listr from 'listr'

// Words
import { tasks } from '../config/words'

// Handlers
import { logSuccess, logInfo, logError } from '../handlers/outputHandler'
import { taskHandler } from '../handlers/taskHandler'

// Helpers
import { __isEmpty } from '../helpers/help'

// Stores
import {
  ProjectInfoStore,
  GitInfoStore,
  FilesInfoStore
} from '../modules/index'

// Functions
async function checkIfFilesExist() {
  const { configFileExists } = await FilesInfoStore.checkConfigFile()
  return configFileExists
}

async function setStatusedFiles() {
  await GitInfoStore.setStatusedFiles()

  return true
}

async function setDeveloper() {
  await GitInfoStore.setDeveloper()

  return true
}

async function setProjectInfo() {
  const { actionTime } = ProjectInfoStore.setActionDate()
  const { PROJECT_NAME } = await FilesInfoStore.setProjectName()

  return !__isEmpty(actionTime) && !__isEmpty(PROJECT_NAME)
}

/**
 * These are startUp tasks. What is happening here?
 ** - blabla task ->
 *  - blablalba
 *  - blablalba
 */
export async function startUpTasks() {
  logInfo('Start up tasks')

  const tasksToRun = new Listr([
    { /*  ** checkIfFilesExist **  */
      task: () => taskHandler('checkIfFilesExist', checkIfFilesExist),
      title: tasks['checkIfFilesExist'].title
    },
    { /*  ** setDeveloper **  */
      task: () => taskHandler('setDeveloper', setDeveloper),
      title: tasks['setDeveloper'].title
    },
    { /*  ** setStatusedFiles **  */
      task: () => taskHandler('setStatusedFiles', setStatusedFiles),
      title: tasks['setStatusedFiles'].title
    },
    { /*  ** setProjectInfo **  */
      task: () => taskHandler('setProjectInfo', setProjectInfo),
      title: tasks['setProjectInfo'].title
    }
  ])

  await tasksToRun.run()
    .catch(err => {
      console.log('\n\n')
      logError('Start up tasks failed:', err)
      process.exit(1)
    })

  logSuccess('Start up tasks are ready, let\'s continue')
  return true
}
