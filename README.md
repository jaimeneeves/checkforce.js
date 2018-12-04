# checkforce.js
[![BCH compliance](https://bettercodehub.com/edge/badge/dejaneves/checkforce.js)](https://bettercodehub.com)
[![Build Status](https://travis-ci.org/dejaneves/checkforce.js.svg?branch=master)](https://travis-ci.org/dejaneves/checkforce.js)
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

### Using the browser

First, include the script located on the `dist` folder.

```html
<script src="dist/checkforce.min.js"></script>
```

### Basic example

```html
<body>
  <input type="text" id="password">
  <div class="viewport"></div>
</body>
```

```js
var render = document.querySelector('.viewport');
CheckForce('#password').checkPassword(function(response){
  render.innerHTML = response.content;
});
```

### Example with Bootstrap

> See [example](examples/bootstrap/bootstrap-en.html)

```html
<body>
  <input type="text" id="password">
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
  <input type="text" id="password">
  <div class="viewport"></div>
</body>
```

```js
var render = document.querySelector('.viewport');
CheckForce('#password',{MaterializeTheme:true}).checkPassword(function(response){
  render.innerHTML = response.content;
});
```

## Language Changing

For language changing you need insert `locale` attribute. The **CheckForce.js** supports only two languages.

Choices: `'en'`, `'pt-br'`  
Default: `'en'`

#### Example

```js
var render = document.querySelector('.viewport');
CheckForce('#password',{
  locale:'pt-br',
  BootstrapTheme:true
}).checkPassword(function(response){
  render.innerHTML = response.content;
});
```

> See [example](examples/bootstrap/bootstrap-pt-br.html)

## Versioning
For transparency into our release cycle and in striving to maintain backward compatibility, CheckForce.js is maintained under the Semantic Versioning guidelines. Sometimes we screw up, but we'll adhere to these rules whenever possible.

For more information on SemVer, please visit <http://semver.org/>

## License
MIT
