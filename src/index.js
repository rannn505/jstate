export { state, setState, register } from './store'
export { showDevTools } from './devTools'

setTimeout(()=>{
  let self;
  if(new Function("try {return this===window;}catch(e){ return false;}")) {
    self = window;
  } else if(new Function("try {return this===global;}catch(e){return false;}")) {
    self = global;
  }

  if (!self.jQuery) {
    self['$'] = {};
  }
  Object.keys(self.jstate).forEach(key => Object.defineProperty(self['$'], key, Object.getOwnPropertyDescriptor(self.jstate, key)));
}, 10);
