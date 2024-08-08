const versionRecord = {
    '0.1.5-pre-alpha':{
        state : 'pre-alpha',
        date : '2024/07/31',
        info : '分頁功能初版完成\n0.1.3.7版以前的資料兼容版本移除(僅0.1.4以後的版本資料兼容)',
        resource : 'Logo:<br/>' +
            '<a target="_blank" rel="noopener noreferrer" href="https://www.plurk.com/m/zeyami">Tibbar♦</a></br>'+
            '</br>字體:</br>' +
            '<a href="https://github.com/ACh-K/Cubic-11" target="_blank" rel="noopener noreferrer">俐方體11號</a></br>' +
            '<a href="https://github.com/max32002/naikaifont" target="_blank" rel="noopener noreferrer" >內海字體</a></br>' +
            '<a href="https://fonts.google.com/noto/specimen/Noto+Sans+TC" target="_blank" rel="noopener noreferrer">思源黑體</a></br></br>' +
            '還有 親愛的使用者❤️',
        special: 'You',
    },
    '0.1.4':{
        state : 'release',
        date : '2024/06/30',
        info : '更新Logo(繪師：<a target="_blank" rel="noopener noreferrer" href="https://www.plurk.com/m/zeyami">Tibbar♦</a>)</br>' +
            '剪貼簿右鍵複製功能</br>' +
            '部分文字敘述修正</br>' +
            '拖曳方式更改</br>' +
            '主題的顏色選擇</br>' +
            '修正功能與流程的操作錯誤',
        resource : 'Logo:<br/>' +
            '<a target="_blank" rel="noopener noreferrer" href="https://www.plurk.com/m/zeyami">Tibbar♦</a></br>'+
            '</br>字體:</br>' +
            '<a href="https://github.com/ACh-K/Cubic-11" target="_blank" rel="noopener noreferrer">俐方體11號</a></br>' +
            '<a href="https://github.com/max32002/naikaifont" target="_blank" rel="noopener noreferrer" >內海字體</a></br>' +
            '<a href="https://fonts.google.com/noto/specimen/Noto+Sans+TC" target="_blank" rel="noopener noreferrer">思源黑體</a></br></br>' +
            '還有 親愛的使用者❤️',
        special: 'You',
    },
    '0.1.4-beta.4':{
        state : 'beta',
        date : '2024/01/17',
        info : '修復了剪貼簿無法右鍵使用的錯誤\n',
    },
    '0.1.4-beta.3':{
        state: 'beta',
        date: '2024/01/14',
        info: '修正部分的文字敘述\r修改拖曳的方式\r更換了icon',
    },
    '0.1.4-beta.2':{
        state: 'beta',
        date: '2024/01/11',
        info: '將使用者的資料做加密處理\r頁面上的細節調整\r主題選擇功能微調',
    },
    '0.1.4-beta.1':{
      state: 'beta',
      date: '2024/01/09',
      info: '修復了群組內無法正常建立子項目的錯誤\r修改了memo的名稱為剪貼簿\r新增了主題顏色選擇功能\r後續的版號將正規化',
    },
    '0.1.3.8':{
        state: 'beta',
        date: '2023/12/19',
        info: '新增了一種新的MEMO類別, 修正了0.1.3.7的拖曳後如果刪除物件會錯誤的問題, 修正了一個字體會無法正確選擇的錯誤',
    },
    '0.1.3.7':{
      state: 'beta',
      date: '2023/12/16',
      info: '新增拖曳功能 修正產生物件時的順序可能會錯誤的問題',
    },
    "0.1.3.6":{
        state: 'beta',
        date : "2023/12/5",
        info : "修改齒輪點擊模式 將設定分開為多個功能「字型設定, 取消全部已選擇, 關於程式」 新增置頂功能"
    },
    "0.1.3.5":{
        state: 'beta',
        date : "2023/12/1",
        info : "修正顯示後 若有刪除項目後重啟存檔會讀取錯亂造成改名或是刪除會錯誤的問題 修正了開啟讀取圖片會無法正常顯示 看起來很卡的錯誤"
    }
}

module.exports = versionRecord;
