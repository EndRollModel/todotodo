const winConfig = {};
const path = require('path');

// app之中的參數
winConfig.appConfig = {
    indexPageFile : 'index.html', // 讀取的html頁面
    openDevTools : false, // 是否開啟除錯模式
    tuduPageName : 'tudu',
    memoPageName : 'memo',
}

// 視窗中的設定
winConfig.windowOptions = {
    title: '兔嘟莉絲特', // TuDuLeSuTer Tùdūlìsītè
    width: 220, // 預設的寬度
    height: 320, // 預設的高度
    minHeight: 220, // 最低的高度
    minWidth: 220, // 最高的高度
    transparent: true, // 透明
    frame: false, // 是否顯示框架
    resizable: true, // 是否可改變視窗大小
    movable: true, // 能否移動視窗
    maximizable: false, //禁止最大化
    autoHideMenuBar: true, // 隱藏工具列
    webPreferences: {
        preload: path.join(__dirname, '../preload/preload.js')
    }
}

// userData的設定
winConfig.saveDataOption = {
    saveModel: 'documents',
    saveDir: 'tudu',
    settingName: 'settings.json',
    tuduDataName: 'tuduData.json',
}

module.exports = winConfig;
