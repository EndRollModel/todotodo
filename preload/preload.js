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
})

let closeAppBtn;
let zoomOutBtn;

window.onload = function () {
    closeAppBtn = document.getElementById('close-app');
    zoomOutBtn = document.getElementById('zoom-out');
    closeAppBtn.addEventListener('click', () => ipcRenderer.send('close-app'));// 發送關閉程式的請求
    zoomOutBtn.addEventListener('click', () => ipcRenderer.send('zoom-out'));// 發送關閉程式的請求
}
