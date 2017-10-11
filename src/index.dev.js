export { state, setState, register } from './store'
export { showDevTools } from './devTools'

if (!global.jQuery) {
  global['$'] = {};
}
let STORE = require('./store');
Object.keys(STORE).forEach(key => key !== 'overwriteState' &&
  Object.defineProperty(global.$, key, Object.getOwnPropertyDescriptor(STORE, key)
));
Object.defineProperty(global.$, 'showDevTools', Object.getOwnPropertyDescriptor(require('./devTools'), 'showDevTools'));
Object.defineProperty(global.$, '_', Object.getOwnPropertyDescriptor(STORE, 'state'));
