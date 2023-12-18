// 結構：
// body : {
//  .toolbar // 關閉與縮小按鈕的工具列
//  .body-block{ 最外圍整個區塊
//      .item-block{ // tuduList的項目
//          .item-box { // 群組的未來可拖曳區域
//              .tudu-g-item{ // 群組
//                  .tudu-item{ 代辦事項
//                  }
//              }
//          }
//          .tudu-s-item{ // 純粹代辦事項
//          }
//      }
//  }
// }
// group - name(string) - item(array)
// item - name(string) time(string)

let addFeatBtn;
let tuduList;
let itemBlock;

// elem
let addGroupBtn; // 新增群組的按鈕  (feat)
let addFeatNameInput; // 輸入名稱的input內容 (feat)
let addFeatMemoInput; // 輸入Memo的input內容(feat)
let addItemTypeRadios; // 輸入種類的radio
let addTuduBtn; // 新增待辦事項的按鈕 (tuduItem)
let addTypeBtn; // 新增種類的按鈕
let addTuduInput; // 新增待辦事項的Input內容 (tuduItem)
let addTuduHidden; // 新增待辦事項的數值內容 (tuduItem)
let checkAddTudu; // 新增待辦事項的按鈕(於group中)
let editTuduInput; // 編輯群組或待辦input內容
let editTuduHidden; // 編輯群組或待辦的隱藏內容傳輸class用
let editNameBtn; // 編輯名稱的內容
let delItemHidden; // 刪除的對象指定內容
let delItemBtn; // 刪除的按鈕
let settingModalTitle; // 設定的modal內容
const typeList = {
    group: 'group',
    tuduItem: 'tuduItem',
    memoItem: 'memoItem',
}

// modal
let addFeatModal; // 新增群組或是TuduItem的modal
let addTuduItemModel; // 由群組新增TuduItem的modal
let editNameModal; // 編輯名稱時用的Modal
let delItemModal; // 刪除時的跳窗

let userData = [];

/**
 * 建立群組或是待辦元件的function
 * @param {number} obj.action 0 = 'create' = 畫面建立時 , 1 = 'join' 後續加入時使用
 * @param {number} obj.type 要加入的對象type 0 = 群組  1 = 待辦
 * @param {string} obj.id  要建立的id
 * @param {string} obj.title 要建立的title
 * @param {number} obj.inSort 在列表中的排序順序
 * @param {number} obj.outSort 在列表中的排序順序
 * @param {boolean} obj.save save
 */
function addFeatData(obj) {
    // type, id, title, save = false
    const save = obj.save;
    if (save === false) return;
    const type = Object.hasOwn(obj, 'type') ? obj.type : null;
    const id = Object.hasOwn(obj, 'id') ? obj.id : null;
    const title = Object.hasOwn(obj, 'title') ? obj.title : null;
    const memoInfo = Object.hasOwn(obj, 'memoInfo') ? obj.memoInfo : null;
    const outSort = Object.hasOwn(obj, 'outSort') ? obj.outSort : null;
    const inSort = Object.hasOwn(obj, 'inSort') ? obj.inSort : null;

    const updateData = {};
    switch (type) {
        case 0: // group
            updateData.type = 0;
            updateData.title = title;
            updateData.id = id;
            updateData.outSort = outSort;
            updateData.inSort = inSort;
            break;
        case 1: // tudu
            updateData.type = 1;
            updateData.title = title;
            updateData.time = '99:99';
            updateData.id = id;
            updateData.targetId = -1;
            updateData.outSort = outSort;
            updateData.inSort = inSort;
            break;
        case 2: // memo
            updateData.type = 2;
            updateData.title = title;
            updateData.id = id;
            updateData.memoInfo = memoInfo
            updateData.outSort = outSort;
            updateData.inSort = inSort;
            break;
    }
    userData.push(updateData);
}

/**
 * 將資料放進Group中
 * @param {String}  obj.targetId 若指定則將此tudu放入置群組中
 * @param {String}  obj.id 此tuduitem id
 * @param {number}  obj.type 此tuduitem type 1 = 待辦
 * @param {String}  obj.title 標題
 * @param {String}  obj.time 如有記憶時間
 * @param {String}  obj.checked 是否已完成 目前僅建立需求 都會是無
 * @param {String}  obj.inSort 在列表中 如果於群組中就是群組中的index
 * @param {String}  obj.outSort 在列表中 如果是最外層的順序就是index
 * @param {String | undefined}  obj.memo 備註 目前還不需要 但僅記錄用
 * @param {String}  obj.save 是否存檔
 */
