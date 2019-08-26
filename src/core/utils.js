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

/**
 * Check length of the password
 */
export const PasswordLength = (input, options = {}) => {
  const pwdlength = input.value.length
  let scores = 0

    if ((pwdlength > options.passIndex) && (pwdlength < options.minimumChars)) {
      scores += 5
    } else if ((pwdlength >= options.minimumChars) && (pwdlength <= options.maximumChars)) {
      scores += 10
    } else if (pwdlength > options.maximumChars) {
      scores += 25
    }

    return scores
}

/**
 * Check number in the password
 */
export const numberPassword = (password, options = {}) => {
  var value = password

  var numberCount = countContain(value, options.number)

  if (numberCount === 1 || numberCount === 2) { options.scores += 10 }

  if (numberCount >= 3) { options.scores += 20 }

  options.numberCheck.haveNumber = numberCount !== 0
  options.numberCheck.lengthNumber = numberCount
}