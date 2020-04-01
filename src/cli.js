// Tasks
import { parseArgumentsIntoOptions } from './tasks/parseArgumentsIntoOptions'
import { promptForMissingOptions } from './tasks/promptForMissingOptions'
import { startUpTasks } from './tasks/startUpTasks'
import { sendEmailTasks } from './tasks/sendEmailTasks'
import { submitChangesToGithub } from './tasks/submitChangesToGithub'

// Stores
import { ShellArgumentsStore } from './modules/index'

// Handlers
import {
  logError,
  logFinish,
  logICWT,
  logSuccess,
  _Errors,
  logStoreValues
} from './handlers/outputHandler'

export async function cli(args) {
  console.log('VERSION', '1.3.2')
  console.log(' ')
  try {
    await parseArgumentsIntoOptions(args)
    await promptForMissingOptions()
    await startUpTasks()
    const { sendCommit, sendEmail } = ShellArgumentsStore
    if (sendCommit) await submitChangesToGithub()
    if (sendEmail) await sendEmailTasks()

    logFinish('All tasks were finished!')
    return logICWT()
  } catch (error) { console.log('Error is here'); logError(error) }

  return logError('How did you get here?')
}
