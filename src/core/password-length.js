/**
 * check length of the password
 */
export const PasswordLength = (input, options = {}) => {
  const pwdlength = input.value.length
  let scores = 0

    if (pwdlength > options.passIndex && pwdlength < options.minimumChars) {
      // options.scores += 5
      scores += 5
    } else if ((pwdlength >= options.minimumChars) && (pwdlength <= options
      .maximumChars)) {
      // options.scores += 10
      scores += 10
    } else if (pwdlength > options.maximumChars) {
      // options.scores += 25
      scores += 25
    }

    return scores
}