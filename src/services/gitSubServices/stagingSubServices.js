// Libs
import shell from 'shelljs'

export const GIT_S_STAGING = {

  async addFilesToGitStage(allFiles = true) {
    // TODO: abilty to choose files to add to commit
    const action = allFiles ? 'add .' : 'add .'

    const output = shell.exec(`git ${action}`, { silent: true })
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  }

}
