// Libs
import shell from 'shelljs'

export const GIT_S_COMMITTING = {

  async commitChanges({ commitMessage }) {
    // TODO: Separate the head from the body of the message

    const output = shell.exec(`git commit -m "${commitMessage}"`)
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  }

}
