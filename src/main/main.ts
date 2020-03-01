import { app, BrowserWindow } from "electron";
import * as path from "path";
import isDev from "electron-is-dev";
import * as url from "url";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      webSecurity: false,
    },
    width: 800,
  });

  if (process.env.NODE_ENV !== 'production' && isDev) {
    // Open the DevTools.
    console.log('Running in development');

    mainWindow.webContents.openDevTools();

    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
    mainWindow.loadURL(`http://localhost:2003`);
    // win.loadURL(`http://localhost:2003`, {postData: [book]});
  } else {
    console.log('Running in production');

    const indexHtmlFilePath = path.join(__dirname, "../index.html");
    console.log(`loading index.html from ${indexHtmlFilePath}`);
    mainWindow.loadFile(indexHtmlFilePath);

    // mainWindow.loadFile(path.join(__dirname, "../../public/index.html"));
    // mainWindow.loadURL(
    //     url.format({
    //       pathname: path.join(__dirname, "../index.html"),
    //       protocol: 'file:',
    //       slashes: true
    //     })
    // );
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
