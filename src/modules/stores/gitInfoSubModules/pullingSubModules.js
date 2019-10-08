// Services
import { GitService } from '../../../services/gitService'

// Handlers
import { logError } from '../../../handlers/outputHandler'

// Helpers
import { cleanUpFromN } from '../../../helpers/help'

export const GIT_M_PULLING = {

  async pullBranch(branchName) {
    try {
      const {
        result,
        code,
        ErrorMessage
      } = await new GitService().pullBranch(branchName)

      if (code !== 0) throw new Error(ErrorMessage)

      this.mergeStatus = cleanUpFromN(result)

      return this
    } catch (err) { return logError(`Pulling branch [ ${branchName} ] failed:`, err) }
  }

}
