// Modules to control application life and create native browser window
// 可在這邊寫所有程式 或是使用require將需要的程式引入
const {app, BrowserWindow, ipcMain} = require('electron');
const winModule = require('./module/windowModule');
const ipcModule = require('./module/ipcModule')
const createWindow = () => {
    // 建立ipc監聽
    ipcModule.setIpcModule();
    // 建立主頁面
    winModule.setWinModule();
}
app.on('ready', () => setTimeout(createWindow, 450))

app.on('activate', () => {
    // 如果是在mac os內 沒有已經開啟的app 點選icon時則會再建立一個新的視窗
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', () => {
    // 除了macOS外 所有的視窗都被關閉時則結束程式
    if (process.platform !== 'darwin') {
        app.quit()
    }
})



