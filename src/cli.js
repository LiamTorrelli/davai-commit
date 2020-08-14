// Tasks
import { parseArgumentsIntoOptions } from './tasks/parseArgumentsIntoOptions'
import { promptForMissingOptions } from './tasks/promptForMissingOptions'
import { startUpTasks } from './tasks/startUpTasks'
import { submitChangesToGithub } from './tasks/submitChangesToGithub'

// Handlers
import {
  logError,
  logFinish,
  logICWT,
  _Errors
} from './handlers/outputHandler'

export async function cli(args) {
  console.log('VERSION', '2.0.0')
  console.log(' ')
  try {
    await parseArgumentsIntoOptions(args)
    await promptForMissingOptions()
    await startUpTasks()
    await submitChangesToGithub()

    logFinish('All tasks were finished!')
    return logICWT()
  } catch (error) { console.log('Error is here'); logError(error) }

  return logError('How did you get here?')
}
