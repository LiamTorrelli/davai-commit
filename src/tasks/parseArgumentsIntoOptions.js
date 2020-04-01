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
   *  -s [boolean] (start => mode)
   *  -b [boolean] (break => mode)
   *  -f [boolean] (finish => mode)
   *  --send-commit boolean
   *  --commit-message [string]|false
   *  --send-email boolean
   *  --email-message [string]|false
   */

  const args = arg({
    '-s': Boolean,
    '-f': Boolean,
    '-b': Boolean,
    '--send-commit': Boolean,
    '--commit-message': Boolean,
    '--send-email': Boolean,
    '--email-message': Boolean
  }, { argv: rawArgs.slice(2) })
  /**
   * If the user did not specify either of the params
   * he will be asked to do so in the cli-view
   */
  let mode = false
  if (args['-s']) mode = 'start'
  if (args['-b']) mode = 'break'
  if (args['-f']) mode = 'finish'
  if (mode) {
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

    ShellArgumentsStore.setSendCommit(false)
    ShellArgumentsStore.setSendEmail(true)
    ShellArgumentsStore.setEmailMessage(`${mode.toUpperCase()} at ${dateString}`)
  } else {
    ShellArgumentsStore.setSendCommit(args._[1] || false)
    ShellArgumentsStore.setSendEmail(args._[3] || false)
    ShellArgumentsStore.setEmailMessage(args._[4] || false)
  }

  ShellArgumentsStore.setCliMode(mode || false)
  ShellArgumentsStore.setCommitMessage(args._[2] || false)
  ShellArgumentsStore.setDirectory(process.cwd())

  return true
}

export { parseArgumentsIntoOptions }