function pushGroupData(obj) {
    // action, targetId, id, type, title, time, memo = null,checked save = false
    const save = obj.save;
    if (save === false) return;
    const targetId = Object.hasOwn(obj, 'targetId') ? obj.targetId : 'null';
    const type = Object.hasOwn(obj, 'type') ? obj.type : 'null';
    const id = Object.hasOwn(obj, 'id') ? obj.id : 'null';
    const title = Object.hasOwn(obj, 'title') ? obj.title : 'null';
    const time = Object.hasOwn(obj, 'time') ? obj.time : 'null';
    const checked = Object.hasOwn(obj, 'checked') ? obj.checked : false;
    const memoInfo = Object.hasOwn(obj, 'memoInfo') ? obj.outSort : 'null';
    const inSort = Object.hasOwn(obj, 'inSort') ? obj.inSort : 'null';
    const outSort = Object.hasOwn(obj, 'outSort') ? obj.outSort : 'null';

    const item = {}
    switch (type) {
        case 1:
            item.type = 1;
            item.id = id;
            item.title = title;
            item.time = time;
            item.checked = checked;
            item.targetId = targetId;
            item.inSort = inSort;
            item.outSort = outSort;
            break;
        case 2:
            item.type = 2;
            item.id = id;
            item.title = title;
            item.memoInfo = memoInfo;
            item.targetId = targetId;
            item.outSort = outSort;
            item.inSort = inSort;
            break;
        default:
            break
    }
    userData.push(item);
}

/**
 * 讀取資料建立畫面上元素的方法
 * @return {Promise<void>}
 */
async function createUserElem() {
    if (userData.length === 0) return;
    userData
        .filter(e => e.outSort !== -1)
        .sort((a, b) => a.outSort - b.outSort)
        .forEach((data) => {
            switch (data.type) {
                case 0:
                    addGroupItem(data.title, data.id);
                    break;
                case 1:
                    addTuduItem(-1, data.title, data.id, data.checked, data.time);
                    break;
                case 2:
                    addMemoItem(-1, data.id, data.title, data.memo)
                    break;
            }
        })
    userData
        .filter(e => e.inSort !== -1)
        .sort((a, b) => a.inSort - b.inSort)
        .forEach((data) => {
            switch (data.type) {
                case 1:
                    addTuduItem(data.targetId, data.title, data.id, data.checked, data.time);
                    break;
                case 2:
                    addMemoItem(data.targetId, data.id, data.title, data.memo)
                    break;
            }
        })
}

