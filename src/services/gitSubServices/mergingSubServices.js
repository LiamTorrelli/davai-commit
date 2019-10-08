// Libs
import shell from 'shelljs'

export const GIT_S_MERGING = {

  async mergeBranch(branchName) {
    const output = shell.exec(`git merge ${branchName}`)
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  }

}
