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
export let setState = (partialState) => Store.prototype.setState.call(context, partialState);
export let overwriteState = (newState) => context.state = Object.assign({}, newState);
export let register = (...middlewares) => {
  context.middlewares = context.middlewares.concat(middlewares);
  setState = context.middlewares.reduceRight((f, g) => (next) => f(g(next)))(
    (partialState) => Store.prototype.setState.call(context, partialState)
  );
};

export let state = context.getState();
register(next => action => {
  let result = next(action);
  state = context.getState();
});
