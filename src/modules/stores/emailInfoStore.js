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
    branch = null
  }) {
    if (!projectName || !branch) return logError(
      'Setting email header failed:',
      'No projectName | branch'
    )

    this.HEADER_CONTENT = `${projectName} TASK: ${branch}`

    return this
  },

  setEmailBody({
    actionTime = null,
    developer = null,
    branch = null,
    commitMessage = null
  }) {
    if (!actionTime || !developer || !branch || !commitMessage) return logError(
      'Setting email header failed:',
      'No actionTime | developer | branch | commitMessage'
    )

    const { day, month, time } = actionTime

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
    const tableHeaderStyles = `
      font-family: ${fontFamily};
      font-size:14px;
      padding:10px 5px;
      border-style:solid;
      border-width:1px;
      overflow:hidden;
      word-break:normal;
      border-color:black;
      font-weight:bold;
      text-align:center;
      vertical-align:middle;
    `

    const tableDataStyles = `
      font-family: ${fontFamily};
      font-size:14px;
      padding:10px 5px;
      border-style:solid;
      border-width:1px;
      overflow:hidden;
      word-break:normal;
      border-color:black;
      text-align:center;
      vertical-align:middle;
    `

    // const generateTableHeader = async(paramsArray, actionType, lang) => {
    //   let html = ''
    //   let keys = []
    //   let values = []
    //   paramsArray.forEach(param => {
    //     keys.push(param.key)
    //     values.push(param.value)
    //   })
    //   html+=`<tr>${ await getTableHeader(await keys, actionType, lang) }</tr>\n`
    //   html+=`<tr>${ await getTableData(await values) }</tr>`
    //   return await html
    // }

    const BODY_CONTENT = `<h1 style="font-family: ${fontFamily};margin-bottom:20px;font-size:20px;">
      <i>${developer}</i>
      <span style="color: ${colors.green};">
        <b>COMMITTED</b> =>
        <i>${branch}</i> [ ${dateString} ]
      </span>
    </h1>
    <h3 style="font-family: ${fontFamily};margin-bottom:0px;font-size:16px;">
      <span style="color: ${colors.darkBlue};">
        <b>Commit message</b>
      </span>
    </h3>
    <table
      style="border-collapse:collapse;border-spacing:0;table-layout: fixed; width: 650px" class="tg"
    >
      <colgroup>
        <col style="width: 130px">
          <col style="width: 140px">
            <col style="width: 380px">
      </colgroup>
      <tr>
        <td style="${tableHeaderStyles}"> COMMIT DATE </td>\n
        <td style="${tableHeaderStyles}"> COMMIT NAME </td>\n
        <td style="${tableHeaderStyles}"> COMMIT DESCRIPTION </td>\n
      </tr>
      <tr>
        <td style="${tableDataStyles}"> ${dateString} </td>\n
        <td style="${tableDataStyles}"> ${branch} </td>\n
        <td style="${tableDataStyles}"> <code><pre>${commitMessage.head}<br /></pre></code> </td>\n
      </tr>

      <code><pre>${commitMessage.head}<br /></pre></code>
      <code><pre>${commitMessage.body.split('\n').join('\n')}</pre></code>
    </table>
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
