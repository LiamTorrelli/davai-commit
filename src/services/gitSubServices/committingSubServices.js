// Libs
import shell from 'shelljs'

export const GIT_S_COMMITTING = {

  async commitChanges({ commitMessage }) {
    const output = shell.exec(`git commit -m "${commitMessage}"`)
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  }

}
