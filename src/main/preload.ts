// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, (process.versions as any)[type]);
  }
});

// A hack to fix Electron Dialog at React renderer which was not working without this hack
// Reference: https://stackoverflow.com/a/53486446
(function hackToFixElectronDialogAtReact(){
  console.log(`at hackToFixElectronDialogAtReact`);

  const { dialog } = require('electron').remote;
  (window as any).electron = {};
  (window as any).electron.dialog = dialog;
})();