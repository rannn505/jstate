let _state = {};
let _middlewares = [];

export let getState = () => {
  return Object.assign({}, _state);
}
export let setState = (partialState) => {
  if(typeof partialState !== 'object') {
    throw new TypeError('setState() takes an object of state variables to update');
  }
  _state = Object.assign({}, _state, partialState);
};
export let overwriteState = (newState) => {
  _state = Object.assign({}, newState);
  state = getState();
};
export let register = (...middlewares) => {
  _middlewares = _middlewares.concat(middlewares);
  setState = _middlewares.reduceRight((f, g) => (next) => f(g(next)))((partialState) => _state = Object.assign({}, _state, partialState));
};
export let state = getState();
register(next => action => {
  next(action);
  state = getState();
});
