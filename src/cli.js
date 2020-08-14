// Stores
import { ShellArgumentsStore } from './modules/index'

// Tasks
import { parseArgumentsIntoOptions } from './tasks/parseArgumentsIntoOptions'
import { promptForMissingOptions } from './tasks/promptForMissingOptions'
import { startUpTasks } from './tasks/startUpTasks'
import { submitChangesToGithub } from './tasks/submitChangesToGithub'
import { doStandup } from './tasks/doStandup'

// Handlers
import {
  logError,
  logFinish,
  logICWT,
  _Errors
} from './handlers/outputHandler'

export async function cli(args) {
  console.log('VERSION', '2.0.0')

  try {
    await parseArgumentsIntoOptions(args)
    const { isStandup } = ShellArgumentsStore

    if (isStandup) {
      await doStandup()
      logFinish('Provided by <InCodeWeTrust />', false, true)
      return true
    }

    await promptForMissingOptions()
    await startUpTasks()
    await submitChangesToGithub()
    logFinish('Provided by <InCodeWeTrust />')
    return logICWT()
  } catch (error) { console.log('Error is here'); logError(error) }

  return logError('How did you get here?')
}
