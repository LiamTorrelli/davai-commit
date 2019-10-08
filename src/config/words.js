const tasks = {
  checkIfFilesExist: {
    title: '# Checking file(s). Making sure startup file(s) exist(s)',
    error: '# At least one of the start up files does not exist. Check DAVAI-CONFIG.json'
  },
  setStatusedFiles: {
    title: '# Setting GIT status files',
    error: '# There was an error while setting git status files'
  },
  setDeveloper: {
    title: '# Setting GIT developer name',
    error: '# There was an error while setting git developer name'
  },
  setProjectInfo: {
    title: '# Setting the project info',
    error: '# There was an error while getting project info'
  },
  submitAllToGithub: {
    title: '# Committing',
    error: '# There was an error while Committing'
  }
}

export { tasks }
