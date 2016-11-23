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

## Versioning System
<http://semver.org>

## License
MIT
