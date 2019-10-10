'use strict';

const nodemailer = require('../libs/nodemailer/lib/nodemailer')
const { TRANSLATE } = require('../dictionary/translate')
const { LOG } = require('../utils/logger')
const { getHumanDate } = require('../utils/helpers')
const { generateTableHeader } = require('../controllers/htmlController')

const sendEMail = async ({
  LANG,
  GIT_NAME,
  DEV_NAME,
  EMAIL_LOGIN,
  EMAIL_PASS,
  EMAIL_SERVICE,
  SENDER_LIST,
  EMAIL_SUBJECT,

  ACTION_NAME,
  ACTION_DESCRIPTION,
  ACTION_TYPE,
  WANT_TO_SUBMIT,
  EVALUATION,

  BODY_CONTENT,
  FOOTER_CONTENT
}, needToSend = true, quiet = false) => {
  const ACTION_DATE = new Date()
  const colors = {
    green: '#28bb71',
    darkBlue: '#3776c3',
    red: '#cb382d',
    lightBlue: '#2fa9cf',
    yellow: '#d0d009'
  }

  const fontFamily = LANG === 'ru'
    ? 'Courier, monospace'
    : 'monospace'

  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE.value,
    auth: {
      user: EMAIL_LOGIN.value,
      pass: EMAIL_PASS.value
    }
  });

  const evaluationPostfix = TRANSLATE((WANT_TO_SUBMIT === 'TIME') ? 'hours' : 'yuan', LANG, true)

  const mailOptions = await {
    from: `${ DEV_NAME.value } <${ EMAIL_LOGIN.value }>`,
    to: `${ SENDER_LIST.value }`,
    subject: `${ EMAIL_SUBJECT.value }
      ${ TRANSLATE(ACTION_TYPE.toLowerCase(), LANG, true, true) }: ${ ACTION_NAME }
    `,
    html: `<h1 style="font-family: ${ fontFamily };margin-bottom:20px;font-size:20px;">
      <i>${ GIT_NAME.value }</i> ${ TRANSLATE('created', LANG) } ${ TRANSLATE('_article', LANG) }
      <span style="color: ${ colors.green };">
        <b>${ TRANSLATE(ACTION_TYPE.toLowerCase(), LANG, true, true) }</b> =>
        <i>${ ACTION_NAME }</i> [ ${ getHumanDate(ACTION_DATE) } ]
      </span>
    </h1>
    <h2 style="font-family: ${ fontFamily };margin-bottom:20px;font-size:20px;">
      <i>${ GIT_NAME.value }</i> ${ TRANSLATE('evaluated', LANG) } ${ TRANSLATE('_article', LANG) } ${ TRANSLATE('task', LANG, true, true) }: 
      <span style="color: ${ colors.green };">
        <i>${ EVALUATION }</i> ${ evaluationPostfix }
      </span>
    </h2>
    <table
      style="border-collapse:collapse;border-spacing:0;table-layout: fixed; width: 650px" class="tg"
    >
      <colgroup>
        <col style="width: 130px">
          <col style="width: 140px">
            <col style="width: 380px">
      </colgroup>
      ${ await generateTableHeader([
          { key: 'date', value: getHumanDate(ACTION_DATE) },
          { key: 'name', value: ACTION_NAME },
          { key: 'description', value: ACTION_DESCRIPTION }
        ], ACTION_TYPE, LANG)
      }
    </table>
    <br />
    <hr />
    ${ await BODY_CONTENT }
    ${ await FOOTER_CONTENT }
    `
  };
  if (!quiet) {
    if (needToSend) {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
    } else {
      LOG(BODY_CONTENT, 'bodycontent')
    }
  }
}

module.exports = {
  sendEMail
}
