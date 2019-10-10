'use strict';

const getPrametersFromShell = () => process.argv.filter((value, index) => (index !== 0 && index !== 1) ? value : '')

module.exports = {
  getPrametersFromShell
}