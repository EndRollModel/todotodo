const {contextBridge, ipcRenderer} = require('electron');

// 建立名稱 versions 的物件，這個物件可以在 renderer 被取用
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld(`tuduFeat`,{
    update : (data)=>{
        return ipcRenderer.invoke("updateTudu", data);
    },
    loadData : ()=>{
        return ipcRenderer.invoke('loadTudu');
    },
});

contextBridge.exposeInMainWorld('font', {
    getFontList : ()=>{
        return ipcRenderer.invoke('getFontList');
    }
})

contextBridge.exposeInMainWorld(`timeFeat`,{
    timeFormat : (time)=>{
        return ipcRenderer.invoke('timeFormat', time);
    }
})


let closeAppBtn;
let zoomOutBtn;

window.onload = function () {
    closeAppBtn = document.getElementById('frameClose');
    zoomOutBtn = document.getElementById('frameZoomOut');
    closeAppBtn.addEventListener('click', () => ipcRenderer.send('close-app'));// 發送關閉程式的請求
    zoomOutBtn.addEventListener('click', () => ipcRenderer.send('zoom-out'));// 發送關閉程式的請求
}
