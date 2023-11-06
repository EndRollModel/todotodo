// Modules to control application life and create native browser window
// 可在這邊寫所有程式 或是使用require將需要的程式引入
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const settingModule = require('./module/settingModule');
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



function loadWinSize(){

}
function recodeWinSize (){

}

const createWindow = () => {

    // 建立瀏覽器頁面
    mainWindow = new BrowserWindow(settingModule.loadWinSetting());

    // // 若改變了視窗大小 紀錄
    // const writeResize = throttle(() => {
    //     const [width, height] = mainWindow.getSize();
    //     settings.windowWidth = width;
    //     settings.windowHeight = height;
    //     // 保存設定到文件
    //     fs.writeFileSync(settingsPath, JSON.stringify(settings));
    // }, 50);
    //

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



