// Services
import { GitService } from '../../../services/gitService'

// Handlers
import { logError } from '../../../handlers/outputHandler'

export const GIT_M_SETTING = {

  async setStatusedFiles() {
    try {
      const {
        result,
        code,
        ErrorMessage
      } = await new GitService().getGitStatus()

      if (code !== 0) throw new Error(ErrorMessage)

      this.statusedFiles = result
      return this
    } catch (err) { return logError('Setting status files failed:', err) }
  },

  async setDeveloper() {
    try {
      const {
        result,
        code,
        ErrorMessage
      } = await new GitService().getGitUserName()

      if (code !== 0) throw new Error(ErrorMessage)

      this.developer = result
      return this
    } catch (err) { return logError('Setting developer failed:', err) }
  }

}
