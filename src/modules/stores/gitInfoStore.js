// Libs
import { observable, action, autorun } from 'mobx'

// Sub modules
import {
  GIT_M_SETTING,
  GIT_M_COMMITTING,
  GIT_M_BRANCHING,
  GIT_M_STAGING,
  GIT_M_PUSHING,
  GIT_M_TAGGING,
  GIT_M_MERGING,
  GIT_M_PULLING,
  GIT_M_OTHER
} from './gitInfoSubModules/index'

// Handlers
import { logAutorun } from '../../handlers/outputHandler'

export const GitInfoStore = observable({
  developer: null,
  currentBranch: null,
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
  filesAreStaged: false,

  ...GIT_M_SETTING,
  ...GIT_M_COMMITTING,
  ...GIT_M_BRANCHING,
  ...GIT_M_STAGING,
  ...GIT_M_PUSHING,
  ...GIT_M_TAGGING,
  ...GIT_M_MERGING,
  ...GIT_M_PULLING,
  ...GIT_M_OTHER

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
  // logAutorun('Git Info')
  // logStoreValues(GitInfoStore, 'GitInfoStore')
})
