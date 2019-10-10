const {
  isObject,
  isArray
} = require('./helpers')

const logObject = message => {
  const keys = Object.keys(message)
  const values = Object.values(message)
  keys.forEach((key, index) => console.log(`${key}: ${values[index]}`))
  console.log('_______________________________________________________')
}

const LOG = (
  message = 'You did not send anything to log',
  name = 'LOGGING',
  isCollapsed = false
) => {
  if (isCollapsed) console.groupCollapsed(name.toUpperCase())
  else console.group(name.toUpperCase())

  if (isArray(message)) {
    // It is an Array
    message.forEach((value, index) => {
      if ((!isArray(value) && isObject(value))) logObject(value)
      else {
        console.log(`${index}: ${value}`)
        console.log('_______________________________________________________')
      }
    })
  } else if (!isArray(message) && isObject(message)) {
    // It is an Object
    logObject(message)
  } else {
    console.log(message)
    console.log('_______________________________________________________')
  }
  console.groupEnd()
}
module.exports = {
  LOG
}
