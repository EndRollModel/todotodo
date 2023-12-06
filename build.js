const path = require('path');
const builder = require('electron-builder');
const appConfig = require('./config/winConfig');
builder.build({

    projectDir: path.resolve(__dirname),  // 專案路徑

    win: ['nsis', 'portable'],  // nsis . portable
    config: {
        "appId": "com.uwumei.tudutudu",
        "productName": "兔嘟莉絲特", // 應用程式名稱 ( 顯示在應用程式與功能 )
        "directories": {
            "output": "build/win"
        },
        "win": {
            "icon": path.resolve(__dirname, 'build/icon.png'),
        },
        "copyright": 'UwUmei'
    },
})
    .then(
        data => console.log(data),
        err => console.error(err)
    );
