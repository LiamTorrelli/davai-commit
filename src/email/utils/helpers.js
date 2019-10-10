'use strict';

const insertSpaces = str => str.split(' ').join('&nbsp;')

const addZero = num => (num < 10) ? `0${ num }` : num

const formatDate = dateObj => `${ addZero(dateObj.getDate()) }/${ addZero(dateObj.getMonth() + 1) }/${ dateObj.getFullYear() } ${ addZero(dateObj.getHours()) }:${ addZero(dateObj.getMinutes()) }:${ addZero(dateObj.getSeconds()) }`

const getFormattedDate = dateObj => {
  let originalDate = new Date()
  if (dateObj) originalDate = new Date(Number(dateObj * 1000))
  return formatDate(originalDate)
}

const getHumanDate = dateStr => formatDate(dateStr)

const strToArray = str => str.split('\n')
const cleanDuplicates = arr => arr.filter((elem, index, self) => index == self.indexOf(elem))
const isObject = smth => {
  const type = typeof smth
  return type === 'function' || type === 'object' && !!smth
}
const isArray = smth => Array.isArray(smth)
const isString = smth => typeof smth === 'string'
const isEmpty = smth => smth === ''
  || smth === {}
  || smth === []
  || smth === null

module.exports = {
  insertSpaces,
  addZero,
  getFormattedDate,
  getHumanDate,
  strToArray,
  cleanDuplicates,
  isObject,
  isArray,
  isString,
  isEmpty
}