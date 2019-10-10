import { observable, action, autorun } from 'mobx'

// Handlers
import { logError, logAutorun, logStoreValues } from '../../handlers/outputHandler'
import { FilesService } from '../../services/filesService'

// Helpers
import { __isEmpty } from '../../helpers/help'

// TODO: move this to the global config
const CONFIG_FILE_PATH = 'DAVAI-CONFIG.json'

export const FilesInfoStore = observable({
  PROJECT_NAME: [],
  EMAIL_CONFIG: {},
  config: {},
  configFileExists: false,

  getConfigurationFile() {
    try {
      this.config = new FilesService()
        .setFilePath(CONFIG_FILE_PATH)
        .parsedJson

      return this
    } catch (err) { return logError('Getting Configuration File failed:', err) }
  },

  async checkConfigFile() {
    const { config } = this.getConfigurationFile() || {}

    this.configFileExists = !__isEmpty(config)

    return this
  },

  async setProjectName() {
    const { config } = this.getConfigurationFile() || {}

    if (!__isEmpty(config)) {
      const { PROJECT_NAME } = config
      this.PROJECT_NAME = PROJECT_NAME

      return this
    }
    return logError('Setting project name failed:', 'There was a problem with a config file')
  },

  async setEmailCreds() {
    const { config } = this.getConfigurationFile() || {}

    if (!__isEmpty(config)) {
      const { EMAIL_CONFIG } = config
      const {
        LOGIN,
        PASS,
        SERVICE,
        SENDER_LIST
      } = EMAIL_CONFIG

      if (!LOGIN
      || !PASS
      || !SERVICE
      || !SENDER_LIST
      ) return logError('Setting email credentials failed:', 'Check EMAIL_CONFIG')

      this.EMAIL_CONFIG = EMAIL_CONFIG

      return this
    }
    return logError('Setting email credentials failed:', 'There was a problem with a config file')
  }

}, {
  checkConfigFile: action,
  setProjectName: action,
  setEmailCreds: action
})

autorun(() => {
  // logAutorun('Files Info')
  // logStoreValues(FilesInfoStore, 'FilesInfoStore')
})
