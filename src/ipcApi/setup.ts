// To add a bridge, so that the renderer process can ask the main process to open native dialogs
// Reference:
// 1. https://stackoverflow.com/a/72122754
// 2. https://stackoverflow.com/a/70058605

// Import the necessary Electron components.
import {
  BrowserWindow,
  contextBridge,
  dialog as electronDialog,
  ipcMain,
  ipcRenderer,
  OpenDialogOptions,
} from "electron";
import { DIALOG_API_KEY, IPC_CHANNELS } from "./constants";

// White-listed channels.
const ipc = {
  render: {
    // From render to main.
    send: [],
    // From main to render.
    receive: [],
    // From render to main and back again.
    sendReceive: [
      IPC_CHANNELS.DIALOG.OPEN_EPUB_FILE, // Channel name
    ] as const,
  },
};

type InvokeApis = typeof ipc['render']['sendReceive'][number];

export const api = {
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
  invoke: (channel: InvokeApis, args?: Array<any>) => {
    const validChannels = ipc.render.sendReceive;
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, args);
    }
  },
};

export const createContextBridgeForDialogOpenEpubFile = () => {
  // Exposed protected methods in the render process.
  contextBridge.exposeInMainWorld(
    // Allowed 'ipcRenderer' methods.
    DIALOG_API_KEY,
    api,
  );
};

export const configureIpcForDialogOpenEpubFile = (
  browserWindow: BrowserWindow,
) => {
  ipcMain.handle(IPC_CHANNELS.DIALOG.OPEN_EPUB_FILE, () => {
    const options: OpenDialogOptions = {
      // properties: ['openFile', 'multiSelections']

      properties: ["openFile"],
      filters: [{ name: "epub", extensions: ["epub"] }],
    };

    return electronDialog
      .showOpenDialog(browserWindow, options)
      .then((result) => {
        // Bail early if user cancelled dialog
        if (result.canceled) {
          return;
        }

        return result.filePaths;
      });
  });
};
