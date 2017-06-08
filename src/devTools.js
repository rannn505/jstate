import { state, setState, overwriteState, register } from './store'
import html from './devToolsTemplate.html';

export function showDevTools() {
  let popup = window.open(null, 'jstate-dev-tools', 'width=400,height=600,menubar=no,location=no,resizable=yes,scrollbars=no,status=no');
  popup.location.reload();
  let queue = [], isReady = false;
  const __FLUSH__ = () => {
    if(queue.length === 0) return;
    popup.postMessage(queue.shift(), '*');
    return __FLUSH__();
  }
  setTimeout(() => {
    popup.opener = {
      notifyReady: () => { isReady = true; __FLUSH__(); },
      setState,
      overwriteState,
      register,
    };
    popup.document.write(html);
  }, 0);
  const __DEVTOOLS__ = next => action => {
    let oldState = state;
    next(action);
    queue.push({
      action,
      state,
      oldState
    });
    isReady && __FLUSH__();
  };
  register(__DEVTOOLS__);
}
