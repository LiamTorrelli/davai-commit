import arg from 'arg'

// Stores
import { ShellArgumentsStore, FilesInfoStore } from '../modules/index'

/**
 * Parsing arguments that the user sends in the console
 * @param {array} rawArgs
 *
 *  * commit-message
 *
 * @return {Boolean}
 */
async function parseArgumentsIntoOptions(rawArgs) {
  // TODO: set the option to:
  //  - version
  //  - mode [?]
  /**
   * Raw arguments:
   * 1st: the nodeJS bin folder
   * 2nd: the davai-commit bin folder
   * Parsing params:
   *  --commit-message [string]|false
   *  --send-commit boolean
   *  --send-email boolean
   */
  // First, let's check for default params, such as SEND_EMAIL and SEND COMMIT

  const {
    SEND_EMAIL,
    SEND_COMMIT
  } = await FilesInfoStore.checkDefaultParams()

  const args = arg({
    '--commit-message': Boolean,
    '--send-commit': Boolean,
    '--send-email': Boolean
  }, { argv: rawArgs.slice(2) })
  /**
   * If the user did not specify either of the params
   * he will be asked to do so in the cli-view
   */
  ShellArgumentsStore.setCommitMessage(args._[0] || null)
  if (SEND_EMAIL === null) {
    ShellArgumentsStore.setSendEmail(args._[2] || null)
  } else {
    ShellArgumentsStore.setSendEmail(SEND_EMAIL)
  }
  if (SEND_COMMIT === null) {
    ShellArgumentsStore.setSendCommit(args._[1] || null)
  } else {
    ShellArgumentsStore.setSendCommit(SEND_COMMIT)
  }
  ShellArgumentsStore.setDirectory(process.cwd())

  return true
}

export { parseArgumentsIntoOptions }
