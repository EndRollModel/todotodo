const {app, BrowserWindow} = require("electron");
const {appConfig} = require('../config/winConfig');
const {saveWinSetting, loadWinSetting} = require("./fileModuel");

function setWinModule() {
    const tuduWin = new BrowserWindow(loadWinSetting());
    tuduWin.name = 'todo';

    tuduWin.on('close', () => {
        const saveData = {};
        const [width, height] = tuduWin.getSize();
        saveData.windowWidth = width;
        saveData.windowHeight = height;
        saveWinSetting(saveData)
    })

    // 載入 index.html
    tuduWin.loadFile(appConfig.indexPageFile).then()

    // 是否顯示開發工具
    if(appConfig.openDevTools){
        tuduWin.webContents.openDevTools()
    }
}


module.exports = {
    setWinModule
}
