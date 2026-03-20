const { app, BrowserWindow } = require("electron");
const path = require("path");
// Enable auto-reload in development
if (process.env.NODE_ENV === "development") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}
function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    title: "Offline AI Assistant",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the local backend URL (Flask serves index.html)
  win.loadURL("http://localhost:5000");

  // Open DevTools in development
  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
