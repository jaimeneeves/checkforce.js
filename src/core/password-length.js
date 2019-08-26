/**
 * Check length of the password
 */
export const passwordLength = (input, options = {}) => {
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