const {app, ipcMain, BrowserWindow} = require('electron');
const {appConfig} = require('../config/winConfig');
const dayjs = require("dayjs");
// ipcRenderer.invoke <=>  ipcMain.handle()
// ipcMain.send() => ipcMain.on()
function setIpcModule() {
    windowListener(); // 頁面上
    tuduFeatListener(); // 資料
    timeFeatListener(); // 時間處理
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
        // console.log(msg)
        return msg
    })
    ipcMain.handle('loadTudu', ()=>{
        return 'data';
    })
}

function timeFeatListener (){
    ipcMain.handle('timeFormat', (e, time)=>{
        // return dayjs(time).format('YYYY-MM-DD');
        return dayjs(time).format('HH:mm:ss');
    })

}

module.exports = {
    setIpcModule,
}
