const {contextBridge, ipcRenderer} = require('electron');

// 建立名稱 versions 的物件，這個物件可以在 renderer 被取用
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});


contextBridge.exposeInMainWorld(`tuduFeat`, {
    update: (data) => {
        return ipcRenderer.invoke("updateTudu", data);
    },
    loadData: () => {
        return ipcRenderer.invoke('loadTudu');
    },
});

// 取得已安裝的字型列表內容
contextBridge.exposeInMainWorld('font', {
    getFontList: () => {
        return ipcRenderer.invoke('getFontList');
    }
})

// 取得目前的時間紀錄
contextBridge.exposeInMainWorld(`timeFeat`, {
    timeFormat: (time) => {
        return ipcRenderer.invoke('timeFormat', time);
    }
})

// 使用者資訊
contextBridge.exposeInMainWorld(`userFeat`, {
    loadUserData: () => {
        return ipcRenderer.invoke('loadUserData');
    },
    saveUserData: (data) => {
        return ipcRenderer.send('saveUserData', data);
    }
})

// 字型等設定
contextBridge.exposeInMainWorld('setting', {
    loadUserSetting: () => {
        return ipcRenderer.invoke('loadUserSetting');
    },
    saveUserSetting: (data) => {
        return ipcRenderer.send('saveUserSetting', data);
    }
})

// 關於更新資料
contextBridge.exposeInMainWorld('appInfo', {
    version: () => {
        return ipcRenderer.invoke('version');
    },
})

// 置頂
contextBridge.exposeInMainWorld('pageSetting', {
    setOnTop: () => {
        return ipcRenderer.invoke('setOnTop');
    },
    getOnTop: ()=>{
        return ipcRenderer.invoke('getOnTop');
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
