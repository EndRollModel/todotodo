const { app } = require('electron');
const { contextBridge } = require('electron');
// // 在userDataPath中創建文件並寫入數據
// const fs = require('fs');
// const userDataPath = app.getPath('userData');
//
// // 建立名稱 versions 的物件，這個物件可以在 renderer 被取用
// contextBridge.exposeInMainWorld('versions', {
//     node: () => process.versions.node,
//     chrome: () => process.versions.chrome,
//     electron: () => process.versions.electron,
// });
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})
