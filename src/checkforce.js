import Options from './checkforce-options'
import ProgressHtml from './progress-html'

/**
 * checkforce.js
 *
 * @author Jaime Neves <https://github.com/dejaneves>
 * @license MIT
 */

/**
 * @param {String|HTMLElement} input
 * @param {Object} options
 */

const CheckForce = (input, optionsParams) => {
  const CheckForceOptions = new Options(input, optionsParams)
  let options = CheckForceOptions.getOptions()

  if (typeof input === 'string') {
    input = document.querySelector(input)
  }

  // Create options by extending defaults with the passed in arugments
  // options = typeof options === 'object' ? extendDefaults(defaults, options) : defaults

  const checkPassword = (callback) => {
    let trigger = document.querySelector(options.trigger.selector)

    if (!trigger) {
      throw new Error('Element ' + options.trigger.selector + ' must exist to init the trigger')
    }

    trigger.addEventListener(options.trigger.eventListener, () => {
      options.scores = 0

      // Check size and letters password
      sizeAndLettersPassword()

      // Check Numbers
      numberPassword()
      // Check Characters
      charactersPassword()
      // Text of password
      textForce()

      options.width = options.scores * 1.25 > 100 ? 100 : options.scores * 1.25

      if (options.scores > 0) {
        if (options.BootstrapTheme && !options.MaterializeTheme) {
          renderBootstrap()
        } else if (options.MaterializeTheme && !options.BootstrapTheme) {
          renderMaterialize()
        } else {
          options.content = options.text
        }
      } else {
        options.content = ''
        options.text = ''
      }

      callback({
        scores: options.scores,
        width: options.width,
        text: options.text,
        content: options.content,
        charsSpecialCheck: options.charsSpecialCheck,
        numberCheck: options.numberCheck,
        uppercaseCheck: options.uppercaseCheck,
        lowercaseCheck: options.lowercaseCheck
      })
    })
  }

  const checkPasswordOnlyTest = () => {
    let trigger = document.querySelector(options.trigger.selector)

    if (!trigger) {
      throw new Error('Element ' + options.trigger.selector + ' must exist to init the trigger')
    }
    options.scores = 0

    // Check size and letters password
    sizeAndLettersPassword()
    // Check Numbers
    numberPassword()
    // Check Characters
    charactersPassword()
    // Text of password
    textForce()

    return {
      scores: options.scores,
      width: options.width,
      text: options.text,
      content: options.content,
      charsSpecialCheck: options.charsSpecialCheck,
      numberCheck: options.numberCheck,
      uppercaseCheck: options.uppercaseCheck,
      lowercaseCheck: options.lowercaseCheck
    }
  }

  /**
   * Run on node environment
   * @param  {String} password
   * @return {Object}
   */
  const checkPasswordNode = (password) => {
    options.scores = 0
    input = { value: password }

    // Check size and letters password
    sizeAndLettersPassword()
    // Check Numbers
    numberPassword()
    // Check Characters
    charactersPassword()
    // Text of password
    textForce()

    return {
      scores: options.scores,
      charsSpecialCheck: options.charsSpecialCheck,
      numberCheck: options.numberCheck,
      uppercaseCheck: options.uppercaseCheck,
      lowercaseCheck: options.lowercaseCheck
    }
  }

  /**
   * Check size and letters password
   *
   */
  const sizeAndLettersPassword = () => {
    let upperCount = countContain(input.value, options.uppercase)
    let lowerCount = countContain(input.value, options.lowercase)
    options.uppercaseCheck.haveUppercase = false
    options.lowercaseCheck.haveLowercase = false
    options.uppercaseCheck.lengthUppercase = 0
    options.lowercaseCheck.lengthLowercase = 0

    // ** Check length of the password **
    if (input.value.length > options.passIndex && input.value.length < options.minimumChars) {
      options.scores += 5
    } else if ((input.value.length >= options.minimumChars) && (input.value.length <= options
      .maximumChars)) {
      options.scores += 10
    } else if (input.value.length > options.maximumChars) {
      options.scores += 25
    }

    // ** Check the letters in the password **
    if (upperCount === 0 && lowerCount !== 0) {
      options.scores += 10
      options.lowercaseCheck.haveLowercase = true
      options.lowercaseCheck.lengthLowercase = lowerCount
    }
    if (lowerCount === 0 && upperCount !== 0) {
      options.scores += 10
      options.uppercaseCheck.haveUppercase = true
      options.uppercaseCheck.lengthUppercase = upperCount
    }

    if (upperCount !== 0 && lowerCount !== 0) {
      options.scores += 20
      options.lowercaseCheck.haveLowercase = true
      options.uppercaseCheck.haveUppercase = true
      options.lowercaseCheck.lengthLowercase = lowerCount
      options.uppercaseCheck.lengthUppercase = upperCount
    }
  }

  /**
   * Check number in the password
   */
  const numberPassword = () => {
    var password = input.value

    var numberCount = countContain(password, options.number)

    if (numberCount === 1 || numberCount === 2) { options.scores += 10 }

    if (numberCount >= 3) { options.scores += 20 }

    options.numberCheck.haveNumber = numberCount !== 0
    options.numberCheck.lengthNumber = numberCount
  }

  /**
   * Check characters special in the password
   * @return {Integer}
   */
  const charactersPassword = () => {
    let password = input.value

    let scores = 0

    let characterCount = countContain(password, options.characters)

    if (characterCount === 1) { scores += 10 }

    if (characterCount > 1) { scores += 25 }

    options.scores += scores
    options.charsSpecialCheck.haveChars = scores > 0
    options.charsSpecialCheck.lengthChars = scores > 0 ? characterCount : 0
  }

  /**
   * Check text of force of password
   */
  const textForce = () => {
    if (options.scores <= 30) {
      options.text = CheckForceOptions.getVerdicts()[options.locale][0]
    }
    if (options.scores > 30 && options.scores <= 60) {
      options.text = CheckForceOptions.getVerdicts()[options.locale][1]
    }
    if (options.scores > 60 && options.scores <= 80) {
      options.text = CheckForceOptions.getVerdicts()[options.locale][2]
    }
    if (options.scores > 80) {
      options.text = CheckForceOptions.getVerdicts()[options.locale][3]
    }
  }

  const renderBootstrap = () => {
    var container = document.createElement('div')
    var progressContainer = document.createElement('div')
    progressContainer.setAttribute('class', 'progress')
    var classBg

    if (options.scores <= 30) {
      classBg = 'progress-bar progress-bar-danger'
    }
    if (options.scores > 30 && options.scores <= 60) {
      classBg = 'progress-bar progress-bar-warning'
    }
    if (options.scores > 60 && options.scores <= 80) {
      classBg = 'progress-bar progress-bar-info'
    }
    if (options.scores > 80) {
      classBg = 'progress-bar progress-bar-success'
    }

    let progressHtml = new ProgressHtml(options.width, classBg, options.text)
    let progressBar = progressHtml.getProgressBar()

    progressContainer.appendChild(progressBar)
    container.appendChild(progressContainer)
    options.content = container.innerHTML
  }

  const renderMaterialize = () => {
    var container = document.createElement('div')
    var progressContainer = document.createElement('div')
    progressContainer.setAttribute('class', 'progress')
    var classBg

    if (options.scores <= 30) {
      classBg = 'progress-bar-danger'
    }
    if (options.scores > 30 && options.scores <= 60) {
      classBg = 'progress-bar-warning'
    }
    if (options.scores > 60 && options.scores <= 80) {
      classBg = 'progress-bar-info'
    }
    if (options.scores > 80) {
      classBg = 'progress-bar-success'
    }

    let progressHtml = new ProgressHtml(options.width, classBg, options.text)
    let progressBar = progressHtml.getProgressBar()

    progressContainer.appendChild(progressBar)
    container.appendChild(progressContainer)
    options.content = container.innerHTML
  }

  return {
    checkPassword,
    checkPasswordOnlyTest,
    checkPasswordNode
  }
}

// Checks a string for a list of characters
const countContain = (strPassword, strCheck) => {
  let count = 0

  let lengthPwd = strPassword.length

  for (let i = 0; i < lengthPwd; i++) {
    if (strCheck.indexOf(strPassword.charAt(i)) > -1) {
      count++
    }
  }
  return count
}

export default CheckForce
