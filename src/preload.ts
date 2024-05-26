// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { createContextBridgeForDialogOpenEpubFile } from "./ipcApi";

console.log(`START -- preload.js`);

(() => {
  createContextBridgeForDialogOpenEpubFile();
})();

console.log(`END -- preload.js`);
