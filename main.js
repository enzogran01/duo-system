const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const path = require('path');

// Handle squirrel events for Windows installer
if (require('electron-squirrel-startup')) app.quit();

let mainWindow;
let serverStarted = false;

const PORT = 3000;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    title: 'Duo System - Duo Estética',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    backgroundColor: '#0f0f0f',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Show window when ready (avoids white flash)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open external links in default browser instead of Electron
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http') && !url.includes('localhost')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Build custom menu
  const menuTemplate = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Recarregar',
          accelerator: 'CmdOrCtrl+R',
          click: () => mainWindow.reload(),
        },
        { type: 'separator' },
        {
          label: 'Sair',
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit(),
        },
      ],
    },
    {
      label: 'Editar',
      submenu: [
        { label: 'Desfazer', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: 'Refazer', accelerator: 'CmdOrCtrl+Shift+Z', role: 'redo' },
        { type: 'separator' },
        { label: 'Recortar', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'Copiar', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'Colar', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: 'Selecionar Tudo', accelerator: 'CmdOrCtrl+A', role: 'selectAll' },
      ],
    },
    {
      label: 'Visualizar',
      submenu: [
        {
          label: 'Zoom +',
          accelerator: 'CmdOrCtrl+=',
          click: () => {
            const currentZoom = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(currentZoom + 0.1);
          },
        },
        {
          label: 'Zoom -',
          accelerator: 'CmdOrCtrl+-',
          click: () => {
            const currentZoom = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(Math.max(0.5, currentZoom - 0.1));
          },
        },
        {
          label: 'Zoom Padrão',
          accelerator: 'CmdOrCtrl+0',
          click: () => mainWindow.webContents.setZoomFactor(1),
        },
        { type: 'separator' },
        {
          label: 'Tela Cheia',
          accelerator: 'F11',
          click: () => mainWindow.setFullScreen(!mainWindow.isFullScreen()),
        },
      ],
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Sobre o Duo System',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Sobre',
              message: 'Duo System',
              detail: 'Sistema de gestão exclusivo para Duo Estética.\nVersão 1.0.0\n\nDesenvolvido por Enzo Gran.',
            });
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Start the Express server and load the app
  startServer();
}

function startServer() {
  try {
    // Load environment variables
    const dotenv = require('dotenv');
    const envPath = path.join(__dirname, 'backend', 'src', '.env');
    const envResult = dotenv.config({ path: envPath });
    
    if (!process.env.CONNECTIONSTRING) {
      console.log('Dotenv failed to set CONNECTIONSTRING, trying manual parse...');
      const fs = require('fs');
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/CONNECTIONSTRING=(.+)/);
        if (match && match[1]) {
          process.env.CONNECTIONSTRING = match[1].trim();
          console.log('Manually set CONNECTIONSTRING');
        }
      }
    }

    const expressApp = require('./backend/src/app');

    expressApp.on('pronto', () => {
      serverStarted = true;
      expressApp.listen(PORT, '127.0.0.1', () => {
        console.log(`[Duo System] Servidor interno rodando em http://localhost:${PORT}`);
        if (mainWindow) {
          mainWindow.loadURL(`http://localhost:${PORT}`);
        }
      });
    });

    // If MongoDB fails to connect, show error after timeout
    setTimeout(() => {
      if (!serverStarted && mainWindow) {
        mainWindow.loadURL(`data:text/html;charset=utf-8,
          <html>
            <body style="background:#0f0f0f;color:#fff;font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;flex-direction:column">
              <h1 style="color:#e74c3c">❌ Erro de Conexão</h1>
              <p style="color:#aaa;max-width:500px;text-align:center">
                Não foi possível conectar ao banco de dados MongoDB Atlas.<br><br>
                Verifique sua conexão com a internet e tente novamente.
              </p>
              <button onclick="window.location.reload()" style="margin-top:20px;padding:12px 32px;background:#6c5ce7;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:16px">
                Tentar Novamente
              </button>
            </body>
          </html>
        `);
      }
    }, 15000);

  } catch (error) {
    console.error('[Duo System] Erro ao iniciar servidor:', error);
    if (mainWindow) {
      dialog.showErrorBox(
        'Erro ao iniciar',
        `Não foi possível iniciar o Duo System.\n\n${error.message}`
      );
    }
  }
}

// App lifecycle
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
