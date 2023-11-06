const { app } = require('electron');
const { contextBridge, ipcRenderer } = require('electron');

// // 建立名稱 versions 的物件，這個物件可以在 renderer 被取用
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});

window.onload = function (){
    document.getElementById('close-app').addEventListener('click', () => {
        // 發送關閉程式的請求
        ipcRenderer.send('close-app');
    });
    document.getElementById('zoom-out').addEventListener('click', () => {
        // 發送關閉程式的請求
        ipcRenderer.send('zoom-out');
    });

}

// window.addEventListener('DOMContentLoaded', () => {
//     const replaceText = (selector, text) => {
//         const element = document.getElementById(selector)
//         if (element) element.innerText = text
//     }
//
//     for (const dependency of ['chrome', 'node', 'electron']) {
//         replaceText(`${dependency}-version`, process.versions[dependency])
//     }
// })
