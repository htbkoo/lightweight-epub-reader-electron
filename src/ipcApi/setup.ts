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
import {
  Book,
  createSimplifiedToTraditionalConverter,
  readEpub,
} from "epub-chinese-converter";

// Exporting `api` object, so that it would go well with TypeScript
// Reference: https://stackoverflow.com/a/71078436/10734272
export const api = {
  openEpubFile: () => {
    return ipcRenderer.invoke(IPC_CHANNELS.OPEN_EPUB_FILE);
  },
  readEpubFile: (bookUrl: string) => {
    return ipcRenderer.invoke(IPC_CHANNELS.READ_EPUB_FILE, bookUrl);
  },
  translateBookS2T: (book: Book.BookWithMeta) => {
    return ipcRenderer.invoke(IPC_CHANNELS.TRANSLATE_BOOK__S2T, book);
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
  ipcMain.handle(IPC_CHANNELS.OPEN_EPUB_FILE, () => {
    const options: OpenDialogOptions = {
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
  ipcMain.handle(IPC_CHANNELS.READ_EPUB_FILE, (_, bookUrl: string) => {
    return readEpub(bookUrl);
  });
  ipcMain.handle(
    IPC_CHANNELS.TRANSLATE_BOOK__S2T,
    (_, book: Book.BookWithMeta) => {
      return createSimplifiedToTraditionalConverter().convertBook(book);
    },
  );
};
