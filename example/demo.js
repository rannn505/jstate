jstate.showDevTools();

const logger = next => action => {
  let result = next(action);
  console.log(jstate.state);
}
jstate.register(logger);
jstate.setState({a:1});
jstate.setState({a:2, b:3});
jstate.setState({c: {b: [1]}});
