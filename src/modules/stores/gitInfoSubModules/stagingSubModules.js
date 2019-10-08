// Services
import { GitService } from '../../../services/gitService'

// Handlers
import { logError } from '../../../handlers/outputHandler'

export const GIT_M_STAGING = {

  async stageFiles() {
    try {
      const {
        code,
        ErrorMessage
      } = await new GitService().addFilesToGitStage()

      if (code !== 0) throw new Error(ErrorMessage)

      this.filesAreStaged = code === 0
      return this
    } catch (err) { return logError('Staging files failed:', err) }
  }

}
