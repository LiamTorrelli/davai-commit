'use strict';
const { sendEMail } = require('./services/sender')

const { sanitizeReleaseInfo } = require('./modules/release')
const { SingleCommitInfo } = require('./modules/singleCommit')

const {
  getPrametersFromShell
} = require('./controllers/shellController')
const {
  getCredentials
} = require('./controllers/filesController')

const {
  getHelperBlockTitle,
  getChangedFilesTitle,
  commitTemplate,
  commitTemplateWrapper,
  commitTemplateHeader,
  commitTemplateEnd,
  releaseCommitTemplate,
  getReleaseInfoBlock,
  getEmailFooter
} = require('./controllers/htmlController')

const start = async () => {

  const colors = {
    green: '#28bb71',
    darkBlue: '#3776c3',
    red: '#cb382d',
    lightBlue: '#2fa9cf',
    yellow: '#d0d009'
  }

  const [
    userId,
    GIT_NAME,
    DEV_NAME,
    EMAIL_LOGIN,
    EMAIL_PASS,
    EMAIL_SERVICE,
    SENDER_LIST,
    EMAIL_SUBJECT
  ] = await getCredentials()

  // node ./js/email/index.js "en" "${BRANCH}" "${cmtMsg}" "${GIT_INFO}" "${wantToSubmit}" "${evaluation}"
  const [
    LANG = 'en',
    ACTION_NAME,
    ACTION_DESCRIPTION,
    GIT_INFORMATION = '',
    WANT_TO_SUBMIT = 'TIME',
    EVALUATION = '00:00'
  ] = await getPrametersFromShell()

  const GIT_INFO_FILE_PATH = './GIT_GRAPH'
  const GIT_GRAPH_FILE_PATH = './GIT_INFO'

  const ACTION_TYPE = ACTION_NAME.includes('RELEASE') ? 'COMMIT' : 'COMMIT'

  const getCommitFiles = async ({
    filesChanged,
    allInsertions,
    allDeletions,
    modifiedF,
    addedF,
    deletedF,
    renamedF,
    modifiedStats,
    addedStats,
    deletedStats,
    renamedStats,
    summary,
    LANG
  }) => {
    let html = ''
    html+=commitTemplateWrapper(summary, LANG)
    html+=commitTemplateHeader({ filesChanged, allInsertions, allDeletions })

    if (modifiedF.length > 0) {
      html+=`${ getChangedFilesTitle('M', colors.green, modifiedStats) }`
      modifiedF.map(file => html+=commitTemplate(colors.green, file))
    }
    if (addedF.length > 0) {
      html+=`<br />`
      html+=`${ getChangedFilesTitle('A', colors.darkBlue, addedStats) }`
      addedF.map(file => html+=commitTemplate(colors.darkBlue, file))
    }
    if (deletedF.length > 0) {
      html+=`<br />`
      html+=`${ getChangedFilesTitle('D', colors.red, deletedStats) }`
      deletedF.map(file => html+=commitTemplate(colors.red, file))
    }
    if (renamedF.length > 0) {
      html+=`<br />`
      html+=`${ getChangedFilesTitle('R', colors.yellow, renamedStats) }`
      renamedF.map(file => html+=commitTemplate(colors.yellow, file))
    }
    return html+=commitTemplateEnd()
  }

  const bodyContent = async () => {
    if (ACTION_TYPE === 'COMMIT') {
      const {
        modifiedF = false,
        addedF = false,
        deletedF = false,
        renamedF = false,
        filesChanged = 0,
        allInsertions = 0,
        allDeletions = 0,
        modifiedStats = {},
        addedStats = {},
        deletedStats = {},
        renamedStats = {},
        summary = ''
      } = await SingleCommitInfo(GIT_INFORMATION)

      return `
        ${ await getHelperBlockTitle(ACTION_TYPE) }
        ${ await getCommitFiles({
          filesChanged,
          allInsertions,
          allDeletions,
          modifiedF,
          addedF,
          deletedF,
          renamedF,
          modifiedStats,
          addedStats,
          deletedStats,
          renamedStats,
          summary,
          LANG
        })}
      `
    } else if (ACTION_TYPE === 'RELEASE') {
      const {
        numberOfCommits = false,
        filesChanged = false,
        insertions = false,
        deletions = false,
        changes = false,
        branches = false,
        allGitInfo = false
      } = await sanitizeReleaseInfo(GIT_INFO_FILE_PATH, GIT_GRAPH_FILE_PATH)

      return `
        ${ await getHelperBlockTitle(ACTION_TYPE) }
        ${ await getReleaseInfoBlock({
          LANG,
          numberOfCommits,
          filesChanged,
          insertions,
          deletions,
          changes,
          branches,
          allGitInfo
        })}
      `
    }
  }
  const BODY_CONTENT = await bodyContent()

  const FOOTER_CONTENT = await getEmailFooter(LANG)

  await sendEMail({
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
  // }, false, true)
  })
}

start()
