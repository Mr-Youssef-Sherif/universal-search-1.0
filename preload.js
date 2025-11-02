const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    requestEngines: () => ipcRenderer.invoke('get-engines'),
    hideWindow: () => ipcRenderer.send('hide-window'),
    openURL: (url) => ipcRenderer.send('open-url', url),
    adjustHeight: (h) => ipcRenderer.send('adjust-window-height', h),
    toggleMenuAt: (pos) => ipcRenderer.send('toggle-menu-at', pos),
    setMenuDimensions: (dims) => ipcRenderer.send('set-menu-dimensions', dims),
    closeMenu: () => ipcRenderer.send('close-menu'),
    engineSelected: (i) => ipcRenderer.send('engine-selected', i),
    onFocusQuery: (callback) => ipcRenderer.on('focus-query', callback),
    onEngineSelected: (callback) => ipcRenderer.on('engine-selected', callback),
    getWindowPosition: () => ipcRenderer.invoke('get-window-position')
});
