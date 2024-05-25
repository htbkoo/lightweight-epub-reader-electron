// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// A hack to fix Electron Dialog at React renderer which was not working without this hack
// Reference:
// 1. https://stackoverflow.com/a/53486446
// 2. https://stackoverflow.com/a/74870433
// 3. https://stackoverflow.com/a/69297584
// 4. https://github.com/electron/remote
(function hackToFixElectronDialogAtReact(){
  console.log(`at hackToFixElectronDialogAtReact`);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const electron = require('@electron/remote');
  if (!electron) {
    return;
  }

  const { dialog } = (electron as any);
  (window as any).electron = {};
  (window as any).electron.dialog = dialog;
})();
