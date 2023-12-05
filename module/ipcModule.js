const {app, ipcMain, BrowserWindow} = require('electron');
const {appConfig, fontTable} = require('../config/winConfig');
const versionInfo = require('../config/versionRecord');
const fileSysModule = require('../module/fileSysModule');
const dayjs = require("dayjs");
// ipcRenderer.invoke <=>  ipcMain.handle()
// ipcMain.send() => ipcMain.on()
function setIpcModule() {
    mainWindowListener(); // 主頁面上
    tuduFeatListener(); // 資料
    timeFeatListener(); // 時間處理
    tuduSettingListener(); // 字型
    userFeatListener(); // 使用者資料
    userSetting(); // 使用這的設定資料
    aboutApplication(); // 回傳
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
    ipcMain.handle('getFontList', () => {
        return fontTable;
    })
}

function tuduFeatListener() {
    // tuduController
    ipcMain.handle('updateTudu', (e, msg) => {
        // update userData
        // console.log(msg)
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
        return {version : appConfig.version , info : versionInfo[appConfig.version]};
    })
    ipcMain.handle('allVersion', ()=>{
        return versionInfo;
    })
}

module.exports = {
    setIpcModule,
}
