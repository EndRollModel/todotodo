// Modules to control application life and create native browser window
// 可在這邊寫所有程式 或是使用require將需要的程式引入
const {app, BrowserWindow, ipcMain} = require('electron');
const settingModule = require('./module/settingModule');
const {saveWinSetting} = require("./module/settingModule");
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


const createWindow = () => {
    // 建立瀏覽器頁面
    mainWindow = new BrowserWindow(settingModule.loadWinSetting(app));

    mainWindow.on('close', () => {
        const saveData = {};
        const [width, height] = mainWindow.getSize();
        saveData.windowWidth = width;
        saveData.windowHeight = height;
        saveWinSetting(app, saveData)
    })

    // 載入 index.html
    mainWindow.loadFile('index.html')

    // 是否顯示開發工具
    // mainWindow.webContents.openDevTools()
}
app.on('ready', () => setTimeout(createWindow, 300))

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