document.addEventListener('DOMContentLoaded', async function () {
    // 讀取userData
    const loadUserData = await window.userFeat.loadUserData();
    if (loadUserData.length > 0) {
        const sortData = resetData(loadUserData)
        userData.push(...sortData)
    }
    // modal
    addFeatModal = new bootstrap.Modal(document.getElementById('addFeatModal'));
    addTuduItemModel = new bootstrap.Modal(document.getElementById('addTuduItem'));
    editNameModal = new bootstrap.Modal(document.getElementById('editName'));
    delItemModal = new bootstrap.Modal(document.getElementById('delItemModal'));

    addFeatBtn = document.getElementById('addFeatBtn');
    tuduList = document.getElementById('tudulist');
    itemBlock = document.getElementsByClassName('item-block');

    // 由最外層按下的按鈕新增的事件
    // modal 新增群組按鈕
    addGroupBtn = document.getElementById('addGroupBtn');
    addFeatNameInput = document.getElementById('addFeatNameInput')
    addGroupBtn.addEventListener('click', () => {
        if (addFeatNameInput.value.trim() === '') {
            addFeatNameInput.placeholder = '內容不能為空白'
            return;
        }
        addGroupItem(addFeatNameInput.value, null, true);
        addFeatNameInput.value = ''; // 清除
        updateUserData();
        addFeatModal.hide();
    });
    // modal tudu新增按鈕
    addTuduBtn = document.getElementById('addTuduBtn');
    addTuduBtn.addEventListener('click', () => {
        if (addFeatNameInput.value.trim() === '') {
            addFeatNameInput.placeholder = '內容不能為空白'
            return;
        }
        addTuduItem(-1, addFeatNameInput.value, null, false, null, true);
        addFeatNameInput.value = ''; // 清除
        updateUserData();
        addFeatModal.hide();
    })
    // modal 新增按鈕(改為radio選擇)
    addFeatMemoInput = document.getElementById('addFeatMemoInput');
    addFeatMemoInput.style.display = 'none';
    addItemTypeRadios = document.querySelectorAll('input[name="addItemTypeRadio"]');
    addItemTypeRadios.forEach(function (radio) {
        radio.addEventListener('change', () => {
            console.log(radio.value);
            switch (radio.value) {
                case typeList.group:
                    addFeatMemoInput.style.display = 'none';
                    break;
                case typeList.tuduItem:
                    addFeatMemoInput.style.display = 'none';
                    break;
                case typeList.memoItem:
                    addFeatMemoInput.style.display = 'flex';
                    break;
            }
        })
    })
    addTypeBtn = document.getElementById('addTypeBtn');
    addTypeBtn.addEventListener('click', () => {
        addItemTypeRadios.forEach(function (radio) {
            if (radio.checked) {
                switch (radio.value) {
                    case typeList.group:
                        if (addFeatNameInput.value.trim() === '') {
                            addFeatNameInput.placeholder = '內容不能為空白'
                            return;
                        }
                        addGroupItem(addFeatNameInput.value, null, true);
                        addFeatNameInput.value = ''; // 清除
                        break;
                    case typeList.tuduItem:
                        if (addFeatNameInput.value.trim() === '') {
                            addFeatNameInput.placeholder = '內容不能為空白'
                            return;
                        }
                        addTuduItem(-1, addFeatNameInput.value, null, false, null, true);
                        addFeatNameInput.value = ''; // 清除
                        break;
                    case typeList.memoItem:
                        if (addFeatNameInput.value.trim() === '') {
                            addFeatNameInput.placeholder = '內容不能為空白'
                            return;
                        }
                        if (addFeatMemoInput.value.trim() === '') {
                            addFeatMemoInput.placeholder = '內容不能為空白'
                            return;
                        }
                        addMemoItem(-1, null, addFeatNameInput.value, addFeatMemoInput.value, true);
                        addFeatNameInput.value = ''; // 清除
                        break;
                }
            }
            updateUserData();
            addFeatModal.hide();
        })
    })

    // 由群組新增按鈕事件
    // 新增 tudu
    addTuduInput = document.getElementById('addTuduInput')
    addTuduHidden = document.getElementById('addTuduHidden');
    checkAddTudu = document.getElementById('checkAddTudu');
    checkAddTudu.addEventListener('click', () => {
        if (addTuduInput.value.trim() === '') {
            addTuduInput.placeholder = '內容不能為空白'
            return;
        }
        addTuduItem(addTuduHidden.getAttribute('boxId'), addTuduInput.value, null, false, null, true);
        addTuduInput.value = ''; // 清除
        updateUserData();
        addTuduItemModel.hide();
    })

    // 編輯名稱 edit
    editTuduInput = document.getElementById('editTuduInput');
    editTuduHidden = document.getElementById('editTuduHidden');
    editNameBtn = document.getElementById('editNameBtn');
    editNameBtn.addEventListener('click', () => {
        if (editTuduInput.value.trim() === '') {
            editTuduInput.placeholder = '內容不能為空白'
            return;
        }
        editItemName(editTuduHidden.getAttribute('target'), editTuduHidden.getAttribute('parentItem'), editTuduInput.value);
        editNameModal.hide();
    })
    // 刪除 del
    delItemHidden = document.getElementById('delItemHidden')
    delItemBtn = document.getElementById('delItemBtn');
    delItemBtn.addEventListener('click', () => {
        delItem(document.getElementById('delItemHidden').getAttribute('target'));
        delItemModal.hide();
    })
    await createUserElem();
    // 拖曳元件
    // group不能放入group內
    // tuduItem可以放到group內或是拉到itemBlock中
    creatSortable(itemBlock[0], 'itemBlock', 'itemBlock');
})

