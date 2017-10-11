Installation
------
### Installing
#### yarn
```bash
$ yarn add jstate
```
#### npm
```bash
$ npm i -S jstate
```
#### cdn
```bash
<script src="https://cdn.rawgit.com/rannn505/jstate/master/dist/jstate.min.js"></script>
```

### Versions
The library has two versions: production and development.
The development version contains all the tools of the production version and adds one more function that initializes the jstate development tool.
You should use the development version in the development stages of your project, and when you're finished, remember to switch to the production version.
#### production
```bash
dist/jstate.js
dist/jstate.min.js
```
#### development
```bash
dist/jstate.dev.js
dist/jstate.dev.min.js
```

### Importing
#### ES6
```js
import { state, setState, register } from 'jstate'
import { state, setState, register, showDevTools } from 'jstate/dist/jstate.dev'
```
#### ES5 (CommonJS)
```js
const jstate = require('jstate')
const jstate = require('jstate/dist/jstate.dev')
```
