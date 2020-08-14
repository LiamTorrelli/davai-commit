// Libs
import Listr from 'listr'
import nodemailer from 'nodemailer'

// Words
import { tasks } from '../config/words'

// Handlers
import { logSuccess, logInfo, logError } from '../handlers/outputHandler'
import { taskHandler } from '../handlers/taskHandler'

// Helpers
import { __isEmpty } from '../helpers/help'

// Stores
import {
  ProjectInfoStore,
  GitInfoStore,
  FilesInfoStore,
  EmailInfoStore,
  ShellArgumentsStore
} from '../modules/index'

// Functions

async function composeEmailHeader() {
  const { PROJECT_NAME } = await FilesInfoStore.setProjectName()
  const { actionTime } = await ProjectInfoStore.setActionTime()
  const { developer } = await GitInfoStore.setDeveloper()
  const { currentBranch } = await GitInfoStore.setCurrentBranch()

  const { HEADER_CONTENT } = EmailInfoStore.setEmailHeader({
    projectName: PROJECT_NAME,
    branch: currentBranch,
    actionTime,
    developer
  })

  return HEADER_CONTENT
}

async function composeEmailBody() {
  const { actionTime } = await ProjectInfoStore.setActionTime()
  const { emailMsg } = await ShellArgumentsStore
  const { PROJECT_NAME } = await FilesInfoStore.setProjectName()
  const { developer, currentBranch, commitMessage } = await GitInfoStore

  const { BODY_CONTENT } = EmailInfoStore.setEmailBody({
    branch: currentBranch,
    projectName: PROJECT_NAME,
    emailMessage: emailMsg,
    actionTime,
    developer
  })

  return BODY_CONTENT
}

async function composeEmailFooter() {
  const { actionTime } = await ProjectInfoStore.setActionTime()
  const { FOOTER_CONTENT } = await EmailInfoStore.setEmailFooter({ actionTime })

  return FOOTER_CONTENT
}

/**
 * These are send-email tasks. What is happening here?
 ** - task... ->
 */
export async function sendEmailTasks() {
  logInfo('Send email tasks')

  const tasksToRun = new Listr([
    { /*  ** composeEmailHeader **  */
      task: () => taskHandler('composeEmailHeader', composeEmailHeader),
      title: tasks['composeEmailHeader'].title
    },
    { /*  ** composeEmailBody **  */
      task: () => taskHandler('composeEmailBody', composeEmailBody),
      title: tasks['composeEmailBody'].title
    },
    { /*  ** composeEmailFooter **  */
      task: () => taskHandler('composeEmailFooter', composeEmailFooter),
      title: tasks['composeEmailFooter'].title
    }
  ])

  await tasksToRun.run()
    .catch(err => {
      console.log('\n\n')
      logError('Send email tasks failed:', err)
      process.exit(1)
    })

  logSuccess('Send email tasks are ready, let\'s continue')
  return true
}
