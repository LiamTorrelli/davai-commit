import { observable, action, autorun } from 'mobx'
import { mapObjIndexed } from 'ramda'

// Helpers
import { cleanUpFromN, upTheVersion } from '../../helpers/help'
import { HumanDate } from '../../helpers/humanTimestamp'

// Service
import { EmailService } from '../../services/emailService'

// Handlers
import { logError, logAutorun, logStoreValues } from '../../handlers/outputHandler'

export const EmailInfoStore = observable({
  header: null,

  setEmailHeader() {
    try {
      // const developerName = new EmailService()
      //   .getDeveloperName()

      const header = 'Wuhan Zan TASK: WHZN-332'
      this.header = header
      return this
    } catch (err) { return logError('Setting Release Action Date failed:', err) }
  }

}, {
  setEmailHeader: action
})

autorun(() => {
  // logAutorun('Email Info')
  // logStoreValues(EmailInfoStore, 'EmailInfoStore')
})
