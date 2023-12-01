const winConfig = {};
const path = require('path');

//
winConfig.buildConfig = {
    version : '0.1.3.5'
}

// app之中的參數
winConfig.appConfig = {
    indexPageFile : 'index.html', // main的html頁面
    loadingPageFile : 'loading.html', // 讀取中的html頁面
    openDevTools : false, // 是否開啟除錯模式
    tuduPageName : 'tudu',
    memoPageName : 'memo',
}

// 頁面上的一些參數設定
winConfig.pageConfig = {
    pageGray : '#808080', // 灰色
    pageColorPink : '#ffd6de', // 粉紅色
    pageColorBlue : '#8cb5ff', // 淡藍色
    defFont : 'Cubic_11',
}

// 字體對照表
winConfig.fontTable = {
    'Cubic_11': '俐方體11號/(Cubic 11)',
    'GenJyuuGothic' : '思源柔黑',
    'NaikaiFont' : '內海字型',
}

// 讀取中的畫面
winConfig.loadingWindowOptions = {
    width: 500, // 預設的寬度
    height: 500, // 預設的高度
    transparent: true, // 透明
    frame: false, // 是否顯示框架
    resizable: false, // 是否可改變視窗大小
    movable: false, // 能否移動視窗
    maximizable: false, //禁止最大化
    autoHideMenuBar: true, // 隱藏工具列
    delayTime : 1400, // 讀取的延遲時間
}

// 視窗中的設定
winConfig.mainWindowOptions = {
    title: '兔嘟莉絲特', // TuDuLeSuTer Tùdūlìsītè
    width: 335, // 預設的寬度
    height: 520, // 預設的高度
    minWidth: 335, // 最高的寬度
    minHeight: 520, // 最低的高度
    show: false, // 預設是否先秀出
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
    saveModel: 'userData',
    saveDir: 'tudu',
    settingName: 'settings.json',
    userSettingName: 'userSetting.json',
    tuduDataName: 'tuduData.json',
}


module.exports = winConfig;
