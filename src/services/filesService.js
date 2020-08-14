// Libs
import fs from 'fs'
import path from 'path'
import shell from 'shelljs'

// Heplers
import { __isEmpty } from '../helpers/help'

export class FilesService {
  async getProjectName() {
    const output = shell.exec('basename "$PWD"')
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

  findAndChangeLineInFile({
    directory,
    fileName,
    findBy,
    replaceBy
  }) {
    if (!findBy
      || !directory
      || !fileName
    ) return new Error('Smth is not right with params while finding line')

    const resolvedFilePath = path.resolve(directory, fileName)
    const linesOfAFile = fs.readFileSync(resolvedFilePath, 'utf8').split('\n')
    const foundTheLine = []
    const allChangedLines = []

    const regex = new RegExp(findBy, 'ig')
    linesOfAFile.forEach(line => {
      let newLine = line
      if (regex.test(newLine)) {
        newLine = `${replaceBy}`
        foundTheLine.push(true)
      }
      allChangedLines.push(newLine)
      foundTheLine.push(false)
    })

    fs.writeFileSync(
      resolvedFilePath,
      allChangedLines.join('\n'),
      { encoding: 'utf8', flag: 'w+' }
    )
    return foundTheLine.includes(true)
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
