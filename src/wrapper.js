export function PwdStrengthWrapper(options) {

  const defaults = {
    res: {},
    container: '',
    progressStatus: ['success', 'warning', 'danger']
  };

  if (typeof options === 'object') {
    options = Object.assign({}, defaults, options);
  } else {
    options = defaults;
  }

  const setData = (container, res) => {
    options.container = container;
    options.res = res;
  };

  /**
   * @param {HTMLElement} box 
   */
  const progress = box => {

    if(!box) throw 'No HTML container'

    if(options.res.pwd.score === 0 || options.res.pwd.score == 1 ||
      (options.res.pwd.score === 2 && !options.res.pwd.highLevelSecurity)) {
      progressClasses('danger', box);
    }

    if((options.res.pwd.score === 2 && options.res.pwd.highLevelSecurity) ||
      options.res.pwd.score === 3) {
      progressClasses('warning', box);
    }

    if(options.res.pwd.score === 4) {
      progressClasses('success', box);
    }

    if(options.res.pwd.score === -1) {
      progressClasses(null, box);
    }
  };

  const progressClasses = (classType, box) => {
    const classes = options.progressStatus;

    box.classList.remove(...classes);

    if(classType) {
      box.classList.add(`${classType}`);
    }
  };

  return { progress, setData };
}
