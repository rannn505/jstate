<img height="64" width="64" src="https://raw.githubusercontent.com/rannn505/jstate/master/assets/jstate.png"> jState
===

<a href="https://travis-ci.org/rannn505/jstate"><img src="https://img.shields.io/travis/rannn505/jstate.svg?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/jstate"><img src="https://img.shields.io/npm/v/jstate.svg?style=flat-square" alt="NPM Version"></a>
<a href="https://npm-stat.com/charts.html?package=jstate"><img src="https://img.shields.io/npm/dt/jstate.svg?style=flat-square" alt="NPM Downloads"></a>
<a href="https://coveralls.io/github/rannn505/jstate"><img src="https://img.shields.io/coveralls/rannn505/jstate.svg?style=flat-square" alt="Coveralls"></a>
<a href="http://packagequality.com/#?package=jstate"><img src="http://npm.packagequality.com/shield/jstate.svg?style=flat-square" alt="Package Quality"></a>
<a href="https://github.com/rannn505/jstate/issues?q=is%3Aissue+is%3Aclosed"><img src="https://img.shields.io/github/issues-closed-raw/rannn505/jstate.svg?style=flat-square" alt="Closed Issues"></a>
<a href="https://david-dm.org/rannn505/jstate"><img src="https://img.shields.io/david/rannn505/jstate.svg?style=flat-square" alt="Dependencies"></a>
<a href="https://github.com/rannn505/jstate/blob/master/LICENSE"><img src="https://img.shields.io/github/license/rannn505/jstate.svg?style=flat-square" alt="License"></a>
<a href="https://github.com/rannn505/jstate/stargazers"><img src="https://img.shields.io/github/stars/rannn505/jstate.svg?style=social&label=Star" alt=" GitHub Stars"></a>

>  jState is a very friendly Flux implementation. Nowadays there are many libraries that do this implementation and do it with a great success, each characterized by certain characteristics, emphasis certain parameters and has a strong link to other libraries. jState primarily emphasizes complexity, this means that it has a very short and focused API, it is super easy to integrate with all the newest FE libraries and it takes almost no time to get started with.

## Installation
```bash
$ npm i -S jstate
$ yarn add jstate
```

## Quick start
```javascript
<script src="./node_modules/jstate/dist/jstate.min.js"></script>
<script src="https://cdn.rawgit.com/rannn505/jstate/master/dist/jstate.min.js"></script>
// open console (F12)
const logger = next => action => {
  next(action);
  // $._ is shorthand to jstate.state
  console.log($._);
}
$.register(logger);
// all of jState API is accessible via $ or jstate prefixes
jstate.setState({a:1});
$.setState({a:2, b:3});
```


## API Reference
**:memo: [API reference](http://cdn.rawgit.com/rannn505/node-powershell/236b6c3a/docs/docs.html)**<br/>
I've created a convenient and readable page, so you can enjoy the experience of learning and begin to use the library quickly and easily.


## Examples
- [jQuery](https://jsfiddle.net/rannn505/9w309dcn/)
- [Angular1](https://jsfiddle.net/rannn505/3ytpo4w9/)
- [React](https://jsfiddle.net/rannn505/4n16zxpp/)


## License

  [MIT](LICENSE) © [Ran Cohen](https://github.com/rannn505)
