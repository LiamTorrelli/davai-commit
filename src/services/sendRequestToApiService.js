// Heplers
import { __isEmpty } from '../helpers/help'

export class SendRequestToApiService {
  async getProjectName() {
    // TODO: move here the request from the store
    const output = shell.exec('basename "$PWD"')
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  }
}
