const {app, ipcMain, BrowserWindow} = require('electron');
const {appConfig} = require('../config/winConfig');
// ipcRenderer.invoke <=>  ipcMain.handle()
// ipcMain.send() => ipcMain.on()
function setIpcModule() {
    // 頁面上
    windowListener();
    // 資料
    tuduFeatListener();
}

function windowListener(){
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
}

function tuduFeatListener(){
    // tuduController
    ipcMain.handle('updateTudu', (e, msg)=>{
        // update userData
        console.log(msg)
        return msg
    })
    ipcMain.handle('loadTudu', ()=>{
        return 'data';
    })
}

module.exports = {
    setIpcModule,
}
