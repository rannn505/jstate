let _state = {};
let _middlewares = [];

export default {
  get state() {
    return Object.assign({}, _state);
  },
  setState: (partialState) => {
    if(typeof partialState !== 'object') {
      throw new TypeError('setState() takes an object of state variables to update');
    }
    _state = Object.assign({}, _state, partialState);
  },
  overwriteState: (newState) => {
    _state = Object.assign({}, newState);
  },
  register: (...middlewares) => {
    _middlewares = _middlewares.concat(middlewares);
    console.log(_middlewares);
    let chain = _middlewares.reduceRight((f, g) => next => f(g(next)))(partialState => _state = Object.assign({}, _state, partialState));
    module.exports.setState = chain;
    global['$'].setState = chain;
    module.exports.overwriteState = _middlewares.reduceRight((f, g) => {
      if(g.name === '__DEVTOOLS__') {
        return f;
      }
      return next => f(g(next));
    })(newState => _state = Object.assign({}, newState));
  },
};
