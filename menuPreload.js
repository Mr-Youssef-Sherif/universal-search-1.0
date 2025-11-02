const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('menuAPI', {
    requestEngines: () => ipcRenderer.invoke('get-engines'),
    selectEngine: (i) => ipcRenderer.send('engine-selected', i),
    setMenuDimensions: (dims) => ipcRenderer.send('set-menu-dimensions', dims),
});
