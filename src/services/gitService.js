// Sub Services
import {
  GIT_S_BRANCHING,
  GIT_S_MERGING,
  GIT_S_STAGING,
  GIT_S_COMMITTING,
  GIT_S_PUSHING,
  GIT_S_PULLING,
  GIT_S_TAGGING,
  GIT_S_SETTING,
  GIT_S_OTHER
} from './gitSubServices'

export class GitService {
  getCurrentBranch() { return GIT_S_BRANCHING.getCurrentBranch() }
  createBranch(args) { return GIT_S_BRANCHING.createBranch(args) }
  mergeBranch(args) { return GIT_S_MERGING.mergeBranch(args) }
  addFilesToGitStage(args) { return GIT_S_STAGING.addFilesToGitStage(args) }
  commitChanges(args) { return GIT_S_COMMITTING.commitChanges(args) }
  pushCommit(args) { return GIT_S_PUSHING.pushCommit(args) }
  pushReleaseTag(args) { return GIT_S_PUSHING.pushReleaseTag(args) }
  pushAfterMerge(args) { return GIT_S_PUSHING.pushAfterMerge(args) }
  pullBranch(args) { return GIT_S_PULLING.pullBranch(args) }
  createGitTag(args) { return GIT_S_TAGGING.createGitTag(args) }
  getGitStatus() { return GIT_S_OTHER.getGitStatus() }
  getGitUserName() { return GIT_S_OTHER.getGitUserName() }
  fetchHistory() { return GIT_S_OTHER.fetchHistory() }
}
