import CheckForce from '../dist/checkforce.min.js'
var assert = require('assert')

describe('CheckForce', () => {
  before(() => {
    global.input = document.createElement('input')

    global.input.setAttribute('type', 'password')
    global.input.setAttribute('id', 'password')
    global.input.setAttribute('value', 'A@24!b65zT91&37!14hX')
    document.body.appendChild(global.input)
  })

  describe('#test', () => {

    it('number of special characters', () => {
      const res = CheckForce('#password').checkPasswordOnlyTest()
      assert.equal(res.charsSpecialCheck.lengthChars, 4)
    })

    it('number of numbers', function() {
      const res = CheckForce('#password').checkPasswordOnlyTest()
      assert.equal(res.numberCheck.lengthNumber, 10)
    })

    it('number of uppercase letters', function() {
      const res = CheckForce('#password').checkPasswordOnlyTest()
      assert.equal(res.uppercaseCheck.lengthUppercase, 3)
    })

    it('number of lowercase letters', function() {
      const res = CheckForce('#password').checkPasswordOnlyTest()
      assert.equal(res.lowercaseCheck.lengthLowercase, 3)
    })
  })
})
