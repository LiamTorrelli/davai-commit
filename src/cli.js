// Tasks
import { parseArgumentsIntoOptions } from './tasks/parseArgumentsIntoOptions'
import { promptForMissingOptions } from './tasks/promptForMissingOptions'
import { startUpTasks } from './tasks/startUpTasks'
import { sendEmailTasks } from './tasks/sendEmailTasks'
import { submitChangesToGithub } from './tasks/submitChangesToGithub'

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
  try {
    await parseArgumentsIntoOptions(args)
    await promptForMissingOptions()
    await startUpTasks()
    await submitChangesToGithub()
    await sendEmailTasks()

    logFinish('Commit was sent')
    return logICWT()
  } catch (error) { console.log('Error is here'); logError(error) }

  return logError('How did you get here?')
}