function creatSortable(obj, groupName, block, option) {
    new Sortable(obj, {
        group: groupName,
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        onMove: function (evt, originalEvent) {
            // Example: https://jsbin.com/nawahef/edit?js,output
            if (evt.dragged.classList.contains('item-box') &&
                evt.related.parentElement.classList.contains('collapse')) {
                // group不可被放入至group中
                return false;
            }
        },
        onEnd: function (evt) {
            // var itemEl = evt.item;  // dragged HTMLElement
            // console.log('move end : ', itemEl)
            // console.log(evt.item.className);
            // console.log(`pos : feat`)
            // var itemEl = evt.item;  // dragged HTMLElement
            // console.log(evt.item);
            if (evt.from.className !== evt.to.className) {
                // 跨class移動 不存在有沒有移動Index的問題 一律有移動
                if (evt.to.className === 'item-block') {
                    // 內層至外層
                    console.log(`內到外 evt.from.className`)
                    console.log(evt.from.className)
                    const fromClass = evt.from.className.replace(/ /g, '.')
                    Object.values(document.querySelector(`.${fromClass}`).children).forEach((elem, index) => {
                        // from : collapse : inSort
                        const dataIndex = userData.findIndex(e => e.id === elem.id)
                        userData[dataIndex].inSort = index;
                        userData[dataIndex].outSort = -1;
                    })
                    Object.values(document.querySelector(`.item-block`).children).forEach((elem, index) => {
                        // to : item-block : outSort
                        const dataIndex = userData.findIndex(e => e.id === elem.id)
                        userData[dataIndex].outSort = index;
                        userData[dataIndex].inSort = -1;
                        if (userData[dataIndex].targetId !== -1) {
                            // 拉出去的物件會有targetId 所以清空
                            userData[dataIndex].targetId = -1
                        }
                    })
                } else {
                    // 外層至內層
                    console.log(`外到內 evt.from.className`)
                    console.log(evt.from.className)
                    Object.values(document.querySelector(`.item-block`).children).forEach((elem, index) => {
                        // from : item-block : outSort
                        const dataIndex = userData.findIndex(e => e.id === elem.id)
                        userData[dataIndex].outSort = index;
                        userData[dataIndex].inSort = -1;
                    })
                    const fromClass = evt.to.className.replace(/ /g, '.')
                    Object.values(document.querySelector(`.${fromClass}`).children).forEach((elem, index) => {
                        // to : collapse : inSort
                        const dataIndex = userData.findIndex(e => e.id === elem.id)
                        userData[dataIndex].inSort = index
                        userData[dataIndex].outSort = -1
                        if (userData[dataIndex].targetId === -1) {
                            // 拉進來的物件會沒有collapse的容器id 所以要補上id給他
                            const match = evt.to.className.match(/collapse-block-(\d+)/);
                            const number = match ? match[1] : null;
                            userData[dataIndex].targetId = `itemBoxId${number}`
                        }
                    })
                }
                updateUserData();
            } else {
                // 同一個class內移動
                if (evt.oldIndex !== evt.newIndex) {
                    // 不同一個index表示有移動 需要紀錄否則不用
                    switch (true) {
                        case evt.to.className === 'item-block':
                            // 所有網頁的位置元素直接記錄下來
                            Object.values(document.querySelector('.item-block').children).forEach((elem, index) => {
                                const dataIndex = userData.findIndex(e => e.id === elem.id)
                                userData[dataIndex].outSort = index;
                            })
                            break;
                        case evt.to.classList.contains('collapse'):
                            const className = evt.to.className.replace(/ /g, '.')
                            Object.values(document.querySelector(`.${className}`).children).forEach((elem, index) => {
                                const dataIndex = userData.findIndex(e => e.id === elem.id);
                                userData[dataIndex].inSort = index
                            })
                            break;
                    }
                    updateUserData();
                }
            }
        },
    })
}

/**
 * 選項被勾選
 * @param targetId
 * @param checked
 * @param time
 */
function updateItemChecked(targetId, checked, time) {
    const targetIndex = userData.findIndex(e => e.id === targetId);
    userData[targetIndex].checked = checked;
    userData[targetIndex].time = time;
    updateUserData();
}

/**
 * 編輯物件的名稱
 * @param target
 * @param parent
 * @param text
 */
