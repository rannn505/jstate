let _state = {};
let _middlewares = [];

export default {
  get state() {
    // return Object.assign({}, _state);
    return JSON.parse(JSON.stringify(_state));
  },
  setState: (partialState) => {
    if(typeof partialState !== 'object') {
      throw new TypeError('setState() takes an object as parameter');
    }
    _state = {..._state, ...partialState};
  },
  overwriteState: (newState) => {
    _state = {...newState};
  },
  register: (middleware) => {
    if(typeof middleware !== 'function') {
      throw new TypeError('register() takes a function as parameter');
    }
    _middlewares.push(middleware);
    let chain = _middlewares.reduceRight((prev, cur) => next => prev(cur(next)))(partialState => _state = {..._state, ...partialState});
    module.exports.setState = chain;
    global['$'].setState = chain;
    module.exports.overwriteState = _middlewares.reduceRight((prev, cur) => {
      if(cur.name === '__DEVTOOLS__') {
        return prev;
      }
      return next => prev(cur(next));
    })(newState => _state = {...newState});
  },
};
