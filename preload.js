const { contextBridge, ipcRenderer } = require('electron');

// Expose safe APIs to the renderer process
contextBridge.exposeInMainWorld('duoDesktop', {
  // Platform info
  platform: process.platform,
  version: '1.0.0',

  // Check if running inside Electron
  isDesktop: true,
});
