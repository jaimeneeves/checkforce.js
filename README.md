# checkforce.js
Checkforce.js is a lib that helps to perform tasks to test strength of passwords.

## Installation

### Bower

```
bower install checkforce --save
```
### NPM

```
npm install checkforce.js --save
```
## Setup

### Using the npm

```html
var CheckForce = require('checkforce.js');

var checkforce = new CheckForce({
  locale: 'pt-br',
  minimumChars:8,
  maximumChars:12
});

checkForce.runPassword('password');
```

### Using the browser

First, include the script located on the `dist` folder.

```html
<script src="dist/checkforce.min.js"></script>
```

```html
<input type="text" id="check">
<div id="forceRender"></div>

<script>
  var input = document.querySelector('#check');
  var render = document.querySelector('#forceRender');

  var checkForce = new CheckForce({
    minimumChars: 8
  });

  input.addEventListener('keyup', function(event){
    checkForce.runPassword(event.target.value);
    render.innerHTML = "";
    render.appendChild(checkForce.contentRendered);
  });
</script>
```
