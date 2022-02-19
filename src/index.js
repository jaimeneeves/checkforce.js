/**
 * checkforce.js
 *
 * @author Jaime Neves <https://github.com/dejaneves>
 * @license MIT
 */
import * as Popper from '@popperjs/core'
import zxcvbn from 'zxcvbn'
import { PwdStrengthWrapper } from './wrapper'
import { qs, $on } from './helpers'

const isRTL = () => document.documentElement.dir === 'rtl'

const AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL() ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL() ? 'right' : 'left'
}

const Default = {
  containerId: 'checkforce-tooltip',
  elementProgress: 'checkforce-progress',
  elementProgressText: 'checkforce-progress-title',
  minPasswordLength: 8,
  placement: 'top',
  template: `
  <div id="arrow" data-popper-arrow></div>
  <div class="checkforce-popover">
    <div class="checkforce-popover-body">
      <div class="checkforce-popover-title">Nível de segurança</div>
      <div class="checkforce-progress">
        <div class="checkforce-progress-title">Nenhum</div>
        <div class="checkforce-progress-level">
          <div class="checkforce-progress-bar progress-bar--danger" style="width: 29%"></div>
          <div class="checkforce-progress-bar progress-bar--warning" style="width: 29%"></div>
          <div class="checkforce-progress-bar progress-bar--success" style="width: 29%"></div>
        </div>
      </div>
    </div>
  </div>
  `,
  trigger: {
    selector: '',
    eventListener: ['keyup']
  }
}

export default class CheckForce {
  constructor(element, config) {
    if (typeof Popper === 'undefined') {
      throw new TypeError('CheckForce require Popper (https://popper.js.org)');
    }

    if (typeof zxcvbn === 'undefined') {
      throw new TypeError('CheckForce require zxcvbn (https://github.com/dropbox/zxcvbn)');
    }

    if(!element) {
      throw new Error('Missing input argument')
    }

    this.eventList = [];

    this._element = this._getElement(element);
    this._popper = null;
    this._wrapper = null;
    this._config = this._getConfig(config);

    this.resolveOptions();
  }

  static get Default() {
    return Default
  }

  resolveOptions() {
    if(!this._element || !this._element.nodeType) {
      throw new Error('Trigger must be a HTML element');
    }

    this._wrapper = PwdStrengthWrapper(this.constructor.Default);
    this.bindEvents();
  }

  bindEvents() {
    const hideEvents = ['blur'];

    $on(this._element, 'focus', ({currentTarget}) => {
      this.show(currentTarget)
    });

    hideEvents.forEach((eventType) => {
      this._element.addEventListener(eventType, (event) => {
        this.hide()
      }, false);
    });

    this._element.addEventListener('keyup', (event) => {
      this.checkPassword(event)
    }, false);
  }

  checkPassword(event) {
    if (event.keyCode === 32 || event.which === 32) {
      event.preventDefault();
      return;
    }

    const target = event.currentTarget;
    const value  = target.value;

    const container = target.parentNode.querySelector(`#${this._getContainerId()}`);
    const text = container.querySelector(`.${this._config.elementProgressText}`);
    let result = { str: {}, pwd: {} };

    if(value) {
      result.str = this._checkString(value);
      result.pwd = zxcvbn(value);
      result.pwd.highLevelSecurity = true;

      // weak password
      if( (result.pwd.score === 0 || result.pwd.score === 1) ||
        result.pwd.score === 2 && parseInt(result.pwd.guesses_log10) < 8) {
        text.innerHTML = "Fraca";
        result.pwd.highLevelSecurity = false;
      }

      // medium password
      if( (result.pwd.score === 2 &&
        parseInt(result.pwd.guesses_log10) >= 8) ||
        result.pwd.score === 3) {
        text.innerHTML = "Médio";
      }

      // strong password
      if(result.pwd.score === 4) {
        text.innerHTML = "Forte";
      }

      this._runWrapper(container, result);
    } else {
      text.innerHTML = "Nenhum";
      result.pwd.score = -1;
      this._runWrapper(container, result);
    }
  }

  hide() {
    qs(`#${this._getContainerId()}`).removeAttribute('data-show');
  }

  show(target) {
    const parentNode = target.parentNode;
    const placement = typeof this._config.placement === 'string' ?
      this._config.placement :
      this.constructor.Default['placement'];

    const attachment = this._getAttachment(placement);

    let container = parentNode.querySelector(`#${this._getContainerId()}`);

    if(!container) {
      container = document.createElement('div');
      container.innerHTML = this._config.template;
      container.setAttribute('id', this._getContainerId());
      container.setAttribute('role', 'tooltip');
      container.setAttribute('data-show', '');

      parentNode.insertBefore(container, target.nextSibling);
    } else {
      container.setAttribute('data-show', '');
    }

    if (this._popper) {
      this._popper.update()
    } else {
      this._popper = Popper.createPopper(this._element, container, this._getPopperConfig(attachment))
    }
  }

  _getContainerId() {
    return this.constructor.Default['containerId']
  }

  _getElement(element) {
    return typeof element === 'string' ? qs(element) : element;
  }

  _getAttachment(placement) {
    return AttachmentMap[placement.toUpperCase()]
  }

  _getPopperConfig(attachment) {
    const defaultPopperConfig = {
      placement: attachment,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ]
    }

    return defaultPopperConfig;
  }

  _getConfig(config) {
    config = {
      ...this.constructor.Default,
      ...(typeof config === 'object' && config ? config : {})
    }

    return config
  }

  /**
   * @param {HTMLElement} container
   * @param {Object} result
   */
   _runWrapper(container, result) {
    const progressBox = qs(`.${this.constructor.Default['elementProgress']}`, container);

    this._wrapper.setData(container, result);
    this._wrapper.progress(progressBox);
  }

  /**
   * @param {String} str
   */
   _checkString(str) {
    var lowerCaseRegex = RegExp('(?=.*[a-z])');
    var upperCaseRegex = RegExp('(?=.*[A-Z])');
    var digitRegex = RegExp('(?=.*\\d)');
    var lowerCaseFlag = lowerCaseRegex.test(str);
    var upperCaseFlag = upperCaseRegex.test(str);
    var digitFlag = digitRegex.test(str);
    var lengthFlag = str.length >= this.constructor.Default['minPasswordLength'];

    return { lowerCaseFlag, upperCaseFlag, digitFlag, lengthFlag };
  }
}