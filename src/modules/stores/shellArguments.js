import { observable, action, autorun } from 'mobx'

export const ShellArgumentsStore = observable({
  directory: null,
  commitMsg: null,
  commitDate: null,
  commitDateString: null,

  setDirectory(dir) {
    this.directory = dir

    return this
  },

  setCommitMessage(commitMsg) {
    this.commitMsg = commitMsg

    return this
  },

  setCommitDate(commitDate) {
    this.commitDate = commitDate

    return this
  },

  setCommitDateString(commitDateString) {
    this.commitDateString = commitDateString

    return this
  }

}, {
  setDirectory: action,
  setCommitMessage: action,
  setCommitDate: action,
  setCommitDateString: action
})
