const fs = require('fs');
const winConfig = require('../config/winConfig');
const {app} = require('electron');
const path = require("path");

function checkUserDataPath() {
    const userDataPath = `${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`
    console.log(`路徑${app.getPath(winConfig.saveDataOption.saveModel)}`)
    if (!fs.existsSync(userDataPath)) {
        fs.mkdirSync(userDataPath);
    }
}

function saveWinSetting(data) {
    checkUserDataPath();
    const settingsPath = path.join(`${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`, winConfig.saveDataOption.settingName); // 保存的路徑
    let settings;
    try {
        settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    } catch (error) {
        // 如果沒有任何設定 這裡設定預設寫個空值就好
        settings = `{}`;
    }
    fs.writeFileSync(settingsPath, JSON.stringify(data));
}

function loadWinSetting() {
    checkUserDataPath();
    const settingsPath = path.join(`${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`, winConfig.saveDataOption.settingName); // 保存的路徑
    const windowsSetting = JSON.parse(JSON.stringify(winConfig.windowOptions)); // 深複製
    let settings = {};
    try {
        settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        windowsSetting.width = settings.windowWidth;
        windowsSetting.height = settings.windowHeight;
        console.log(`視窗寬度${windowsSetting.width}, 視窗高度${windowsSetting.height}`)
    } catch (error) {
        // 如果沒有任何設定 這裡設定預設
        console.log(`error:` , error.message)

    }
    return windowsSetting;
}

module.exports = {
    saveWinSetting,
    loadWinSetting
};
