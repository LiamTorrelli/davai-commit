import { observable, action, autorun } from 'mobx'

// Handlers
import { logAutorun, logStoreValues } from '../../handlers/outputHandler'

export const ShellArgumentsStore = observable({
  directory: null,
  sendCommit: false,
  commitMsg: null,
  sendEmail: false,
  emailMsg: null,
  actionType: null,
  taskName: null,
  pagePath: null,
  pageQueryParams: null,
  releaseType: null,
  description: null,
  newReleaseBranch: null,

  setDirectory(dir) {
    this.directory = dir

    return this
  },
  setActionType(actionType) {
    this.actionType = actionType

    return this
  },
  setSendCommit(needToSend) {
    this.sendCommit = needToSend

    return this
  },
  setCommitMessage(commitMsg) {
    this.commitMsg = commitMsg

    return this
  },
  setSendEmail(needToSend) {
    this.sendEmail = needToSend

    return this
  },
  setEmailMessage(emailMsg) {
    this.emailMsg = emailMsg

    return this
  },
  setTaskName(taskName) {
    this.taskName = taskName

    return this
  },
  setPagePath(pagePath) {
    this.pagePath = pagePath

    return this
  },
  setPageQueryParams(pageQueryParams) {
    this.pageQueryParams = pageQueryParams

    return this
  },
  setDescription(description) {
    this.description = description

    return this
  },
  setNewReleaseBranch(branch) {
    this.newReleaseBranch = branch

    return this
  }

}, {
  setDirectory: action,
  setCommitMessage: action,
  setSendCommit: action,
  setSendEmail: action,
  setEmailMessage: action,
  setDescription: action,
  setActionType: action,
  setTaskName: action,
  setPagePath: action,
  setPageQueryParams: action,
  setNewReleaseBranch: action
})

autorun(() => {
  // logAutorun('Shell Arguments')
  // logStoreValues(ShellArgumentsStore, 'ShellArgumentsStore')
})
