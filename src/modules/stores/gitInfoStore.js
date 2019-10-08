// Libs
import { observable, action, autorun } from 'mobx'

// Sub services
import {
  GIT_S_SETTING,
  GIT_S_COMMITTING,
  GIT_S_BRANCHING,
  GIT_S_STAGING,
  GIT_S_PUSHING,
  GIT_S_TAGGING,
  GIT_S_MERGING,
  GIT_S_PULLING,
  GIT_S_OTHER
} from './gitInfoSubStores/index'

// Handlers
import { logAutorun } from '../../handlers/outputHandler'

export const GitInfoStore = observable({
  developer: null,
  currentBranch: null, // setCurrentBranch
  commitType: '',
  releaseType: '',
  statusedFiles: [],
  switchedToReleaseBranch: false,
  commitMessage: '',
  commitStatus: '',
  pushingCommitOutputMsg: '',
  creatingTagOutputMsg: '',
  tagName: '',
  tagPushStatus: '',

  ...GIT_S_SETTING,
  ...GIT_S_COMMITTING,
  ...GIT_S_BRANCHING,
  ...GIT_S_STAGING,
  ...GIT_S_PUSHING,
  ...GIT_S_TAGGING,
  ...GIT_S_MERGING,
  ...GIT_S_PULLING,
  ...GIT_S_OTHER

}, {
  setDeveloper: action,
  setCurrentBranch: action,
  setStatusedFiles: action,
  createReleaseMsg: action,
  createCommitMsg: action,
  pushCommit: action,
  createTag: action,
  mergeBranch: action,
  stageFiles: action,
  pullBranch: action
})

autorun(() => {
  logAutorun('Git Info')
  // logStoreValues(GitInfoStore, 'GitInfoStore')
})
