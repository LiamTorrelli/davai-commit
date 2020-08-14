// Libs
import shell from 'shelljs'

export const GIT_S_STANDUPING = {

  async getStandupInfo(standupAmount) {
    const output = shell.exec(
      `git log -${standupAmount} --format="?&@&? %aN ?&@&? %s"`,
      { silent: true }
    )

    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  }

}
