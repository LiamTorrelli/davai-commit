import { observable, action, autorun } from 'mobx'

export const ShellArgumentsStore = observable({
  directory: null,
  commitMsg: null,
  commitDate: null,
  commitDateString: null,
  isStandup: false,
  standupAmount: 0,

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
  },

  setIsStandup(isStandup) {
    this.isStandup = isStandup

    return this
  },

  setStandupNumber(standupAmount) {
    this.standupAmount = standupAmount

    return this
  }

}, {
  setDirectory: action,
  setCommitMessage: action,
  setCommitDate: action,
  setCommitDateString: action,
  setIsStandup: action,
  setStandupNumber: action
})
