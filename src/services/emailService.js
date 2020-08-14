import fs from 'fs'
import path from 'path'
import { __isEmpty } from '../helpers/help'

export class EmailService {
  fileToJson() { return JSON.parse(fs.readFileSync(this.filePath, 'utf-8')) }

  fileContents() { return fs.readFileSync(this.filePath, 'utf-8') }

  checkIfFilesExist() {
    const { filePaths = [] } = this
    const filesStatuses = filePaths.map(fileName => fs.existsSync(path.join('.', fileName)))

    return filesStatuses.filter(v => !v).indexOf(false) !== 0
  }

  setFiles(filesArray) {
    this.filePaths = filesArray.filter(file => file)
    return this
  }

  setFilePath(filePath) {
    this.filePath = filePath
    return this
  }

  get parsedJson() { return this.fileToJson() }

  get contents() { return this.fileContents() }

  get existance() { return this.checkIfFilesExist() }
}
