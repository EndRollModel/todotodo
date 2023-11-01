// Modules to control application life and create native browser window
// 可在這邊寫所有程式 或是使用require將需要的程式引入
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('fs');
ipcMain.on('read-file', (event, filePath) => {
    // 在主進程中讀取文件
    const data = fs.readFileSync(filePath, 'utf8');
    event.reply('file-contents', data);
});

const createWindow = () => {
    // 建立瀏覽器頁面
    const mainWindow = new BrowserWindow({
        width: 320,
        height: 500,
        // transparent : true,
        // frame: false,
        // resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 載入 index.html
    mainWindow.loadFile('index.html')

    // 顯示開發工具
    // mainWindow.webContents.openDevTools()
}

// 結束初始化與建立瀏覽器頁面時使用 部分的api則在ready後才有作用
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        // 如果是在mac os內 沒有已經開啟的app 點選icon時則會再建立一個新的視窗
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 除了macOS外 所有的視窗都被關閉時則結束程式
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

