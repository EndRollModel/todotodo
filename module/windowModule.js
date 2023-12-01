const {BrowserWindow} = require("electron");
const {appConfig, loadingWindowOptions} = require('../config/winConfig');
const {saveMainWinSetting, loadMainWinSetting} = require("./fileSysModule");

function setWinModule() {
    const loadingWin = new BrowserWindow(loadingWindowOptions); // loading的頁面
    loadingWin.loadFile(appConfig.loadingPageFile).then(); // 先載入loading畫面

    const tuduWin = new BrowserWindow(loadMainWinSetting()); // 同時設定main與上次的使用者設定
    tuduWin.name = appConfig.tuduPageName; // 給定名稱
    tuduWin.on('close', () => saveMainWinSetting(tuduWin)); // 監聽關閉的事件
    tuduWin.loadFile(appConfig.indexPageFile).then(); // 載入頁面

    tuduWin.on("ready-to-show", ()=>{
        setTimeout(()=>{
            loadingWin.close();
            tuduWin.show();
        }, loadingWindowOptions.delayTime)
    })
    // tuduWin.webContents.send('testSend', `hi?`);
    if (appConfig.openDevTools) { // 是否顯示開發工具
        tuduWin.webContents.openDevTools()
    }
}

module.exports = {
    setWinModule
}
