var CheckForce = require('./checkforce');

var checkforce = new CheckForce({
  locale: 'pt-br',minimumChars: 8,maximumChars: 12
});

console.log(checkforce);
