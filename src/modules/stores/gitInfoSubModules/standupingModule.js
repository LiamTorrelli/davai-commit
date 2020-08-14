// Libs
import chalk from 'chalk'

// Services
import { GitService } from '../../../services/gitService'
// Handlers
import { logError } from '../../../handlers/outputHandler'

import { cleanUpFromN, cleanUpSpaces } from '../../../helpers/help'

export const GIT_M_STANDUPING = {

  prepareStringWithSpaces(str, neededAmount) {
    const incomingStr = cleanUpSpaces(str)
    let returningResult = ''
    const additionalSpaces = Number(neededAmount) - incomingStr.length
    for (let i = 0; i <= additionalSpaces - 3; i += 1) returningResult += ' '
    returningResult += incomingStr
    return returningResult
  },

  async getStandup(standupAmount) {
    try {
      const {
        result,
        code,
        ErrorMessage
      } = await new GitService().getStandupInfo(standupAmount)

      if (code !== 0) throw new Error(ErrorMessage)

      if (result) {
        const commits = []
        const names = []
        result
          .split('?&@&?')
          .filter(line => line)
          .forEach((line, index) => {
            const clearLine = line

            if (index % 2 === 1) commits.push(clearLine)
            else names.push(clearLine)
          })

        const longestName = names.reduce((name1, name2) => name1.length > name2.length ? name1 : name2).length

        console.log('\n')

        names.forEach((name, index) => {
          const commiterName = this.prepareStringWithSpaces(cleanUpSpaces(cleanUpFromN(name)), longestName)
          const commitMessage = cleanUpFromN(commits[index])
          console.log(
            chalk.green(commiterName),
            chalk.bold.cyan(commitMessage)
          )
        })
        console.log('\n')
      }

      return this
    } catch (err) { return logError('Getting git stadup info failed:', err) }
  }

}
