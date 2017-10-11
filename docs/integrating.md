Integrating
------
This section provides examples of simple integration of jState with other familiar Front-End libraries.
All examples refer to a simple todo application. <br/>
**Note:** What is important to understand is that in all of the examples there is one important middleware function that updates the view after a change in the current state.



### jQuery
[jQuery Example](https://jsfiddle.net/rannn505/9w309dcn/)
```js
$.setState({todos: []});
$.register(function (next) {
  return function (action) {
    next(action);
    // a function that re render your view.
    render();
  }
});
```

### Angular1
[Angular1 Example](https://jsfiddle.net/rannn505/3ytpo4w9/)
```js
angular
  .module('myModule', [])
  .run(init)

init.$inject = ['$rootScope', '$timeout'];
function init($rootScope, $timeout) {
  $.setState({todos: []});
  $rootScope.todos = $._.todos;
  $.register(function (next) {
  	return function (action) {
			next(action);
      $timeout(function(){
      	$rootScope.todos = $._.todos;
      });
    }
  });
}
```

### React
[React Example](https://jsfiddle.net/rannn505/4n16zxpp/)
```js
class TodoApp extends React.Component {
	constructor(props) {
  	super(props);
    $.setState({todos: []});
  	$.register(next => action => {
    	next(action);
    	this.forceUpdate();
  	});
  }
  render() {
    return (  );
  }
}
```
