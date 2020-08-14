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
  createCommitMsg: {
    title: '# Creating a commit message',
    error: '# There was an error while creating a commit message'
  },
  stageFiles: {
    title: '# Staging files',
    error: '# There was an error while Staging files'
  },
  pushCommit: {
    title: '# Pushing commit',
    error: '# There was an error while Pushing commit'
  },
  sendToApi: {
    title: ' ¯\\_(ツ)_/¯¯ You are awesome!',
    error: ''
  }
}

export { tasks }
