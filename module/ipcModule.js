// const {app, ipcMain, BrowserWindow, ipcRenderer, clipboard, nativeTheme, Notification} = require('electron');
const {app, ipcMain, BrowserWindow, ipcRenderer, clipboard, nativeTheme} = require('electron');
const {appConfig, fontTable, themeColorList} = require('../config/winConfig');
const versionInfo = require('../config/versionRecord');
const fileSysModule = require('../module/fileSysModule');
const dayjs = require("dayjs");

// ipcRenderer.invoke <=>  ipcMain.handle()
// ipcMain.send() => ipcMain.on()
function setIpcModule() {
    mainWindowListener(); // 主頁面上 (縮小關閉)
    tuduFeatListener(); // 資料 (拉取資料)
    timeFeatListener(); // 時間處理 (點選check時抓取時間)Ｉ
    tuduSettingListener(); // 字型 (設定的字型)
    userFeatListener(); // 使用者資料
    userSetting(); // 使用者的設定資料
    aboutApplication(); // 關於程式
    clipboardFunc(); // 寫入剪貼簿功能
    themeFunc(); // 主題相關
    notificationFunc(); // 通知相關
}

function mainWindowListener() {
    ipcMain.on('close-app', () => {
        app.quit();
    });

    ipcMain.on('zoom-out', (e, name) => {
        BrowserWindow.getAllWindows()[0].minimize();
        // appConfig.memoPageName
        // const windows = BrowserWindow.getAllWindows();
        // windows.forEach((e) => {
        //     if (e.name === name) {
        //         e.minimize()
        //     }
        // });
    })

    // 置頂
    ipcMain.handle('setOnTop', (e) => {
        const isOnTop = BrowserWindow.getAllWindows()[0].isAlwaysOnTop();
        BrowserWindow.getAllWindows()[0].setAlwaysOnTop(!isOnTop);
        return BrowserWindow.getAllWindows()[0].isAlwaysOnTop()
    })
    ipcMain.handle('getOnTop', (e) => {
        return BrowserWindow.getAllWindows()[0].isAlwaysOnTop();
    })
}

function tuduSettingListener() {
    // 取得字型清單
    ipcMain.handle('getFontList', () => {
        return fontTable;
    })
}

function tuduFeatListener() {
    // tuduController
    ipcMain.handle('updateTudu', (e, msg) => {
        // update userData
        return msg
    })
    ipcMain.handle('loadTudu', () => {
        return 'data';
    })
}

function timeFeatListener() {
    ipcMain.handle('timeFormat', (e, time) => {
        // return dayjs(time).format('YYYY-MM-DD');
        return dayjs(time).format('HH:mm');
    })
}

function userFeatListener() {
    ipcMain.handle('loadUserData', () => {
        return fileSysModule.loadUserData();
    })
    ipcMain.on('saveUserData', (e, data) => {
        fileSysModule.saveUserData(data);
    })
}

function userSetting() {
    ipcMain.handle('loadUserSetting', () => {
        return fileSysModule.loadUserSetting()
    });
    ipcMain.on('saveUserSetting', (e, data) => {
        fileSysModule.saveUserSetting(data)
    })
}

function aboutApplication() {
    ipcMain.handle('version', () => {
        if (versionInfo[appConfig.version] !== undefined) {
            return {version: appConfig.version, info: versionInfo[appConfig.version], appName: appConfig.appName}
        } else {
            // 避免版本錯誤回傳上一筆
            return {
                version: appConfig.version,
                info: versionInfo[Object.keys(versionInfo)[0]],
                appName: appConfig.appName
            }
        }
    })
    ipcMain.handle('resource', () => {
        return versionInfo['resourceUse'];
    })
    ipcMain.handle('allVersion', () => {
        return versionInfo;
    })
}

function clipboardFunc() {
    ipcMain.handle('writeClipboard', (ev, data) => {
        clipboard.writeText(data, "clipboard");
        return 'written';
    })
}

function themeFunc() {
    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    })

    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })

    ipcMain.handle('getThemeColorList', () => {
        return themeColorList;
    })
}

function notificationFunc() {
    ipcMain.on('sendNotification', (ev, data) => {
        // new Notification({
        //     title: data.title,
        //     body: data.body,
        // }).show()
    })
}

module.exports = {
    setIpcModule,
}
