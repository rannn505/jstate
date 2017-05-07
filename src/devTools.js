import { state, setState, overwriteState, register } from './store'
import html from './devToolsTemplate.html';

export function showDevTools() {
  let popup = window.open(null, 'jstate-dev-tools', 'width=400,height=600,menubar=no,location=no,resizable=yes,scrollbars=no,status=no');
  popup.location.reload();
  let queue = [];
  register(next => action => {
    let oldState = state;
    let result = next(action);
    queue.push({
      id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
      action,
      state,
      oldState
    });
    popup.postMessage('FLUSH', '*');
  });
  setTimeout(() => {
    popup.opener = {
      setState,
      overwriteState,
      register,
      queue,
    };
    popup.document.write(html);
  }, 10);
}
