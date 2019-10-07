import arg from 'arg'

// Stores
import { ShellArgumentsStore } from '../modules/index'

/**
 * Parsing arguments that the user sends in the console
 * @param {array} rawArgs
 *
 * Setting in the ShellArgumentsStore:
 *  * action-type [ preview | release | create ]
 *  * release-type
 *  * description
 *  * directory
 *
 * @return {Boolean}
 */
function parseArgumentsIntoOptions(rawArgs) {
  // TODO: set the option to:
  //  - version
  //  - mode [?]
  /**
   * Raw arguments:
   * 1st: the nodeJS bin folder
   * 2nd: the davai-commit bin folder
   * Parsing params:
   *  --commit-message [string]|false
   */
  const args = arg({
    '--commit-message': Boolean
  }, { argv: rawArgs.slice(2) })
  /**
   * If the user did not specify either of the params
   * he will be asked to do so in the cli-view
   */
  ShellArgumentsStore.setCommitMessage(args._[0] || false)
  ShellArgumentsStore.setDirectory(process.cwd())

  return true
}

export { parseArgumentsIntoOptions }
