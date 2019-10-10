'use strict';

const { TRANSLATE } = require('./../dictionary/translate')
const { LOG } = require('../utils/logger')
const {
  addZero,
  insertSpaces,
  getFormattedDate
} = require('../utils/helpers')

const colors = {
  green: '#28bb71',
  darkBlue: '#3776c3',
  red: '#cb382d',
  lightBlue: '#2fa9cf',
  yellow: '#d0d009'
}

const actionWords = ['MODIFIED', 'ADDED', 'DELETED', 'RENAMED']
const lang = 'en'
const fontFamily = lang === 'ru'
  ? `Courier, monospace`
  : 'monospace'

const tableHeaderStyles = `
font-family: ${ fontFamily };
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
font-family: ${ fontFamily };
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

const getEmailFooter = lang => `<div>
  <hr />
  <i>${ TRANSLATE('date', lang, true) } ${ TRANSLATE('sent', lang) }: </i>
  ${ getFormattedDate() }
</div>
`

/**
 * HEADER LAYOUT
 * generateTableHeader =>
 * <tr>
 * getTableHeader =>
 *  getTableHeaderCell =>
 *   <td> ... </td>
 * </tr>
 * <tr>
 *  getTableData =>
 *   <td> ... </td>
 * </tr>
 * */


const getTableData = async paramsArray => {
  let html = ''
  paramsArray.forEach(param => {
    html+=`<td style="${ tableDataStyles }"> ${ param } </td>\n`
  })
  return await html
}

const getTableHeaderCell = (ACTION_TYPE, word, LANG) => LANG === 'en'
  ? `<td style="${ tableHeaderStyles }">
      ${ TRANSLATE(ACTION_TYPE.toLowerCase(), LANG, true, true) } ${ TRANSLATE(word, LANG, true, true) }
    </td>\n`
  : `<td style="${ tableHeaderStyles }">
      ${ TRANSLATE(word, LANG, true, true) } ${ TRANSLATE(ACTION_TYPE.toLowerCase(), LANG, true, true) } ${ TRANSLATE('a', LANG, true, true) }
    </td>\n`

const getTableHeader = async (paramsArray, actionType, lang) => {
  let html = ''
  paramsArray.forEach(param => {
    html+=getTableHeaderCell(actionType, param, lang)
  })
  return await html
}

const generateTableHeader = async(paramsArray, actionType, lang) => {
  let html = ''
  let keys = []
  let values = []
  paramsArray.forEach(param => {
    keys.push(param.key)
    values.push(param.value)
  })
  html+=`<tr>${ await getTableHeader(await keys, actionType, lang) }</tr>\n`
  html+=`<tr>${ await getTableData(await values) }</tr>`
  return await html
}

const commitTemplateWrapper = (summary, lang) => `
<div style="line-height: 15px;font-family: ${ fontFamily };margin: 0 0 5px 0;">
  <span style="margin-bottom: 5px;display: block;">
    ${ TRANSLATE('summary', lang, true) }:${summary}
  </span>
  <ul style="margin:0;line-height: 18px;list-style-type:none;padding:0;">`
const commitTemplateHeader = ({ filesChanged, allInsertions, allDeletions }) => {
  return `<ul style="margin-bottom: 18px;">
    <li style="display:flex;justify-content:space-between;width:220px;border-bottom: 1px solid black;">
      ${ TRANSLATE('all', lang, true) }
      ${ TRANSLATE('touched', lang) }
      ${ TRANSLATE('files', lang) }: <span>${ filesChanged }</span>
    </li>
    <li style="display:flex;justify-content:space-between;width:220px;">
      ${ TRANSLATE('all', lang, true) }
      ${ TRANSLATE('changes', lang) }: <span>${ +allInsertions + +allDeletions }</span>
    </li>
    <li style="display:flex;justify-content:space-between;width:220px;">
      ${ TRANSLATE('all', lang, true) }
      ${ TRANSLATE('insertions', lang) }
      ${ TRANSLATE('lines', lang) }: <span>${ allInsertions }</span>
    </li>
    <li style="display:flex;justify-content:space-between;width:220px;">
      ${ TRANSLATE('all', lang, true) }
      ${ TRANSLATE('deletions', lang) }
      ${ TRANSLATE('lines', lang) }: <span>${ allDeletions }</span>
    </li>
  </ul>`
}
const commitTemplate = (color, file) => `
  <li style="color: ${ color };margin: 0 0 5px 20px;">
    ●[${ file.action }]
    <b style="color: ${ colors.green };margin-left: 10px;">
      +${ file.insertions }
    </b>
    <b style="color: ${ colors.red }">
      -${ file.deletions }
    </b>
    <b style="color: ${ colors.lightBlue }">
      =${ +file.insertions + +file.deletions }
    </b>
    <b style="border-bottom: 1px dashed ${ color };margin-left: 10px;">
      ${ file.fileName }
    </b>
  </li>
