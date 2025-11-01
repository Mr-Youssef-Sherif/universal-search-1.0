const { app, BrowserWindow, globalShortcut, ipcMain, shell } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 150,
        minHeight: 150,
        maxHeight: 500,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        roundedCorners: true,
        show: false,
        backgroundColor: '#00000000',
        resizable: true, // allow dynamic resizing
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile('index.html');
    win.setAlwaysOnTop(true, 'screen-saver');
}

app.whenReady().then(() => {
    createWindow();

    // Register Ctrl+Q to toggle
    globalShortcut.register('Control+Q', () => {
        if (win.isVisible()) {
            win.hide();
        } else {
            win.center();
            win.show();
            win.focus();
        }
    });

    // Hide window
    ipcMain.on('hide-window', () => win.hide());

    // Open a URL externally
    ipcMain.on('open-url', (event, url) => {
        shell.openExternal(url);
        win.hide();
    });

    // Adjust the window height dynamically
    ipcMain.on('adjust-window-height', (event, height) => {
        if (!win) return;
        const boundedHeight = Math.min(Math.max(150, height), 500); // keep between 150–500
        const [currentWidth] = win.getSize();
        win.setSize(currentWidth, boundedHeight);
    });
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});
