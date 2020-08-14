// Libs
import fs from 'fs'
import path from 'path'
import shell from 'shelljs'

// Heplers
import { __isEmpty } from '../helpers/help'

export class FilesService {
  async getProjectName() {
    const output = shell.exec('basename "$PWD"', { silent: true })
    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code
    }
  }

  fileToJson() { return JSON.parse(fs.readFileSync(this.filePath, 'utf-8')) }

  fileContents() { return fs.readFileSync(this.filePath, 'utf-8') }

  checkIfFilesExist() {
    const { filePaths = [] } = this
    const filesStatuses = filePaths.map(fileName => fs.existsSync(path.join('.', fileName)))

    return filesStatuses.filter(v => !v).indexOf(false) !== 0
  }

  setFilePath(filePath) {
    this.filePath = filePath
    return this
  }

  get parsedJson() { return this.fileToJson() }

  get contents() { return this.fileContents() }

  get existance() { return this.checkIfFilesExist() }
}
