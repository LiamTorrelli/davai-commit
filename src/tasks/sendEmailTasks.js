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
  FilesInfoStore
} from '../modules/index'

// Functions

async function composeEmailHeader() {
  const { PROJECT_NAME } = await FilesInfoStore.setProjectName()
  const { currentBranch } = await GitInfoStore.setCurrentBranch()

  console.log('EMAIL_CONFIG', EMAIL_CONFIG)
  console.log('PROJECT_NAME', PROJECT_NAME)
  console.log('currentBranch', currentBranch)
  const HEADER_CONTENT = 'Wuhan Zan TASK: WHZN-332'
  return false
}

async function composeEmailBody() {
  const BODY_CONTENT = `<h1 style="font-family: ${fontFamily};margin-bottom:20px;font-size:20px;">
    <i>KAZAKOV ARTEM</i> created a
    <span style="color: ${colors.green};">
      <b>COMMIT</b> =>
      <i>WHZN-332</i> [ 11/10/2019 11:10:05 ]
    </span>
  </h1>
  <table
    style="border-collapse:collapse;border-spacing:0;table-layout: fixed; width: 650px" class="tg"
  >
    <colgroup>
      <col style="width: 130px">
        <col style="width: 140px">
          <col style="width: 380px">
    </colgroup>
  </table>
  <br />
  <hr />`

  return false
}

async function composeEmailFooter() {
  const FOOTER_CONTENT = '<i>Date sent: 09/10/2019 11:00:09</i>'
  return false
}

async function sendEmail() {
  const { EMAIL_CONFIG } = await FilesInfoStore.setEmailCreds()

  const transporter = await nodemailer.createTransport({
    service: 'Yandex',
    auth: {
      user: 'a.kazakov@incodewetrust.ru',
      pass: 'kazakov24.7'
    }
  })

  const LANG = 'en'
  const fontFamily = LANG === 'ru'
    ? 'Courier, monospace'
    : 'monospace'

  const colors = {
    green: '#28bb71',
    darkBlue: '#3776c3',
    red: '#cb382d',
    lightBlue: '#2fa9cf',
    yellow: '#d0d009'
  }

  const mailOptions = {
    from: 'KAZAKOV ARTEM <a.kazakov@incodewetrust.ru>',
    to: 'a.kazakov@incodewetrust.ru',
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

  // return sendTheEmail()
  return false
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
      title: tasks['composeEmailBody'].title,
      enabled: () => false
    },
    { /*  ** composeEmailFooter **  */
      task: () => taskHandler('composeEmailFooter', composeEmailFooter),
      title: tasks['composeEmailFooter'].title,
      enabled: () => false
    },
    { /*  ** sendEmail **  */
      task: () => taskHandler('sendEmail', sendEmail),
      title: tasks['sendEmail'].title,
      enabled: () => false
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
