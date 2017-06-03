export { state, setState, register } from './store'
export { showDevTools } from './devTools'

if (!global.jQuery) {
  global['$'] = {};
}
let STORE = require('./store');
let DEV = require('./devTools');
Object.keys(STORE).forEach(key => (key !== 'overwriteState') && Object.defineProperty(global.$, key, Object.getOwnPropertyDescriptor(STORE, key)));
Object.keys(DEV).forEach(key => Object.defineProperty(global.$, key, Object.getOwnPropertyDescriptor(DEV, key)));
