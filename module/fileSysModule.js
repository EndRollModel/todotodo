const fs = require('fs');
const winConfig = require('../config/winConfig');
const {app, BrowserWindow} = require('electron');
const path = require('path');

function checkSettingConfigExist() {
    const userDataPath = `${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`
    if (!fs.existsSync(userDataPath)) {
        fs.mkdirSync(userDataPath);
    }
}

function saveMainWinSetting(browser) {
    checkSettingConfigExist();
    const settingsPath = path.join(`${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`, winConfig.saveDataOption.settingName); // 保存的路徑
    fs.writeFileSync(settingsPath, JSON.stringify(getWinSetting(browser))); // 寫入資料
}

function loadMainWinSetting() {
    checkSettingConfigExist();
    const settingsPath = path.join(`${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`, winConfig.saveDataOption.settingName); // 保存的路徑
    const windowsSetting = JSON.parse(JSON.stringify(winConfig.mainWindowOptions)); // 深複製
    let settings = {};
    try {
        settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        windowsSetting.width = settings.windowWidth;
        windowsSetting.height = settings.windowHeight;
        windowsSetting.x = settings.windowX;
        windowsSetting.y = settings.windowY;
        console.log(`讀取：視窗寬度:${windowsSetting.width}, 視窗高度:${windowsSetting.height}`);
        console.log(`位置：x:${windowsSetting.x}, y:${windowsSetting.y}`);
    } catch (error) {
        // 如果沒有任何設定 這裡設定預設
    }
    return windowsSetting;
}

function getWinSetting(browser) {
    const windowsSetting = {};
    const [width, height] = browser.getSize();
    const [x, y] = browser.getPosition();
    windowsSetting.windowWidth = width;
    windowsSetting.windowHeight = height;
    windowsSetting.windowX = x;
    windowsSetting.windowY = y;
    console.log(`儲存： width : ${windowsSetting.windowWidth}, height: ${windowsSetting.windowHeight}, x; ${windowsSetting.windowX}, y: ${windowsSetting.windowY}`);
    return windowsSetting;
}
function loadUserData(){
    checkSettingConfigExist();
    let userData = [];
    const userDataPath = path.join(`${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`, winConfig.saveDataOption.tuduDataName);
    try{
        userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'))
    }catch (e){
    }
    return userData;
}

function saveUserData(data){
    checkSettingConfigExist();
    const userDataPath = path.join(`${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`, winConfig.saveDataOption.tuduDataName);
    fs.writeFileSync(userDataPath, JSON.stringify(data));
}

module.exports = {
    saveMainWinSetting,
    loadMainWinSetting,
    saveUserData,
    loadUserData,
};
