jstate.showDevTools();
const logger = next => action => {
  next(action);
  console.log($._);
}
jstate.register(logger);
jstate.setState({a:1});
$.setState({a:2, b:3});
$.setState({c: {b: [1]}});
