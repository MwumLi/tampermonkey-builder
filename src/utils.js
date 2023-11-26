// https://www.fly63.com/article/detial/5935
export function keyboardInput(dom, data) {
  const evt = new InputEvent('input', {
    inputType: 'insertText',
    data,
    dataTransfer: null,
    isComposing: false
  });
  dom.value = data;
  dom.dispatchEvent(evt);
};


export function createCommandPalette() {
  const cmds = [];
  let menuCmdIds = [];

  function refreshCmdMenu() {
    menuCmdIds.forEach(menuCmdId => GM_unregisterMenuCommand(menuCmdId));

    menuCmdIds = cmds
      .filter(item => item.match({
        hostname: location.hostname,
        pathname: location.pathname,
        search: location.search
      }))
      .map(cmd => GM_registerMenuCommand(cmd.name, () => {
        cmd.handle();
        cmd.notification && GM_notification(cmd.name, 'BrowserAssistantTampermonkey');
      }));
  }

  if (window.onurlchange === null) {
    window.addEventListener('urlchange', (info) => refreshCmdMenu());
  }
  return {
    registerCmd: (condition) => cmds.push(condition),
    refreshCmdMenu
  }
}