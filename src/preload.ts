// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


// Import the necessary Electron components.
import { contextBridge, ipcRenderer } from "electron";

// White-listed channels.
const ipc = {
  'render': {
    // From render to main.
    'send': [],
    // From main to render.
    'receive': [],
    // From render to main and back again.
    'sendReceive': [
      'dialog:openMultiFileSelect' // Channel name
    ]
  }
};

// Exposed protected methods in the render process.
contextBridge.exposeInMainWorld(
  // Allowed 'ipcRenderer' methods.
  'ipcRender', {
    // From render to main.
    send: (channel, args) => {
      const validChannels = ipc.render.send;
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, args);
      }
    },
    // From main to render.
    receive: (channel, listener) => {
      const validChannels = ipc.render.receive;
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`.
        ipcRenderer.on(channel, (event, ...args) => listener(...args));
      }
    },
    // From render to main and back again.
    invoke: (channel, args) => {
      const validChannels = ipc.render.sendReceive;
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, args);
      }
    }
  }
);

console.log(`DEBUGDEBUG finish preload`);

// import { createContextBridgeForDialogOpenEpubFile } from "./dialog";
//
// (() => {
//   createContextBridgeForDialogOpenEpubFile();
// })();

// A hack to fix Electron Dialog at React renderer which was not working without this hack
// Reference:
// 1. https://stackoverflow.com/a/53486446
// 2. https://stackoverflow.com/a/74870433
// 3. https://stackoverflow.com/a/69297584
// 4. https://github.com/electron/remote
// (function hackToFixElectronDialogAtReact(){
//   console.log(`at hackToFixElectronDialogAtReact`);
//
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const electron = require('@electron/remote');
//   if (!electron) {
//     return;
//   }
//
//   const { dialog } = (electron as any);
//   (window as any).electron = {};
//   (window as any).electron.dialog = dialog;
// })();
