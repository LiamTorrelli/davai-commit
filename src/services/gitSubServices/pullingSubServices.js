// Libs
import shell from 'shelljs'

export const GIT_S_PULLING = {

  async pullBranch(branchName) {
    const output = shell.exec(`git pull origin ${branchName}`)
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  }

}
