const fs = require('fs');
const winConfig = require('../config/winConfig');
const {app, safeStorage} = require('electron');
const path = require('path');

function checkSettingConfigExist() {
    const userDataPath = `${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`
    // console.log(userDataPath)
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
        windowsSetting.alwaysOnTop = settings.alwaysOnTop;
        // console.log(`讀取：視窗寬度:${windowsSetting.width}, 視窗高度:${windowsSetting.height}`);
        // console.log(`位置：x:${windowsSetting.x}, y:${windowsSetting.y}`);
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
    windowsSetting.alwaysOnTop = browser.isAlwaysOnTop();
    // console.log(`儲存： width : ${windowsSetting.windowWidth}, height: ${windowsSetting.windowHeight}, x; ${windowsSetting.windowX}, y: ${windowsSetting.windowY}`);
    return windowsSetting;
}

function loadUserData() {
    checkSettingConfigExist();
    let userData = [];
    const userDataPath = path.join(`${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`, winConfig.saveDataOption.tuduDataName);
    console.log(userDataPath)
    try {
        userData = fs.readFileSync(userDataPath, 'utf-8')
        let deData = safeStorage.decryptString(Buffer.from(userData, 'base64'));
        userData = JSON.parse(deData)
        // userData = JSON.parse(userData)
    } catch (e) {
        switch (true) {
            case e.message.indexOf('Unexpected non-whitespace character') > -1: //json parse fail
                // 解析錯誤
                userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
                break;
            case e.message.indexOf('no such file or directory') > -1: // no file, new user
                // 沒有資料 建立新使用者 保持空陣列不變
                userData = [];
                break;
            case e.message.indexOf('Error while decrypting the ciphertext provided to safeStorage.decryptString') > -1: // decode fail, (ver0.1.4beta.1)
                // buffer後的資料無法被解密 可能是原本低於版本的舊資料
                userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
                break;
            case e.message.indexOf('Expected the first argument of decryptString()') > -1:
                // console.log(e.message)
                break
            case e.message.indexOf('Unexpected end of JSON input') > -1: // 文件錯誤
                break;
            default:
                // console.log(e.message)
                break;
        }
    }
    return userData;
}

function saveUserData(data) {
    console.log('saved');
    console.log(JSON.stringify(data))
    checkSettingConfigExist();
    const userDataPath = path.join(`${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`, winConfig.saveDataOption.tuduDataName);
    const userEncData = Buffer.from(safeStorage.encryptString(JSON.stringify(data))).toString('base64');
    // const userEncData = JSON.stringify(data);
    fs.writeFileSync(userDataPath, userEncData);
}

function loadUserSetting() {
    checkSettingConfigExist();
    let userSetting = {};
    const userSettingPath = path.join(`${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`, winConfig.saveDataOption.userSettingName);
    try {
        userSetting = JSON.parse(fs.readFileSync(userSettingPath, 'utf-8'))
    } catch (e) {
    }
    return userSetting;
}

function saveUserSetting(data) {
    checkSettingConfigExist();
    const userSettingPath = path.join(`${app.getPath(winConfig.saveDataOption.saveModel)}/${winConfig.saveDataOption.saveDir}`, winConfig.saveDataOption.userSettingName);
    fs.writeFileSync(userSettingPath, JSON.stringify(data))
}

module.exports = {
    saveMainWinSetting,
    loadMainWinSetting,
    loadUserSetting,
    saveUserSetting,
    saveUserData,
    loadUserData,
};
