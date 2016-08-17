if (typeof CheckForce === 'undefined') {
  var CheckForce = require('CheckForce');
}

describe('CheckForce', function() {

  it('something must be done', function() {
    expect(CheckForce()).toBe('doing something');
  })

})
