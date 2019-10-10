/* eslint-disable no-unexpected-multiline */
/* eslint-disable template-tag-spacing */
import { observable, action, autorun } from 'mobx'
import { mapObjIndexed } from 'ramda'

// Helpers
import { cleanUpFromN, upTheVersion } from '../../helpers/help'
import { HumanDate } from '../../helpers/humanTimestamp'

// Service
import { EmailService } from '../../services/emailService'

// Handlers
import { logError, logAutorun, logStoreValues } from '../../handlers/outputHandler'

export const EmailInfoStore = observable({
  HEADER_CONTENT: null,
  BODY_CONTENT: null,
  FOOTER_CONTENT: null,

  setEmailHeader({
    projectName = null,
    branch = null,
    actionTime = null,
    developer = null
  }) {
    if (!projectName || !branch || !actionTime || !developer) return logError(
      'Setting email header failed:',
      'No projectName | branch | actionTime | developer'
    )
    const {
      dayNumber,
      year,
      time,
      monthNumber
    } = actionTime
    const developerName = cleanUpFromN(developer)

    const dateString = `${dayNumber}-${monthNumber}-${year} ${time}`
    this.HEADER_CONTENT = `
      ${dateString} ${developerName}
      ¯\\_(ツ)_/¯¯
      ${projectName.toString().toLowerCase()}
      ¯¯\\_ : ${branch}
    `

    return this
  },

  setEmailBody({
    projectName = null,
    actionTime = null,
    developer = null,
    branch = null,
    commitMessage = null
  }) {
    if (!actionTime || !developer || !branch || !commitMessage || !projectName) return logError(
      'Setting email header failed:',
      'No actionTime | developer | branch | commitMessage | projectName'
    )

    const isAutomatic = commitMessage.head.includes('Automatic commit')

    const { day, month, time } = actionTime
    const developerName = cleanUpFromN(developer)

    const dateString = `${month}/${day} ${time}`

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
    const defaultTableCellStyles = `
      font-family: ${fontFamily};
      font-size:14px;
      padding:10px 5px;
      border-style:solid;
      border-width:1px;
      word-break:normal;
      vertical-align:middle;
      border-color:black;
      text-align:center;
    `
    const tableHeaderStyles = `${defaultTableCellStyles}font-weight:bold;`
    const tableDataDescriptionStyles = `
      ${defaultTableCellStyles}
      text-align: ${isAutomatic ? 'center' : 'left'};
      overflow-x:scroll;
    `

    const commitHead = isAutomatic ? '' : `${commitMessage.head}\n`

    const commitBody = isAutomatic
      ? `❍ ${developerName} worked on the task \n`
      : commitMessage.body.split('-').join('').split('☐☐').join('☐ ... ☐')

    const fullDescription = `${commitHead}${commitBody}`

    const BODY_CONTENT = `<h1 style="font-family: ${fontFamily}margin-bottom:5px;font-size:20px;">
      <span style="color: ${colors.darkBlue};">
        <b>Information:</b>
      </span>
    </h1>
    <h2 style="font-family: ${fontFamily};;margin-bottom:10px;font-size:17px;">
      <b>
        ${developerName}
        <span style="color: ${colors.green};"> worked on the task</span> ${branch}
      </b>
    </h2>
    <hr />
    <table
      style="border-collapse:collapse;border-spacing:0;table-layout: fixed; width: 650px" class="tg"
    >
      <colgroup>
        <col style="width: 130px">
          <col style="width: 140px">
            <col style="width: 140px">
              <col style="width: 500px">
      </colgroup>
      <tr>
        <td style="${tableHeaderStyles}"> COMMIT TIME </td>
        <td style="${tableHeaderStyles}"> PROJECT NAME </td>
        <td style="${tableHeaderStyles}"> TASK NAME </td>
        <td style="${tableHeaderStyles}"> COMMIT DESCRIPTION </td>
      </tr>
      <tr>
        <td style="${defaultTableCellStyles}"> ${dateString} </td>
        <td style="${defaultTableCellStyles}"> ${projectName} </td>
        <td style="${defaultTableCellStyles}"> ${branch} </td>
        <td style="${tableDataDescriptionStyles}">
          <code><pre>${fullDescription}</pre></code>
          ${isAutomatic ? '<i>Automatically generated message...</i>' : ''}
        </td>
      </tr>
    </table>
    <h3 style="font-family: ${fontFamily};margin-bottom:0px;font-size:16px;">
      <span style="color: ${colors.darkBlue};">
        <b>Full commit message</b>
      </span>
    </h3>
    <code><pre>${commitMessage.head}<br /></pre></code>
    <code><pre>${commitMessage.body}</pre></code>
    <br />
    <hr />`

    this.BODY_CONTENT = BODY_CONTENT

    return this
  },

  setEmailFooter({
    actionTime = null
  }) {
    if (!actionTime) return logError('Setting email header failed:', 'No actionTime')
    const { day, month, time } = actionTime

    const dateString = `${month} ${day} [ ${time} ]`

    this.FOOTER_CONTENT = `<i>Date sent: ${dateString}</i>`

    return this
  }

}, {
  setEmailHeader: action,
  setEmailBody: action,
  setEmailFooter: action
})

autorun(() => {
  // logAutorun('Email Info')
  // logStoreValues(EmailInfoStore, 'EmailInfoStore')
})
