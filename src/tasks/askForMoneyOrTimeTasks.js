// Libs
import Listr from 'listr'
import nodemailer from 'nodemailer'

// Words
import { tasks } from '../config/words'

// Handlers
import { logSuccess, logInfo, logError } from '../handlers/outputHandler'
import { taskHandler } from '../handlers/taskHandler'

// Helpers
import { __isEmpty } from '../helpers/help'

// Stores
import {
  QuestionaireStore,
  ProjectInfoStore,
  GitInfoStore,
  FilesInfoStore,
  EmailInfoStore,
  ShellArgumentsStore
} from '../modules/index'

// Functions

async function askForMoney() {
  // TODO - ing
  await QuestionaireStore.askForMoney()
  return false
}

async function askForTime() {
  return false
}

/**
 * These are startUp tasks. What is happening here?
 ** - blabla task ->
 *  - blablalba
 *  - blablalba
 */
export async function askForMoneyOrTime() {
  logInfo('Asking for money or time started')

  const tasksToRun = new Listr([
    { /*  ** askForMoney **  */
      task: () => taskHandler('askForMoney', askForMoney),
      title: tasks['askForMoney'].title
    },
    { /*  ** askForTime **  */
      task: () => taskHandler('askForTime', askForTime),
      title: tasks['askForTime'].title,
      enabled: false
    }
  ])

  await tasksToRun.run()
    .catch(err => {
      console.log('\n\n')
      logError('Asking for money or time failed:', err)
      process.exit(1)
    })

  logSuccess('Asking for money or time are ready, let\'s continue')
  return true
}
