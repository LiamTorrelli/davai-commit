// Libs
import shell from 'shelljs'

export const GIT_S_BRANCHING = {

  async getCurrentBranch() {
    const output = shell.exec('git symbolic-ref --short HEAD')
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  },

  async createBranch(branch) {
    const output = shell.exec(`git checkout -b ${branch}`)
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  }

}
