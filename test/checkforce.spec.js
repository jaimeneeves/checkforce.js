if (typeof CheckForce === 'undefined') {
  var CheckForce = require('../checkforce');
}

describe('CheckForce', function() {
  var checkforce = new CheckForce({
    locale: 'pt-br',minimumChars: 8,maximumChars: 12
  });

  checkforce.runPassword('A@24!b65zT91&37!14hX');

  it('number of special characters', function() {
    expect(checkforce.options.charsSpecialCheck.lengthChars).toBe(4);
  });

  it('number of numbers', function() {
    expect(checkforce.options.numberCheck.lengthNumber).toBe(10);
  });

  it('number of uppercase letters', function() {
    expect(checkforce.options.uppercaseCheck.lengthUppercase).toBe(3);
  });

  it('number of lowercase letters', function() {
    expect(checkforce.options.lowercaseCheck.lengthLowercase).toBe(3);
  });

})
