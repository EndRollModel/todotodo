const winConfig = {};
const path = require('path');
const {app} = require('electron');

winConfig.windowOptions = {
    title: '兔嘟莉絲特', // TuDuLeSuTer Tùdūlìsītè
    width: 320,
    height: 220,
    minHeight: 220, // 最低的高度
    minWidth: 220, // 最高的高度
    transparent: true, // 透明
    frame: false, // 是否顯示框架
    resizable: true, // 是否可改變視窗大小
    movable: true, // 能否移動視窗
    maximizable: false, //禁止最大化
    autoHideMenuBar: true, // 隱藏工具列
    webPreferences: {
        preload: path.join(__dirname, './preload/preload.js')
    }
}

winConfig.saveDataOption = function () {
    console.log(`${app.getPath('documents')}/tudu`)
    const saveModel = 'documents'
    const saveDir = 'tudu'
    const savePath = `${app.getPath('documents')}/tudu`;
    const settingName = `setting.json`;
    console.log(`run?`)
    return {
        saveModel, saveDir, savePath, settingName
    }
}


module.exports = winConfig;
