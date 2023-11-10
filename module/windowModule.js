const {app, BrowserWindow} = require("electron");
const {appConfig} = require('../config/winConfig');
const {saveWinSetting, loadWinSetting} = require("./fileModule");

function setWinModule() {
    const tuduWin = new BrowserWindow(loadWinSetting());
    tuduWin.name = 'todo';

    tuduWin.on('close', () => saveWinSetting(tuduWin));

    // 載入 index.html
    tuduWin.loadFile(appConfig.indexPageFile).then()

    setTimeout(()=>{
        console.log('send message?')
        tuduWin.webContents.send('testSend', `hi?`)
    },5000)

    // 是否顯示開發工具
    if(appConfig.openDevTools){
        tuduWin.webContents.openDevTools()
    }
}


module.exports = {
    setWinModule
}
