const fs = require('fs');
const winConfig = require('../config/winConfig');
const {app} = require("electron");
const path = require("path");

function checkSetting() {
    const userDataPath = winConfig.saveDataOption.savePath;
    if (!fs.existsSync(userDataPath)) {
        fs.mkdirSync(userDataPath);
    }}

function saveWinSetting(data) {
    checkSetting();
    const settingsPath = path.join(winConfig.saveDataOption.savePath, winConfig.saveDataOption.settingName); // 保存的路徑
    let settings = {};
    try {
        settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    } catch (error) {
        // 如果沒有任何設定 這裡設定預設寫個空值就好
        settings = `{}`;
    }
    fs.writeFileSync(settingsPath, JSON.stringify(settings));
}

function loadWinSetting() {
    checkSetting();
    const settingsPath = path.join(winConfig.saveDataOption.savePath, winConfig.saveDataOption.settingName); // 保存的路徑
    const windowsSetting = JSON.parse(JSON.stringify(winConfig.windowOptions)); // 深複製
    let settings = {};
    try {
        settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        windowsSetting.width = settings.windowWidth;
        windowsSetting.height = settings.windowHeight;
    } catch (error) {
        // 如果沒有任何設定 這裡設定預設
    }
    return windowsSetting;
}

module.exports = {
    saveWinSetting,
    loadWinSetting
};
