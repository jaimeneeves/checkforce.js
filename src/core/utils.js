// Checks a string for a list of characters
export const countContain = (strPassword, strCheck) => {
  let count = 0

  let lengthPwd = strPassword.length

  for (let i = 0; i < lengthPwd; i++) {
    if (strCheck.indexOf(strPassword.charAt(i)) > -1) {
      count++
    }
  }
  return count
}

// Utility method to extend defaults with user options
export const extendDefaults = (source, properties) => {
  let property
  for (property in properties) {
    if (properties.hasOwnProperty(property)) {
      source[property] = properties[property]
    }
  }
  return source
}