function editItemName(target, parent, text) {
    const targetItem = document.querySelector(`${target}`);
    targetItem.textContent = text;
    const itemIndex = userData.findIndex(e => e.id === parent.replace(/[#.]/g, ''));
    userData[itemIndex].title = text;
    updateUserData();
}

/**
 * 刪除物件
 * @param target 刪除的對象
 */
function delItem(target) {
    const targetItem = document.querySelector(`${target}`);
    // 刪掉之前先檢查是在哪個區塊 讓區塊重新整理
    if (targetItem.parentElement.className === 'item-block') {
        // 重新整理外部的index
        Object.values(document.querySelector(`.item-block`).children).forEach((elem, index) => {
            // item-block : outSort
            const dataIndex = userData.findIndex(e => e.id === elem.id)
            userData[dataIndex].outSort = index;
            userData[dataIndex].inSort = -1;
        })
    } else {
        // 內層結構
        const fromClass = evt.to.className.replace(/ /g, '.')
        Object.values(document.querySelector(`.${fromClass}`).children).forEach((elem, index) => {
            // collapse : inSort
            const dataIndex = userData.findIndex(e => e.id === elem.id)
            userData[dataIndex].inSort = index
            userData[dataIndex].outSort = -1
        })
    }
    targetItem.remove();
    const itemIndex = userData.findIndex(e => e.id === target.replace(/[#.]/g, ''))
    userData.splice(itemIndex, 1);
    updateUserData();
}

/**
 * 建立群組用的function
 * @param title {String}  group中顯示的title
 * @param id {String} 如果有id 就依照id建立
 * @param save {boolean} 是否存檔
 */
function addGroupItem(title = null, id = null, save = false) {
    if (title == null) {
        title = document.getElementById('addFeatName').value;
    }
    //add itemblock => item-box => tudu-g-item => collapse-switch &
    let itemIndex = 0;
    let notUse = false;
    while (!notUse) {
        if (document.querySelector(`#itemBoxId${itemIndex}`) === null) {
            const checkNoUse = userData.findIndex(e => e.id === `itemBoxId${itemIndex}`) === -1
            if (checkNoUse) {
                notUse = true
            } else {
                itemIndex++;
            }
        } else {
            itemIndex++;
        }
    }
    if (id != null) {
        itemIndex = parseInt(id.replace('itemBoxId', ''))
    }

    // 最外圍的itemBox
    const itemBox = document.createElement('div');
    itemBox.className = `item-box`;
    itemBox.id = `itemBoxId${itemIndex}`
    // 內圈groupItem
    const groupItem = document.createElement('div');
    groupItem.className = 'tudu-g-item';
    // 展開的圖標區塊
    const collapseSwitchBox = document.createElement('div');
    collapseSwitchBox.className = 'collapse-switch-box';
    const collapseSwitch = document.createElement('img');
    collapseSwitch.src = './resource/img/chevron-right.svg';
    collapseSwitch.setAttribute('data-bs-toggle', 'collapse');
    collapseSwitch.setAttribute('data-bs-target', `.collapse-block-${itemIndex}`);
    collapseSwitch.setAttribute('aria-expanded', `true`);
    // 文字區
    const groupTitle = document.createElement('div');
    groupTitle.className = `tudu-g-title group-title-${itemIndex}`;
    groupTitle.textContent = title;
    // 選項內容
    const groupOption = document.createElement('div');
    groupOption.className = 'tudu-g-option';
    // 選項的圖片
    const optionImg = document.createElement('img');
    optionImg.className = 'tudu-item-option dropdown-toggle'
    optionImg.src = './resource/img/list.svg';
    optionImg.setAttribute('data-bs-toggle', 'dropdown')
    optionImg.setAttribute('data-bs-auto-close', 'true')
    optionImg.setAttribute('aria-expanded', 'false')
    // 選項的內容
    const optionsBlock = document.createElement('ul');
    optionsBlock.className = 'dropdown-menu';
    optionsBlock.setAttribute('aria-labelledby', 'defaultDropdown');
    const optionsAdd = document.createElement('li');
    optionsAdd.className = 'dropdown-item';
    optionsAdd.textContent = '新增';
    optionsAdd.addEventListener('click', () => {
        // addTuduHidden.setAttribute('boxIndex', `${itemIndex}`)
        addTuduHidden.setAttribute('boxId', itemBox.id)
        addTuduItemModel.show();
    })
    const optionsEdit = document.createElement('li');
    optionsEdit.className = 'dropdown-item';
    optionsEdit.textContent = '編輯名稱';
    optionsEdit.addEventListener('click', () => {
        document.getElementById('editTuduInput').value = groupTitle.textContent; // 把值設定上去
        document.getElementById('editTuduHidden').setAttribute('target', `.group-title-${itemIndex}`);
        document.getElementById('editTuduHidden').setAttribute('parentItem', `#${itemBox.id}`);
        // new bootstrap.Modal(document.getElementById('editName')).show()
        editNameModal.show();
    })
    const optionsSetting = document.createElement('li');
    optionsSetting.className = 'dropdown-item';
    optionsSetting.textContent = '設定';
    optionsSetting.addEventListener('click', () => {
    })
    const optionsDel = document.createElement('li');
    optionsDel.className = 'dropdown-item';
    optionsDel.textContent = '刪除';
    optionsDel.addEventListener('click', () => {
        document.getElementById('delTitleText').textContent = `確定要刪除「${groupTitle.textContent}」嗎？`
        document.getElementById('delItemHidden').setAttribute('target', `#${itemBox.id}`)
        delItemModal.show();
    })
    // 裝下方可摺疊的區塊
    const collapseBlock = document.createElement('div');
    collapseBlock.className = `collapse`;
    collapseBlock.classList.add(`collapse-block-${itemIndex}`);
    collapseBlock.addEventListener('show.bs.collapse', () => {
        collapseSwitchBox.classList.add('rotated-show');
        collapseSwitchBox.classList.remove('rotated-hide');
    });
    collapseBlock.addEventListener('hide.bs.collapse', () => {
        collapseSwitchBox.classList.add('rotated-hide');
        collapseSwitchBox.classList.remove('rotated-show');
    });

    // 將三個option先新增至選項內內
    optionsBlock.appendChild(optionsAdd);
    optionsBlock.appendChild(optionsEdit);
    // optionsBlock.appendChild(optionsSetting); 暫時還不需要這個
    optionsBlock.appendChild(optionsDel);
    groupOption.appendChild(optionsBlock);
    groupOption.appendChild(optionImg);
    //
    collapseSwitchBox.appendChild(collapseSwitch)
    // 添加捲軸 標題 更多按鈕
    groupItem.appendChild(collapseSwitchBox);
    groupItem.appendChild(groupTitle);
    groupItem.appendChild(groupOption);
    // 添加進box
    itemBox.appendChild(groupItem);
    itemBox.appendChild(collapseBlock);
    itemBlock[0].appendChild(itemBox);

    const outSortIndex = itemBlock[0].childElementCount - 1;
    addFeatData({
        type: 0,
        save: save,
        id: itemBox.id,
        title: groupTitle.textContent,
        outSort: outSortIndex,
        inSort: -1,
    });
    creatSortable(collapseBlock, 'itemBlock', 'collapse')
}


/**
 * 建立TuduItem用的function
 * @param boxId {String | number} 如果在Group內 需傳入是在第幾個的Group內
 * @param title {String} title
 * @param objectId {String} 如果有id就依照此id建立
 * @param checked {boolean} 是否勾選
 * @param time {String} 是否有指定過時間
 * @param save {boolean} 是否要存檔
 */
async function addTuduItem(boxId = null, title, objectId = null, checked = false, time = '99:99', save = false) {
    let isGroup = (typeof boxId === 'string')

    let itemIndex = 0;
    let notUse = false;
    while (!notUse) {
        if (document.querySelector(`#tuduItemId${itemIndex}`) === null) {
            const checkNoUsed = userData.findIndex(e => e.id === `tuduItemId${itemIndex}`) === -1;
            if (checkNoUsed) {
                itemIndex++;
            } else {
                notUse = true;
            }
        } else {
            itemIndex++;
        }
    }

    if (objectId !== null) {
        itemIndex = objectId.replace('tuduItemId', '');
    }

    const tuduItem = document.createElement('div');
    tuduItem.className = `tudu-item`;
    tuduItem.id = `tuduItemId${itemIndex}`
    if (isGroup) {
        // tuduItem.setAttribute('boxIndex', itemIndex.toString());
        tuduItem.setAttribute('boxId', boxId);
    }

    const tuduTitle = document.createElement('div')
    tuduTitle.textContent = title;
    tuduTitle.className = `tudu-item-title-${itemIndex}`;
    tuduTitle.id = `tudu-item-title-${itemIndex}`;

    const tuduTime = document.createElement('div');
    tuduTime.className = 'tudu-item-time';
    if (time === '99:99' || time == null) {
        tuduTime.style.color = 'transparent'
        tuduTime.textContent = '99:99'
    } else {
        tuduTime.style.color = 'red'
        tuduTime.textContent = time;
    }

    const tuduCheck = document.createElement('input');
    tuduCheck.type = 'checkbox';
    tuduCheck.className = 'tudu-item-check';
    if (checked) {
        tuduCheck.checked = true
    }
    tuduCheck.addEventListener('change', async (e) => {
        if (e.target.checked) {
            tuduTime.textContent = `${await window.timeFeat.timeFormat(Date.now())}`;
            tuduTime.style.color = 'red'
        } else {
            tuduTime.textContent = '99:99'
            tuduTime.style.color = 'transparent'
        }
        updateItemChecked(tuduItem.id, e.target.checked, tuduTime.textContent);
    })

    const tuduItemOption = document.createElement('div');
    tuduItemOption.className = 'tudu-item-option';
    const optionImg = document.createElement('img');
    optionImg.src = './resource/img/list.svg';
    optionImg.setAttribute('data-bs-toggle', 'dropdown')
    optionImg.setAttribute('data-bs-auto-close', 'true')
    optionImg.setAttribute('aria-expanded', 'false')
    const optionsBlock = document.createElement('ul');
    optionsBlock.className = 'dropdown-menu';
    optionsBlock.setAttribute('aria-labelledby', 'defaultDropdown');
    const optionsEdit = document.createElement('li');
    optionsEdit.className = 'dropdown-item';
    optionsEdit.textContent = '編輯名稱';
    optionsEdit.addEventListener('click', () => {
        document.getElementById('editTuduInput').value = tuduTitle.textContent; // 把值設定上去
        document.getElementById('editTuduHidden').setAttribute('target', `.tudu-item-title-${itemIndex}`);
        document.getElementById('editTuduHidden').setAttribute('parentItem', `#${tuduItem.id}`);
        // new bootstrap.Modal(document.getElementById('editName')).show()
        editNameModal.show();
    })
    const optionsDel = document.createElement('li');
    optionsDel.className = 'dropdown-item';
    optionsDel.textContent = '刪除';
    optionsDel.addEventListener('click', () => {
        document.getElementById('delTitleText').textContent = `確定要刪除「${tuduTitle.textContent}」嗎？`
        // document.getElementById('delItemHidden').setAttribute('target', `#tuduItemId${itemIndex}`)
        document.getElementById('delItemHidden').setAttribute('target', `#${tuduItem.id}`)
        delItemModal.show();
    })

    // 加入區塊
    optionsBlock.appendChild(optionsEdit);
    optionsBlock.appendChild(optionsDel);
    tuduItemOption.appendChild(optionsBlock);
    tuduItemOption.appendChild(optionImg);

    // 追加項目內的東西
    tuduItem.appendChild(tuduCheck);
    tuduItem.appendChild(tuduTitle);
    tuduItem.appendChild(tuduTime);
    tuduItem.appendChild(tuduItemOption);

    if (isGroup) {
        const boxIndex = boxId.replace(/itemBoxId/g, '')
        const collapseBlock = document.querySelector(`.collapse-block-${boxIndex}`)
        if (!collapseBlock.classList.contains('show')) {
            new bootstrap.Collapse(collapseBlock).show();
        }
        collapseBlock.appendChild(tuduItem)
        const inSortIndex = collapseBlock.children.length - 1
        pushGroupData({
            save: save,
            targetId: boxId,
            id: tuduItem.id,
            type: 1,
            title: tuduTitle.textContent,
            time: tuduTime.textContent,
            inSort: inSortIndex,
            outSort: -1,
        }); // 新增在群組中tuduItem的資料
    } else {
        itemBlock[0].appendChild(tuduItem);
        const outSortIndex = itemBlock[0].childElementCount - 1;
        addFeatData({
            save: save,
            type: 1,
            id: tuduItem.id,
            title: tuduTitle.textContent,
            outSort: outSortIndex,
            inSort: -1,
        }); // 新增在外部的tuduItem資料
    }
}

/**
 * memo的item
 * @param boxId {String | number} 如果在Group內 需傳入是在第幾個的Group內
 * @param title {String} title
 * @param objectId {String} 如果有id就依照此id建立
 * @param memo {String} 需要複製的對象
 * @param save {boolean} 是否要存檔
 */
async function addMemoItem(boxId = null, objectId = null, title, memo = null, save = false) {
    let isGroup = (typeof boxId === 'string')
    let memoIdName = `memoItemId`

    let itemIndex = 0;
    let notUse = false;
    while (!notUse) {
        if (document.querySelector(`#${memoIdName}${itemIndex}`) === null) {
            const checkNoUsed = userData.findIndex(e => e.id === `${memoIdName}${itemIndex}`) === -1;
            if (checkNoUsed) {
                itemIndex++;
            } else {
                notUse = true;
            }
        } else {
            itemIndex++;
        }
    }

    if (objectId !== null) {
        itemIndex = objectId.replace(memoIdName, '');
    }

    const memoItem = document.createElement('div');
    memoItem.className = `memo-item`;
    memoItem.id = `${memoIdName}${itemIndex}`
    if (isGroup) {
        // tuduItem.setAttribute('boxIndex', itemIndex.toString());
        memoItem.setAttribute('boxId', boxId);
    }

    const memoTitle = document.createElement('div')
    memoTitle.textContent = title;
    memoTitle.className = `memo-item-title-${itemIndex}`;
    memoTitle.id = `memo-item-title-${itemIndex}`;

    const memoInfo = document.createElement('div');
    memoInfo.style.display = 'none';
    memoInfo.setAttribute('memoInfo', memo);

    const memoItemOption = document.createElement('div');
    memoItemOption.className = 'memo-item-option';
    const optionImg = document.createElement('img');
    optionImg.src = './resource/img/list.svg';
    optionImg.setAttribute('data-bs-toggle', 'dropdown')
    optionImg.setAttribute('data-bs-auto-close', 'true')
    optionImg.setAttribute('aria-expanded', 'false')
    const optionsBlock = document.createElement('ul');
    optionsBlock.className = 'dropdown-menu';
    optionsBlock.setAttribute('aria-labelledby', 'defaultDropdown');
    const optionsEdit = document.createElement('li');
    optionsEdit.className = 'dropdown-item';
    optionsEdit.textContent = '編輯內容';
    optionsEdit.addEventListener('click', () => {
        document.getElementById('editMemoInput').value = memoTitle.textContent; // 把值設定上去
        document.getElementById('editMemoInfoInput').value = memoTitle.textContent; // 把值設定上去
        document.getElementById('editMemoHidden').setAttribute('target', `.memo-item-title-${itemIndex}`);
        document.getElementById('editMemoHidden').setAttribute('parentItem', `#${memoItem.id}`);
        // new bootstrap.Modal(document.getElementById('editName')).show()
        editNameModal.show();
    })
    const optionsDel = document.createElement('li');
    optionsDel.className = 'dropdown-item';
    optionsDel.textContent = '刪除';
    optionsDel.addEventListener('click', () => {
        document.getElementById('delTitleText').textContent = `確定要刪除「${memoTitle.textContent}」嗎？`
        document.getElementById('delItemHidden').setAttribute('target', `#${memoItem.id}`)
        delItemModal.show();
    })

    // 加入區塊
    optionsBlock.appendChild(optionsEdit);
    optionsBlock.appendChild(optionsDel);
    memoItemOption.appendChild(optionsBlock);
    memoItemOption.appendChild(optionImg);

    // 追加項目內的東西
    memoItem.appendChild(memoTitle);
    memoItem.appendChild(memoItemOption);

    if (isGroup) {
        const boxIndex = boxId.replace(/itemBoxId/g, '')
        const collapseBlock = document.querySelector(`.collapse-block-${boxIndex}`)
        if (!collapseBlock.classList.contains('show')) {
            new bootstrap.Collapse(collapseBlock).show();
        }
        collapseBlock.appendChild(memoItem)
        const inSortIndex = collapseBlock.children.length - 1
        pushGroupData({
            save: save,
            targetId: boxId,
            id: memoItem.id,
            type: 2,
            title: memoTitle.textContent,
            memo: memoInfo.textContent,
            inSort: inSortIndex,
            outSort: -1,
        }); // 新增在群組中tuduItem的資料
    } else {
        itemBlock[0].appendChild(memoItem);
        const outSortIndex = itemBlock[0].childElementCount - 1;
        addFeatData({
            save: save,
            type: 2,
            id: memoItem.id,
            title: memoTitle.textContent,
            outSort: outSortIndex,
            inSort: -1,
        }); // 新增在外部的tuduItem資料
    }
}

/**
 * 儲存資料一次
 */
function updateUserData() {
    window.userFeat.saveUserData(userData);
}

/**
 * 此方法僅對應0.1.3.7版本以前的資料
 * 需要加上排列順序
 * @param {array}data
 */
function resetData(data) {
    let checkIsReset = data.some(e => Object.hasOwn(e, 'outSort') || Object.hasOwn(e, 'inSort'))
    if (checkIsReset === true) return data;
    let groupList = []; // 整理所有的列表
    let outSortIndex = 0; //
    data.forEach((elem, i) => {
        switch (elem.type) {
            case 0:
                // 如果是群組 將id加入群組 並且增加外部index
                data[i].outSort = outSortIndex;
                data[i].inSort = -1;
                groupList.push({id: elem.id, count: 0});
                outSortIndex++;
                break;
            case 1:
                if (elem.targetId === -1) {
                    data[i].outSort = outSortIndex
                    data[i].inSort = -1
                    outSortIndex++;
                } else {
                    const groupIndex = groupList.findIndex((e) => e.id === elem.targetId);
                    data[i].inSort = groupList[groupIndex].count;
                    data[i].outSort = -1;
                    groupList[groupIndex].count++;
                }
                break;
        }
    })
    window.userFeat.saveUserData(data); //更新資料後直接儲存一次
    return data;
}
