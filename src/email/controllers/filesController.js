'use strict';

const fs = require('fs');
const path = require('path');
const { LOG } = require('./../utils/logger')

// TODO: Togglign of the basePath in DEV and PROD modes
// /* DEV  */ const basePath = './'
/* PROD */ const basePath = process.env.PWD
const credsFilePath = '/icwt-management/CREDS'

const getCredentials = () =>
  fs.readFileSync(path.join(basePath, credsFilePath), 'utf-8')
    .split('\n')
    .map(line => ({
      key: line.split('=')[0],
      value: line.split('=')[1]
    }))

module.exports = {
  getCredentials
}