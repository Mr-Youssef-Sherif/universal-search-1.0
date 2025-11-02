const { app, BrowserWindow, globalShortcut, ipcMain, shell } = require('electron');
const path = require('path');

const engines = require('./engines.json'); // main process reads JSON

let win;
let menuWin;
let menuHeight = 150;
let menuWidth = 160;

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
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, // keep true
        },
    });

    win.loadFile('index.html');
    win.setAlwaysOnTop(true, 'screen-saver');
}

function createMenuWindow() {
    menuWin = new BrowserWindow({
        width: 160,
        height: 150,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        roundedCorners: true,
        show: false,
        parent: win,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'menuPreload.js'),
            contextIsolation: true,
        },
    });

    menuWin.loadFile('menu.html');
}

// ---------------- IPC ----------------

// Serve engines.json to renderer
ipcMain.handle('get-engines', () => engines);

function toggleMainWindow() {
    if (!win) return;

    if (win.isVisible()) {
        win.hide();
    } else {
        win.center();
        win.show();
        win.focus(); // focus the window

        // Send message to renderer to focus the textarea
        if (win.webContents) {
            win.webContents.send('focus-query');
        }
    }
}

ipcMain.handle('get-window-position', () => {
    if (!win) return { x: 0, y: 0 };
    const bounds = win.getBounds();
    return { x: bounds.x, y: bounds.y };
});


app.whenReady().then(() => {
    createWindow();
    createMenuWindow();

    // Register global shortcuts
    globalShortcut.register('Control+Q', toggleMainWindow);
    globalShortcut.register('Escape', toggleMainWindow);

    // Hide window via IPC from renderer
    ipcMain.on('hide-window', () => win.hide());

    // Open URL externally
    ipcMain.on('open-url', (event, url) => {
        shell.openExternal(url);
        win.hide();
    });

    // Adjust height dynamically
    ipcMain.on('adjust-window-height', (event, height) => {
        if (!win) return;
        const boundedHeight = Math.min(Math.max(150, height), 500); // keep between 150–500
        const [currentWidth] = win.getSize();
        win.setSize(currentWidth, boundedHeight);
    });
});


// Open/close menu window
ipcMain.on('toggle-menu-at', (event, pos) => {
    if (!menuWin) return;

    if (menuWin.isVisible()) {
        menuWin.hide();
    } else {
        menuWin.show(); // first show it
        const bounds = menuWin.getBounds(); // now Electron knows the window size
        menuWin.setBounds({
            x: Math.round(pos.x),
            y: Math.round(pos.y),
            width: menuWidth,
            height: menuHeight
        });
        menuWin.focus();
    }
});

ipcMain.on('set-menu-dimensions', (event, { height, width }) => {
    menuHeight = height;
    menuWidth = width;
    if (menuWin) {
        const bounds = menuWin.getBounds();
        menuWin.setBounds({
            x: bounds.x,
            y: bounds.y,
            width: Math.round(width),
            height: Math.round(menuHeight),
        });
    }
});

// Close menu explicitly
ipcMain.on('close-menu', () => {
    if (menuWin && menuWin.isVisible()) menuWin.hide();
});

// Engine selected from menu
ipcMain.on('engine-selected', (event, i) => {
    win.webContents.send('engine-selected', i);
    if (menuWin) menuWin.hide();
});


app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});
