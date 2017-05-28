export class Store {
  constructor() {
    this.state = {};
    this.middlewares = [];
  }
  getState() {
    return Object.assign({}, this.state);
  }
  setState(data, overwrite = false) {
    if(typeof data !== 'object') {
      throw new TypeError('setState() takes an object of state variables to update');
    }
    this.state = !overwrite ? Object.assign({}, this.state, data) : Object.assign({}, data);
  }
}

const context = new Store();
export let state = context.getState();
export let setState = (partialState) => Store.prototype.setState.call(context, partialState);
export let overwriteState = (newState) => {
  Store.prototype.setState.call(context, newState, true);
  state = context.getState();
};
export let register = (...middlewares) => {
  context.middlewares = context.middlewares.concat(middlewares);
  setState = context.middlewares.reduceRight((f, g) => (next) => f(g(next)))(
    (partialState) => Store.prototype.setState.call(context, partialState)
  );
};
register(next => action => {
  next(action);
  state = context.getState();
});