`
const commitTemplateEnd = () =>
` </ul>
</div>`

const getReleaseInfoBlock = async ({
  LANG,
  numberOfCommits,
  filesChanged,
  insertions,
  deletions,
  changes,
  branches,
  allGitInfo
}) => {
  let html = ''

  html+=`<div style="color: ${ colors.lightBlue };font-family: ${ fontFamily };">
      <ul style="margin:0;line-height: 18px;">
        <li>Number of commits: <b>${ numberOfCommits }</b></li>
        <li>
          ${ TRANSLATE('all', LANG, true) }
          ${ TRANSLATE('changed', LANG) }
          ${ TRANSLATE('files', LANG) }: <b>${ filesChanged }</b></li>
        <li>
          ${ TRANSLATE('all', LANG, true) }
          ${ TRANSLATE('changes', LANG) }: <b>${ changes }</b>
          ${ TRANSLATE('lines', LANG) }</li>
        <li>
          ${ TRANSLATE('all', LANG, true) }
          ${ TRANSLATE('insertions', LANG) }: <b>${ insertions }</b>
          ${ TRANSLATE('lines', LANG) }</li>
        <li>
          ${ TRANSLATE('all', LANG, true) }
          ${ TRANSLATE('deletions', LANG) }: <b>${ deletions }</b>
          ${ TRANSLATE('lines', LANG) }</li>
        <li>
          ${ TRANSLATE('all', LANG, true) }
          ${ TRANSLATE('tasks', LANG) }: <b>${ branches.map(branch => branch).join(', ') }</b></li>
      </ul>
      <hr />
    </div>
    <h3 style="margin:0;font-family: ${ fontFamily };color: ${ colors.darkBlue };">COMMITS information:</h3>
    <div
      style="line-height: 15px;font-family: ${ fontFamily };margin: 0 0 5px 0;overflow-x: scroll;display: inline;width: 1000px;"
    >
      <ul style="margin:0;line-height: 18px;list-style-type: none;padding-left:25px;">
  `

  await allGitInfo.map((commit, index) => {
    html+=releaseCommitTemplate(colors.darkBlue, commit, index)
  })

  return html+=releaseCommitTemplateEnd()
}

const releaseCommitTemplate = (color, commit, index) => `
  <li style="
    margin-bottom: 0px;
    position: relative;
    display: flex;
    align-items: center;
    white-space: nowrap;color: ${ color };
  ">
    <span style="
      display: inline-block;
      width: 90px;
      min-width: 90px;
      white-space: nowrap;
      overflow-x: scroll;
      border-bottom: 1px dashed #ccc;
    "> ${ commit.commitDate } </span>&nbsp;| =>&nbsp;
    <code><pre style="display: inline-block; margin: 0 10px 0 0;">${ insertSpaces(commit.graph) }</pre></code>
    <span style="margin-left: 10px;line-height: 12px;">
      [${ addZero(index + 1) }]:
      [ <b style="color: ${ colors.green }"> +${ commit.commitInfo.insertions } </b>
        <b style="color: ${ colors.red }"> -${ commit.commitInfo.deletions } </b>
        <b style="color: ${ colors.lightBlue }">
          =${ +commit.commitInfo.insertions + +commit.commitInfo.deletions }
        </b>
        (${ commit.commitInfo.filesChanged })
      ]: <span">${ commit.developerName }</span>&nbsp;=>&nbsp;
      <b style="
        border-bottom: 1px dashed #ccc;
        display:inline-flex;
        justify-content:space-between;
      ">
        <span style="
          margin-right:5px;
          width:300px;
          overflow-x: scroll;
        ">
          ${ commit.commitName.split('-').join(' ') }
        </span>
      </b>
    </span>
  </li>
`

const releaseCommitTemplateEnd = () =>
` </ul>
</div>`

const getHelperBlockTitle = ACTION_TYPE => `
<h2 style="font-size:18px;margin:0 0 10px 0;font-family: ${ fontFamily };color: ${ colors.lightBlue };">
  ${ TRANSLATE(ACTION_TYPE.toLowerCase(), lang, true, true) }
  ${ TRANSLATE('information', lang, true, true) }:
</h2>`

const getWordByType = letter => actionWords.filter(word => word[0] === letter)

const getChangedFilesTitle = (actionType, color, stats) => `
<h3 style="margin:0 0 10px 0;font-family: ${ fontFamily };color: ${ color };">
  ${
    TRANSLATE(getWordByType(actionType)[0].toLowerCase(), lang, true)
  } ${ TRANSLATE('files', lang) }<br />
  <span
    style="border-bottom: 1px dashed ${ color };margin-left:10px;display:flex;justify-content:space-between;width:200px;"
  >
    ${ TRANSLATE('insertions', lang, true) }
    ${ TRANSLATE('lines', lang) }: <span>${ stats.insertions } </span>
  </span>
  <span
    style="border-bottom: 1px dashed ${ color };margin-left:10px;display:flex;justify-content:space-between;width:200px;"
  >
    ${ TRANSLATE('deletions', lang, true) }
    ${ TRANSLATE('lines', lang) }: <span>${ stats.deletions } </span>
  </span>
  <span
    style="border-bottom: 1px dashed ${ color };margin-left:10px;display:flex;justify-content:space-between;width:200px;"
  >
    ${ TRANSLATE('all', lang, true) }
    ${ TRANSLATE('changes', lang) }: <span>${ +stats.insertions + +stats.deletions }</span>
  </span>
</h3>
`


module.exports = {
  getEmailFooter,
  generateTableHeader,
  getHelperBlockTitle,
  getChangedFilesTitle,
  commitTemplate,
  commitTemplateWrapper,
  commitTemplateHeader,
  commitTemplateEnd,
  getReleaseInfoBlock,
  releaseCommitTemplate,
  releaseCommitTemplateEnd,
  getTableHeaderCell
}