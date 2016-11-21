

const CheckForce = require('../dist/checkforce.min.js');

describe('CheckForce', function() {

  var response = CheckForce().checkPasswordNode('A@24!b65zT91&37!14hX');

  it('number of special characters', function() {
    expect(response.charsSpecialCheck.lengthChars).toBe(4);
  });

  it('number of numbers', function() {
    expect(response.numberCheck.lengthNumber).toBe(10);
  });

  it('number of uppercase letters', function() {
    expect(response.uppercaseCheck.lengthUppercase).toBe(3);
  });

  it('number of lowercase letters', function() {
    expect(response.lowercaseCheck.lengthLowercase).toBe(3);
  });

})
