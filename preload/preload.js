const {contextBridge, ipcRenderer} = require('electron');

// // 建立名稱 versions 的物件，這個物件可以在 renderer 被取用
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,

});

let closeAppBtn;
let zoomOutBtn;

window.onload = function () {
    closeAppBtn = document.getElementById('close-app');
    zoomOutBtn = document.getElementById('zoom-out');
    closeAppBtn.addEventListener('click', () => ipcRenderer.send('close-app'));// 發送關閉程式的請求
    zoomOutBtn.addEventListener('click', () => ipcRenderer.send('zoom-out'));// 發送關閉程式的請求

    // ipcRenderer.on(``, (e, msg) => {})
}


// <div className="todo-b-item">
//     <div className="plusBlock">
//         <div> +</div>
//     </div>
//     <label className="checkBlock" htmlFor="check1">
//         <input id="check1" className="" type="checkbox" value="123">
//     </label>
// </div>
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
