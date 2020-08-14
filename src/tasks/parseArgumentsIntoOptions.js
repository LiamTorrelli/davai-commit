import arg from 'arg'

// Stores
import { ShellArgumentsStore } from '../modules/index'
import { HumanDate } from '../helpers/humanTimestamp'
/**
 * Parsing arguments that the user sends in the console
 * @param {array} rawArgs
 *
 *  * commit-message
 *
 * @return {Boolean}
 */
function parseArgumentsIntoOptions(rawArgs) {
  // TODO: set the option to:
  //  - version
  /**
   * Raw arguments:
   * 1st: the nodeJS bin folder
   * 2nd: the davai-commit bin folder
   * Parsing params:
   *  --commit-message [string]|false
   *  --stand-up [number]|false
   */

  const args = arg({
    '--commit-message': Boolean,
    '--stand-up': Number,
    '-s': Number
  }, { argv: rawArgs.slice(2) })

  if (args['--stand-up'] || args['-s']) {
    const logAmount = args['--stand-up'] || args['-s']
    ShellArgumentsStore.setIsStandup(true)
    ShellArgumentsStore.setStandupNumber(logAmount)
    return true
  }

  ShellArgumentsStore.setIsStandup(false)
  const actionTime = new HumanDate(new Date(), 'en', false)
    .setNeededParam('humanDateObj')
    .neededInfo

  const {
    dayNumber,
    year,
    time,
    monthNumber
  } = actionTime

  const dateString = `${dayNumber}-${monthNumber}-${year} ${time}`

  ShellArgumentsStore.setDirectory(process.cwd())
  ShellArgumentsStore.setCommitMessage(args['--commit-message'] || false)
  ShellArgumentsStore.setCommitDate(new Date())
  ShellArgumentsStore.setCommitDateString(`${dateString}`)

  return true
}

export { parseArgumentsIntoOptions }
