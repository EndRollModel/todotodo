const winConfig = {};
const path = require('path');
const packageInfo = require('../package.json');

// app之中的參數
winConfig.appConfig = {
    version: packageInfo.version,
    indexPageFile: 'index.html', // main的html頁面
    loadingPageFile: 'loading.html', // 讀取中的html頁面
    openDevTools: false, // 是否開啟除錯模式
    tuduPageName: 'tudu',
    memoPageName: 'memo',
}

winConfig.themeList = {
    'dark': '黑暗模式',
    'light': '明亮模式'
}

winConfig.colorNameList = {
    mainColor: {
        // 使用主色調(粉#FFD6DE)的名稱列表
        attr: '',
        value: '#FFD6DE',
        list: [
            '--addFeatBDColor',
            '--groupItemBDColor',
            '--memoItemBDColor',
            '--tuduItemBDColor',
            '--dropdownBDColor',
            '--popoverBDColor',
            '--modalInBDColor',
            '--modalInFBDColor',
            '--modalBtnGroupBDColor',
            '--checkColor',
            '--radioColor',
            '--formSelectBDColor',
            '--formSelectFBDColor'
        ]
    },
    itemsBgColor: {
        // item的背景
        attr: '',
        value: '#FFFFFF4C',
        list: [
            '--groupItemBGColor',
            '--memoItemBGColor',
            '--tuduItemBGColor',
        ]
    },
    itemsBs: {
        attr: '1px 1px 0 0',
        value: '#FFD6DE',
        list: [
            '--groupItemBS',
            '--memoItemBS',
            '--tuduItemBS'
        ]
    },
    radioCheckBS: {
        // check & radio 點選時的顏色
        attr: 'inset 0 0 0 0.7px',
        value: '#E0B9C1',
        list: ['--checkBEBS']
    },
    focusBS: {
        attr: '2px 2px 0 0',
        value: '#FFD6DE',
        list: [
            '--modalInFBS',
            '--modalBtnGroupHoverBs',
            '--formSelectFBS',
        ]
    },
    dropdown:{
        attr: '',
        value: '#FFD6DE7F',
        list:[
            '--dropdownHoverColor',
            '--dropdownActiveColor',
        ]
    }
}

// 列出所有內容 未來如果需要針對個別選項去做調整時可以處理
// boxShadow需另外處理 除外的color可填入顏色即可
winConfig.windowColor = {
    toolbarColor: {
        name: '標題列',
        elem: '.window-frame',
        bgColor: '#646464', bgColorName: '--toolbarBg'
    },
    backgroundColor: {
        name: '主背景顏色',
        elem: '.body-block',
        bgColor: '#FFFFFFE6', bgColorName: '--bgColor',
    },
    addFeatButton: {
        name: '新增按鈕',
        elem: '#addFeatBtn',
        bgColor: '#00000000', bgColorName: '--addFeatBGColor',
        borderColor: '#FFD6DE', bdColorName: '--addFeatBDColor',
        hover: {}
    },
    groupItemColor: {
        name: '群組',
        elem: '.tudu-g-item',
        bgColor: '#FFFFFF4C', bgColorName: '--groupItemBGColor',
        borderColor: '#FFD6DE', bdColorName: '--groupItemBDColor',
        boxShadow: '1px 1px 0 0 #FFD6DE', bsName: '--groupItemBS',
    },
    memoItemColor: {
        name: '剪貼簿',
        elem: '.memo-item',
        bgColor: '#FFFFFF4C', bgColorName: '--memoItemBGColor',
        borderColor: '#FFD6DE', bdColorName: '--memoItemBDColor',
        boxShadow: '1px 1px 0 0 #FFD6DE ', bsName: '--memoItemBS',
    },
    tuduItemColor: {
        name: '待辦',
        elem: '.tudu-item',
        bgColor: '#FFFFFF4C', bgColorName: '--tuduItemBGColor',
        borderColor: '#FFD6DE', bdColorName: '--tuduItemBDColor',
        boxShadow: '1px 1px 0 0 #FFD6DE', bsName: '--tuduItemBS',
    },
    modalInput: {
        name: '提示框輸入框',
        elem: '.modal-body > input',
        borderColor: '#FFD6DE', bdColorName: '--modalInBDColor',
        focus: {
            borderColor: '#FFD6DE', bdColorName: '--modalInBDColor',
            boxShadow: '2px 2px 0 0 #FFD6DE', bsName: '--modalInFBS',
        }
    },
    formSelect: {
        name: '被選擇的項目',
        elem: '.form-select',
        borderColor: '#FFD6DE', bdColorName: '--formSelectBDColor',
        focus: {
            borderColor: '#FFD6DE', bdColorName: '--formSelectFBDColor',
            boxShadow: '2px 2px 0 0 #FFD6DE', bsName: '--formSelectFBS',
        }
    },
    modalButton: {
        name: '提示框按鈕',
        elem: '.modal-btn-group > button',
        bgColor: '#ffffff', bgColorName: '--modalBtnGroupBGColor',
        borderColor: '#FFD6DE', bdColorName: '----modalBtnGroupBDColor',
        hover: {
            boxShadow: '2px 2px 0 0 #FFD6DE;', bsName: '--modalBtnGroupHoverBs'
        }
    },
    popoverColor: {
        name: '提示窗', elem: '.popover',
        bgColor: '#FFFFFFCC', bgColorName: '--popoverBGColor',
        borderColor: '#FFD6DE', bdColorName: '--popoverBDColor',
    },
    dropdownMenu: {
        name: '選項選單',
        elem: '.dropdown-menu',
        bgColor: '#FFFFFFCC', bgColorName: '--dropdownBGColor',
        borderColor: '#FFD6DE', bdColorName: '--dropdownBDColor',
        hover: {
            backgroundColor: '#FFD6DE7F', bgColorName: '--dropdownHoverColor'
        },
        active: {
            borderColor: '#FFD6DE7F', bdColorName: '----dropdownActiveColor'
        }
    }
}

// 頁面上的一些參數設定
winConfig.pageConfig = {
    pageGray: '#808080', // 灰色
    pageColorPink: '#ffd6de', // 粉紅色
    pageColorBlue: '#8cb5ff', // 淡藍色
    defFont: 'Cubic_11',
}

// 字體對照表
winConfig.fontTable = {
    'Cubic_11': '俐方體11號/(Cubic 11)',
    'GenJyuuGothic': '思源柔黑',
    'NaikaiFont': '內海字型',
    'NaikaiFontLight': '內海字型(細)',
    '微軟正黑體': "微軟正黑體",
    'NotoSansTC-Regular': "思源黑體",
    'NotoSansTC-Light': "思源黑體(細)",
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
    delayTime: 1400, // 讀取的延遲時間
    alwaysOnTop: true, // 是否置頂
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
    alwaysOnTop: false, // 是否置頂
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
