// Libs
import { observable, action } from 'mobx'

// Handlers
import { logError } from '../../handlers/outputHandler'
import { FilesService } from '../../services/filesService'

export const FilesInfoStore = observable({
  PROJECT_NAME: [],

  async setProjectName() {
    try {
      const {
        result,
        code,
        ErrorMessage
      } = await new FilesService().getProjectName()

      if (code !== 0 && code !== 1) throw new Error(ErrorMessage)

      this.PROJECT_NAME = result

      return this
    } catch (err) {
      return logError('Setting project name failed:', 'There was a problem with getting the base of directory')
    }
  }

}, {
  setProjectName: action
})
