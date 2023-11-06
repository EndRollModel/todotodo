// Modules to control application life and create native browser window
// 可在這邊寫所有程式 或是使用require將需要的程式引入
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');
let mainWindow;

// ipcMain.on('read-file', (event, filePath) => {
//     // 在主進程中讀取文件
//     const data = fs.readFileSync(filePath, 'utf8');
//     event.reply('file-contents', data);
// });

ipcMain.on('close-app', () => {
    app.quit();
});

ipcMain.on('zoom-out', () => {
    mainWindow.minimize()
})


// 節流器 避免放大縮小視窗時持續的更改值
function throttle(callback, delay) {
    let previousCall = 0;
    return function () {
        const currentTime = new Date().getTime();
        if (currentTime - previousCall > delay) {
            previousCall = currentTime;
            callback.apply(this, arguments);
        }
    };
}

const windowOptions = {
    title: '兔嘟莉絲特', // TuDuLeSuTer Tùdūlìsītè
    // alwaysOnTop: true,
    // fullscreen: true,
    minHeight: 220,
    minWidth: 220,
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

const createWindow = () => {
    const userDataPath = `${app.getPath('documents')}/tudu`; // 取得儲存空間的位置
    if (!fs.existsSync(userDataPath)) {
        fs.mkdirSync(userDataPath);
    }
    const settingsPath = path.join(`${userDataPath}`, 'settings.json'); // 保存的路徑
    let settings = {};
    try {
        settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    } catch (error) {
        // 如果沒有任何設定 這裡設定預設
        windowOptions.width = 360;
        windowOptions.height = 480;
    }
    windowOptions.width = settings.windowWidth;
    windowOptions.height = settings.windowHeight;

    // 建立瀏覽器頁面
    mainWindow = new BrowserWindow(windowOptions);

    // 若改變了視窗大小 紀錄
    mainWindow.on('resize', () => {
        // writeResize();
    })

    const writeResize = throttle(() => {
        const [width, height] = mainWindow.getSize();
        settings.windowWidth = width;
        settings.windowHeight = height;
        // 保存設定到文件
        fs.writeFileSync(settingsPath, JSON.stringify(settings));
    }, 50);


    // 載入 index.html
    mainWindow.loadFile('index.html')

    // 是否顯示開發工具
    // mainWindow.webContents.openDevTools()
}
app.on('ready', () => setTimeout(createWindow, 300))

// 結束初始化與建立瀏覽器頁面時使用 部分的api則在ready後才有作用
// app.whenReady().then(() => {
//     createWindow()
// })


app.on('activate', () => {
    // 如果是在mac os內 沒有已經開啟的app 點選icon時則會再建立一個新的視窗
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// 除了macOS外 所有的視窗都被關閉時則結束程式
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})



