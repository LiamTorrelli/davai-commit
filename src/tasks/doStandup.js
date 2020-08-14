// Libs
import Listr from 'listr'

// Words
import { tasks } from '../config/words'

// Handlers
import { logSuccess, logError } from '../handlers/outputHandler'
import { taskHandler } from '../handlers/taskHandler'

// Helpers
import { __isEmpty } from '../helpers/help'

// Stores
import { GitInfoStore, ShellArgumentsStore } from '../modules/index'

// Functions
async function logStandupInfo() {
  const { standupAmount } = ShellArgumentsStore
  await GitInfoStore.getStandup(standupAmount)

  return true
}

/**
 * These are startUp tasks. What is happening here?
 *  - setDeveloper -> setting the developer (using git)
 *  - setStatusedFiles -> setting the changed files (using git)
 *  - setProjectInfo -> setting the project name (using bash)
 */
export async function doStandup() {
  const tasksToRun = new Listr([
    { /*  ** setProjectInfo **  */
      task: () => taskHandler('logStandupInfo', logStandupInfo),
      title: tasks['logStandupInfo'].title
    }
  ])

  await tasksToRun.run()
    .catch(err => {
      console.log('\n\n')
      logError('Start up tasks failed:', err)
      process.exit(1)
    })
  return true
}
