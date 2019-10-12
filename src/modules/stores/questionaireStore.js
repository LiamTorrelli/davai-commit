import { observable, action, autorun } from 'mobx'

// Handlers
import { logError, logAutorun, logStoreValues } from '../../handlers/outputHandler'

// Helpers
import { __isEmpty } from '../../helpers/help'

// This store asks questions
export const QuestionaireStore = observable({
  PROJECT_NAME: [],
  // TODO - ing
  askForMoney() {
    try {
      console.log('')
      return this
    } catch (err) { return logError('Asking for failed:', err) }
  }

}, {
  askForMoney: action
})

autorun(() => {
  // logAutorun('QuestionaireStore Info')
  // logStoreValues(QuestionaireStore, 'QuestionaireStore')
})
