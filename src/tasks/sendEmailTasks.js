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
  const { commitMsg } = await ShellArgumentsStore
  const { PROJECT_NAME } = await FilesInfoStore.setProjectName()
  const { developer, currentBranch, commitMessage } = await GitInfoStore
  const { BODY_CONTENT } = EmailInfoStore.setEmailBody({
    branch: currentBranch,
    projectName: PROJECT_NAME,
    commitMessage: commitMessage || commitMsg,
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

async function sendEmail() {
  const { EMAIL_CONFIG } = await FilesInfoStore.setEmailCreds()
  if (!EMAIL_CONFIG) {
    logError('Cannot send email', 'NO EMAIL CONFIG')
    return false
  }
  const { HEADER_CONTENT, BODY_CONTENT, FOOTER_CONTENT } = await EmailInfoStore

  if (!HEADER_CONTENT || !BODY_CONTENT || !FOOTER_CONTENT) {
    logError('Cannot send email', 'Composed email not correctly')
    return false
  }

  const {
    LOGIN,
    PASS,
    SERVICE,
    SENDER_LIST
  } = EMAIL_CONFIG

  const transporter = await nodemailer.createTransport({
    service: SERVICE,
    auth: {
      user: LOGIN,
      pass: PASS
    }
  })
  const { developer } = await GitInfoStore

  const mailOptions = {
    from: `${developer} <${LOGIN}>`,
    to: `${SENDER_LIST}`,
    subject: `${HEADER_CONTENT}`,
    html: `
    ${BODY_CONTENT}
    ${FOOTER_CONTENT}
    `
  };

  const sendTheEmail = () => new Promise((res, rej) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        rej(false)
      } else {
        console.log(`Email sent: ${info.response}`)
        res(true)
      }
    })
  })

  return sendTheEmail()
}

/**
 * These are startUp tasks. What is happening here?
 ** - blabla task ->
 *  - blablalba
 *  - blablalba
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
    },
    { /*  ** sendEmail **  */
      task: () => taskHandler('sendEmail', sendEmail),
      title: tasks['sendEmail'].title
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
