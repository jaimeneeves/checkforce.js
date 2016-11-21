/**
 * checkforce.js
 *
 * @version 1.0.1
 * @author Jaime Neves <https://github.com/dejaneves>
 * @license MIT
 */

/**
 * @param {String|HTMLElement} input
 * @param {Object} options
 */
const CheckForce = (input, options) => {

  const defaults = {
    scores: 0,
    width: 0,
    text: '',
    content: '',
    passIndex: 2,
    BootstrapTheme: false,
    minimumChars: 8,
    maximumChars: 12,
    elementRender: null,
    locale: 'en',
    verdicts: {
      "en": ["Weak", "Normal", "Medium", "Strong"],
      "pt-br": ["Fraca", "Normal", "Média", "Forte"]
    },
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    characters: "!@#$%^&*?_~",
    colors: ['#500', '#800', '#f60', '#050', '#5cb85c'],
    charsSpecialCheck: {
      haveChars: false,
      lengthChars: 0
    },
    numberCheck: {
      haveNumber: false,
      lengthNumber: 0
    },
    uppercaseCheck: {
      haveUppercase: false,
      lengthUppercase: 0
    },
    lowercaseCheck: {
      haveLowercase: false,
      lengthLowercase: 0
    },
    trigger: {
      selector: input || '.field-checkforce',
      eventListener: 'keyup'
    }
  };

  if (typeof input === 'string') {
    input = document.querySelector(input);
  }

  // Create options by extending defaults with the passed in arugments
  if (typeof options === 'object')
    options = extendDefaults(defaults, options);
  else
    options = defaults;

  const checkPassword = (callback) => {
    let trigger = document.querySelector(options.trigger.selector);

    if (!trigger) {
      throw new Error('Element ' + options.trigger.selector + ' must exist to init the trigger')
    }

    trigger.addEventListener(options.trigger.eventListener, () => {
      options.scores = 0;

      // Check Length
      lengthPassword();
      // Check Letters
      lettersPassword();
      // Check Numbers
      numberPassword();
      // Check Characters
      charactersPassword();
      // Text of password
      textForce();

      options.width = options.scores * 1.25 > 100 ? 100 : options.scores * 1.25;

      if(options.scores > 0){
        if (options.BootstrapTheme)
          renderBootstrap();
        else
          options.content = options.text;
      } else {
          options.content = "";
          options.text = "";
      }

      let response = {
        scores: options.scores,
        width: options.width,
        text: options.text,
        content: options.content,
        charsSpecialCheck: options.charsSpecialCheck,
        numberCheck: options.numberCheck,
        uppercaseCheck: options.uppercaseCheck,
        lowercaseCheck: options.lowercaseCheck
      };

      callback(response);
    });
  };

  /**
   * Run on node environment
   * @param  {String} password
   * @return {Object}
   */
  const checkPasswordNode = (password) => {
    options.scores = 0;
    input = {
      value: password
    };
    // Check Length
    lengthPassword();
    // Check Letters
    lettersPassword();
    // Check Numbers
    numberPassword();
    // Check Characters
    charactersPassword();
    // Text of password
    textForce();

    var response = {
      scores: options.scores,
      charsSpecialCheck: options.charsSpecialCheck,
      numberCheck: options.numberCheck,
      uppercaseCheck: options.uppercaseCheck,
      lowercaseCheck: options.lowercaseCheck
    };

    return response;
  };

  /**
   * check length of the password
   */
  const lengthPassword = () => {
    var pwdlength = input.value.length;

    if (pwdlength > options.passIndex && pwdlength < options.minimumChars) {
      options.scores += 5;
    } else if ((pwdlength >= options.minimumChars) && (pwdlength <= options
        .maximumChars)) {
      options.scores += 10;
    } else if (pwdlength > options.maximumChars) {
      options.scores += 25;
    }
  }

  /**
   * Check the letters in the password
   * @return {Integer}
   */
  const lettersPassword = () => {
    var password = input.value,
      upperCount = countContain(password, options.uppercase),
      lowerCount = countContain(password, options.lowercase),
      haveLowercase = false,
      haveUppercase = false,
      lengthLowercase = 0,
      lengthUppercase = 0;

    if (upperCount === 0 && lowerCount !== 0) {
      options.scores += 10;
      haveLowercase = true;
      lengthLowercase = lowerCount;
    }
    if (lowerCount === 0 && upperCount !== 0) {
      options.scores += 10;
      haveUppercase = true;
      lengthUppercase = upperCount;
    }

    if (upperCount !== 0 && lowerCount !== 0) {
      options.scores += 20;
      haveLowercase = true;
      haveUppercase = true;
      lengthLowercase = lowerCount;
      lengthUppercase = upperCount;
    }

    options.lowercaseCheck.haveLowercase = haveLowercase;
    options.lowercaseCheck.lengthLowercase = lengthLowercase;
    options.uppercaseCheck.haveUppercase = haveUppercase;
    options.uppercaseCheck.lengthUppercase = lengthUppercase;
  }

  /**
   * Check number in the password
   */
  const numberPassword = () => {
    var password = input.value,
      numberCount = countContain(password, options.number);

    if (numberCount === 1 || numberCount === 2)
      options.scores += 10;

    if (numberCount >= 3)
      options.scores += 20;

    options.numberCheck.haveNumber = numberCount !== 0 ? true : false;
    options.numberCheck.lengthNumber = numberCount;
  }

  /**
   * Check characters special in the password
   * @return {Integer}
   */
  const charactersPassword = () => {
    let password = input.value,
      scores = 0,
      characterCount = countContain(password, options.characters);

    if (characterCount === 1)
      scores += 10;

    if (characterCount > 1)
      scores += 25;

    options.scores += scores;
    options.charsSpecialCheck.haveChars = scores > 0 ? true : false;
    options.charsSpecialCheck.lengthChars = scores > 0 ? characterCount : 0;
  }

  /**
   * Check text of force of password
   */
  const textForce = () => {
    if (options.scores <= 30) {
      options.text = options.verdicts[options.locale][0];
    }
    if (options.scores > 30 && options.scores <= 60) {
      options.text = options.verdicts[options.locale][1];
    }
    if (options.scores > 60 && options.scores <= 80) {
      options.text = options.verdicts[options.locale][2];
    }
    if (options.scores > 80) {
      options.text = options.verdicts[options.locale][3];
    }
  }

  const renderBootstrap = () => {
    var container = document.createElement('div');
    var progressContainer = document.createElement('div');
    progressContainer.setAttribute('class', 'progress');
    var classBackground;

    if (options.scores <= 30) {
      classBackground = "progress-bar progress-bar-danger";
    }
    if (options.scores > 30 && options.scores <= 60) {
      classBackground = "progress-bar progress-bar-warning";
    }
    if (options.scores > 60 && options.scores <= 80) {
      classBackground = "progress-bar progress-bar-info";
    }
    if (options.scores > 80) {
      classBackground = "progress-bar progress-bar-success";
    }
    var progressBar = document.createElement('div');
    progressBar.setAttribute('class', classBackground);
    progressBar.setAttribute('style', 'width:' + options.width + '%');
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuemax', 100);
    progressBar.innerHTML = options.text;
    progressContainer.appendChild(progressBar);
    container.appendChild(progressContainer);
    options.content = container.innerHTML;
  }

  return {
    checkPassword,
    checkPasswordNode
  }

};

// Checks a string for a list of characters
const countContain = (strPassword, strCheck) => {
  let count = 0,
    lengthPwd = strPassword.length;

  for (let i = 0; i < lengthPwd; i++) {
    if (strCheck.indexOf(strPassword.charAt(i)) > -1) {
      count++;
    }
  }
  return count;
}

// Utility method to extend defaults with user options
const extendDefaults = (source, properties) => {
  let property;
  for (property in properties) {
    if (properties.hasOwnProperty(property)) {
      source[property] = properties[property];
    }
  }
  return source;
}

export default CheckForce;
