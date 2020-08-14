import inquirer from 'inquirer'

// Stores
import { ShellArgumentsStore } from '../modules/index'

async function promptForMissingOptions() {
  const commitQuestionMessage = []
  let commitMessageConfirmation = {}

  const { commitMsg, isStandup } = ShellArgumentsStore

  if (isStandup) return true

  if (!commitMsg) {
    commitQuestionMessage.push({
      type: 'input',
      name: 'commitMsg',
      message: 'Provide COMMIT message',
      default: 'AUTOGENERATED'
    })
    commitMessageConfirmation = await inquirer.prompt(commitQuestionMessage)
    ShellArgumentsStore.setCommitMessage(commitMsg || commitMessageConfirmation.commitMsg)
  }

  return true
}

export { promptForMissingOptions }
