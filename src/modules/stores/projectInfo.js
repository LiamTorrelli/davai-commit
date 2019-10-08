import { observable, action, autorun } from 'mobx'
import { mapObjIndexed } from 'ramda'

// Helpers
import { cleanUpFromN, upTheVersion } from '../../helpers/help'
import { HumanDate } from '../../helpers/humanTimestamp'

// Service
import { FilesService } from '../../services/filesService'

// Handlers
import { logError, logAutorun, logStoreValues } from '../../handlers/outputHandler'

export const ProjectInfoStore = observable({
  actionTime: null,
  releaseDescription: null,
  oldVersion: null,
  newVersion: null,

  setProjectInfo(obj) {
    mapObjIndexed((value, key) => {
      this[key] = value
    }, obj)
    return this
  },
  setActionDate() {
    try {
      const actionTime = new HumanDate(new Date(), 'en', false)
        .setNeededParam('humanDateObj')
        .neededInfo

      this.actionTime = actionTime
      return this
    } catch (err) { return logError('Setting Release Action Date failed:', err) }
  },
  setReleaseDescription(desc) {
    this.releaseDescription = desc
    return this
  },
  setOldVersion(versionFile) {
    try {
      const version = new FilesService()
        .setFilePath(versionFile)
        .contents

      this.oldVersion = cleanUpFromN(version)
      return this
    } catch (err) { return logError('Setting Old Version failed:', err) }
  },
  setNewVersion(releaseType) {
    try {
      const newVersion = upTheVersion(this.oldVersion, releaseType)

      if (!newVersion) return logError('Setting New Version failed:', 'Problem with release type or old version')

      this.newVersion = newVersion

      return this
    } catch (err) { return logError('Setting New Version failed:', err) }
  }

}, {
  setProjectInfo: action,
  setActionDate: action,
  setReleaseDescription: action,
  setOldVersion: action,
  setNewVersion: action
})

autorun(() => {
  // logAutorun('Project Info')
  // logStoreValues(ProjectInfoStore, 'ProjectInfoStore')
})
