// Libs
import shell from 'shelljs'

export const COMMITTING = {

  async commitChanges({ msg }) {
    const command = 'git commit -m "' +msg +'"'
    const output = shell.exec(command)
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  }
}
