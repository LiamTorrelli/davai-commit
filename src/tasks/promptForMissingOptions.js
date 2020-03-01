import inquirer from 'inquirer'

// Stores
import { ShellArgumentsStore } from '../modules/index'

async function promptForMissingOptions() {
  const commitQuestionBoolean = []
  const commitQuestionMessage = []
  const emailQuestionBoolean = []
  const emailQuestionMessage = []

  const {
    sendCommit,
    commitMsg,
    sendEmail,
    emailMsg
  } = ShellArgumentsStore

  if (!sendCommit)
    commitQuestionBoolean.push({
      type: 'confirm',
      name: 'sendCommit',
      message: 'Do you want to send commit?',
      default: 'true'
    })

  const commitConfirmation = await inquirer.prompt(commitQuestionBoolean)
  ShellArgumentsStore.setSendCommit(sendCommit || commitConfirmation.sendCommit)

  if (!commitMsg && commitConfirmation.sendCommit) {
    commitQuestionMessage.push({
      type: 'input',
      name: 'commitMsg',
      message: 'Provide the COMMIT message',
      default: 'AUTOGENERATED'
    })
    const commitMessageConfirmation = await inquirer.prompt(commitQuestionMessage)
    ShellArgumentsStore.setCommitMessage(commitMsg || commitMessageConfirmation.commitMsg)
  }

  if (!sendEmail) {
    emailQuestionBoolean.push({
      type: 'confirm',
      name: 'sendEmail',
      message: 'Do you want to send email?',
      default: 'true'
    })
  }

  const emailConfirmation = await inquirer.prompt(emailQuestionBoolean)
  ShellArgumentsStore.setSendEmail(sendEmail || emailConfirmation.sendEmail)

  if (!emailMsg && emailConfirmation.sendEmail) {
    emailQuestionMessage.push({
      type: 'input',
      name: 'emailMsg',
      message: 'Provide the EMAIL message',
      default: 'AUTOGENERATED email'
    })
    const emailMessageConfirmation = await inquirer.prompt(emailQuestionMessage)
    ShellArgumentsStore.setEmailMessage(sendEmail || emailMessageConfirmation.emailMsg)
  }
  return true
}

export { promptForMissingOptions }
