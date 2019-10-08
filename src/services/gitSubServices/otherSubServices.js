// Libs
import shell from 'shelljs'

export const GIT_S_OTHER = {

  getGitStatus() {
    const output = shell.exec('git status -s -u')
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  },

  getGitUserName() {
    const output = shell.exec('git config user.name')
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  },

  fetchHistory() {
    const output = shell.exec('git fetch --all')
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  }
}
