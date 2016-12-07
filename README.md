# checkforce.js
> A library that helps to perform tasks to test strength of passwords.

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

```js
var CheckForce = require('checkforce.js');
var response = CheckForce(null,{
    minimumChars:8,
    maximumChars:12
}).checkPasswordNode('password');
```

### Using the browser

First, include the script located on the `dist` folder.

```html
<script src="dist/checkforce.min.js"></script>
```

### Basic example

```html
<body>
  <input type="text" id="check">
  <div class="viewport"></div>
</body>
```

```js
var render = document.querySelector('.viewport');
CheckForce('#check').checkPassword(function(response){
  render.innerHTML = response.content;
});
```

### Example with Bootstrap

> See [example](examples/bootstrap/example-with-bootstrap.html)

```html
<body>
  <input type="text" id="check">
  <div class="viewport"></div>
</body>
```

```js
var render = document.querySelector('.viewport');
CheckForce('#password',{BootstrapTheme:true}).checkPassword(function(response){
  render.innerHTML = response.content;
});
```

### Example with Materialize

> See [example](examples/materialize/example-with-materialize.html)

```html
<body>
  <input type="text" id="check">
  <div class="viewport"></div>
</body>
```

```js
var render = document.querySelector('.viewport');
CheckForce('#password',{MaterializeTheme:true}).checkPassword(function(response){
  render.innerHTML = response.content;
});
```

## Versioning
For transparency into our release cycle and in striving to maintain backward compatibility, CheckForce.js is maintained under the Semantic Versioning guidelines. Sometimes we screw up, but we'll adhere to these rules whenever possible.

For more information on SemVer, please visit <http://semver.org/>

## License
MIT
