const {app, BrowserWindow} = require("electron");
const {appConfig, loadingWindowOptions} = require('../config/winConfig');
const {saveWinSetting, loadWinSetting} = require("./fileModule");

function setWinModule() {
    const loadingWin = new BrowserWindow(loadingWindowOptions);
    loadingWin.loadFile(appConfig.loadingPageFile).then();

    const tuduWin = new BrowserWindow(loadWinSetting());
    tuduWin.name = appConfig.tuduPageName; // 給定名稱
    tuduWin.on('close', () => saveWinSetting(tuduWin)); // 監聽關閉的事件
    tuduWin.loadFile(appConfig.indexPageFile).then(); // 載入頁面


    tuduWin.on("ready-to-show", ()=>{
        setTimeout(()=>{
            loadingWin.close();
            tuduWin.show();
        },1500)
    })

    // tuduWin.webContents.send('testSend', `hi?`);
    if (appConfig.openDevTools) { // 是否顯示開發工具
        tuduWin.webContents.openDevTools()
    }
}

module.exports = {
    setWinModule
}
