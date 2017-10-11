API
------
As I mentioned earlier, jState emphasizes ease of use for the developer, and so it has a very short and focused api.

### state
Returns a snapshot of the current state.
```js
jstate.state
$.state
// The optimal shorthand
$._
```

### setState
Gets an object and begins the chain of actions to change the current state. <br/>
**Note:** `setState()` uses [object spread operator](https://github.com/tc39/proposal-object-rest-spread) within it, that means it basically does a merging between the previous state and the new state (similar to what [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) does).
```js
jstate.setState({a:1});
$.setState({a:2, b:3});
```

### register
Gets a function and registers it as a middleware.
Middleware functions are functions that have access to the `action` (the object passed to `setState()`) and the next middleware function in the chain.
The `register()` method creates a chain of functions that will run in the order that the programmer registered them, and before each call to `setState()` method.
```js
// logs the current state to console, after setState() finish to update it.
const logger = next => action => {
  next(action);
  console.log($._);
}
jstate.register(logger);
// logs the word 'yay' to console, after setState() finish to update it.
const logYay = next => action => {
  next(action);
  console.log('yay');
}
$.register(logYay);
```

### showDevTools
Launches the jstate's development tools. <br/>
**Note:** `showDevTools()` will only be available when you use the development version.
```js
jstate.showDevTools();
$.showDevTools();
```
![DevTools](https://raw.githubusercontent.com/rannn505/jstate/master/assets/devTools.gif =700x "DevTools")
