jstate.showDevTools();

const logger = next => args => {
  let result = next(args);
  console.log(jstate.getState());
  return result;
}
jstate.register(logger);
jstate.setState({a:1});
jstate.setState({a:2, b:3});
jstate.setState({c: {b: [1]}});
