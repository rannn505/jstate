export class Store {
  constructor() {
    this.state = {};
    this.middlewares = [];
  }
  getState() {
    return Object.assign({}, this.state);
  }
  setState(partialState) {
    if(typeof partialState !== 'object') {
      throw new TypeError('setState() takes an object of state variables to update');
    }
    this.state = Object.assign({}, this.state, partialState);
  }
}

const context = new Store();
export let getState = (...args) => Store.prototype.getState.apply(context, args);
export let setState = (...args) => Store.prototype.setState.apply(context, args);
export let overwriteState = (newState) => context.state = Object.assign({}, newState);
export let register = (...middlewares) => {
  context.middlewares = context.middlewares.concat(middlewares);
  setState = context.middlewares.reduce((f, g) => (...args) => f(g(...args)))((...args) => Store.prototype.setState.apply(context, args));
};
