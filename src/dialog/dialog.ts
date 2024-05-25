// To add a bridge, so that the renderer process can ask the main process to open native dialogs
// reference: https://stackoverflow.com/a/70058605

import { contextBridge, dialog, ipcMain, ipcRenderer } from "electron";
import { DIALOG_API_KEY } from "./constants";

const IPC_CHANNEL_DIALOG = "dialog--open-epub-file";

export const createContextBridgeForDialogOpenEpubFile = () => {
  contextBridge.exposeInMainWorld(DIALOG_API_KEY, {
    openDialog() {
      ipcRenderer.send(IPC_CHANNEL_DIALOG);
    },
  });
};

export const configureIpcForDialogOpenEpubFile = () => {
  ipcMain.on(IPC_CHANNEL_DIALOG, () => {
    dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "epub", extensions: ["epub"] }],
    });
  });
};
