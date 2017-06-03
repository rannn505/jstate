import { state, setState, overwriteState, register } from './store'
import html from './devToolsTemplate.html';

export function showDevTools() {
  let popup = window.open(null, 'jstate-dev-tools', 'width=400,height=600,menubar=no,location=no,resizable=yes,scrollbars=no,status=no');
  popup.location.reload();
  let queue = [], id = 0;
  const __DEVTOOLS__ = next => action => {
    let oldState = state;
    let result = next(action);
    queue.push({
      id: ++id,
      action,
      state,
      oldState
    });
    popup.postMessage('FLUSH', '*');
  };
  register(__DEVTOOLS__);
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
