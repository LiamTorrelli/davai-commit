// Libs
import { observable, action } from 'mobx'
import axios from 'axios'

// Handlers
import { SendRequestToApiService } from '../../services/sendRequestToApiService'

export const SendRequestToApiStore = observable({
  async sendCommitInfo({
    projectName,
    branch,
    commitSource,
    developer,
    commitDate,
    commitDateString,
    commitMsg
  }) {
    try {
      await axios({
        method: 'post',
        url: 'https://api.incodewetrust.dev/commits',
        data: {
          projectName,
          branch,
          commitSource,
          developer,
          commitDate,
          commitDateString,
          commitMsg
        }
      });

      return this
    } catch (err) {
      console.log('Yep =)')
      return this
    }
  }

}, {
  sendCommitInfo: action
})
