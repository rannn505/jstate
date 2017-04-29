import { getState, setState, overwriteState, register } from './store'
import html from './devToolsTemplate.html';

let popup, queue = [];

const devTools = next => args => {
  var oldState = getState();
  let result = next(args);
  queue.push({
    id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
    action: args,
    state: getState(),
    oldState
  });
  popup.postMessage('FLUSH', '*');
  return result;
};
export function showDevTools() {
  popup = window.open(null, 'jstate-dev-tools', 'width=400,height=600,menubar=no,location=no,resizable=yes,scrollbars=no,status=no');
  popup.location.reload();
  register(devTools);
  setTimeout(() => {
    popup.opener = {
      getState,
      setState,
      overwriteState,
      register,
      queue,
    };
    popup.document.write(html);
  }, 10);
}
