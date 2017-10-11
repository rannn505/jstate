jstate.showDevTools();
const logger = next => action => {
  next(action);
  console.log($._);
}
const logYay = next => action => {
  next(action);
  console.log('yay');
}
jstate.register(logger);
jstate.register(logYay);
jstate.setState({a:1});
$.setState({a:2, b:3});
$.setState({c: {b: [1]}});
