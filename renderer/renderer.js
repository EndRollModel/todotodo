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

//modal
let addGroupBtn; // 新增群組的按鈕  (feat)
let addFeatNameInput; // 輸入名稱的input內容 (feat)
let addTuduBtn; // 新增待辦事項的按鈕 (tuduItem)
let addTuduInput; // 新增待辦事項的Input內容 (tuduItem)
let addTuduHidden; // 新增待辦事項的數值內容 (tuduItem)
let checkAddTudu; // 新增待辦事項的按鈕(於group中)
let editTuduInput; // 編輯群組或待辦input內容
let editTuduHidden; // 編輯群組或待辦的隱藏內容傳輸class用
let editNameBtn; // 編輯名稱的內容
let delItemHidden; // 刪除的對象指定內容
let delItemBtn; // 刪除的按鈕
let settingModalTitle; // 設定的modal內容

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
 * @param {boolean} obj.save save
 */
function addFeatData(obj) {
    // type, id, title, save = false
    const save = obj.save;
    if (save === false) return;
    const type = obj.type;
    const id = obj.id;
    const title = obj.title;

    const updateData = {};
    switch (type) {
        case 0: // group
            updateData.type = 0
            updateData.title = title
            updateData.id = id
            break;
        case 1: // tudu
            updateData.type = 1
            updateData.title = title;
            updateData.time = '99:99';
            updateData.id = id;
            updateData.targetId = -1;
            break;
    }
    userData.push(updateData);
}

/**
 *
 * @param {String}  obj.targetId 若指定則將此tudu放入置群組中
 * @param {String}  obj.id 此tuduitem id
 * @param {number}  obj.type 此tuduitem type 1 = 待辦
 * @param {String}  obj.title 標題
 * @param {String}  obj.time 如有記憶時間
 * @param {String}  obj.checked 是否已完成 目前僅建立需求 都會是無
 * @param {String | undefined}  obj.memo 備註 目前還不需要 但僅記錄用
 * @param {String}  obj.save 是否存檔
 */
function pushGroupData(obj) {
    // action, targetId, id, type, title, time, memo = null,checked save = false
    const save = obj.save;
    if (save === false) return;
    const targetId = obj.targetId;
    const type = obj.type;
    const id = obj.id;
    const title = obj.title;
    const time = obj.time;
    const checked = Object.hasOwn(obj, 'checked') ? obj.checked : false;

    const item = {}
    switch (type) {
        case 1:
        default:
            item.type = 1;
            item.id = id;
            item.title = title;
            item.time = time;
            item.checked = checked;
            item.targetId = targetId;
            break;
    }
    userData.push(item);
}

/**
 * 讀取資料建立畫面上元素的方法
 * @return {Promise<void>}
 */
async function createUserElem() {
    if (userData.length === 0) return;
    userData.forEach((elem) => {
        switch (elem.type) {
            case 0: // group
                addGroupItem(elem.title)
                break;
            case 1: // tuduitem
                let groupId;
                if (elem.targetId !== -1) {
                    groupId = elem.targetId.replace('itemBoxId', '');
                } else {
                    groupId = -1;
                }
                addTuduItem(groupId, elem.title, elem.id);
                break;
        }
    });
}


window.onload = async function () {
    // 讀取userData
    const loadUserData = await window.userFeat.loadUserData();
    if (loadUserData.length > 0) {
        userData.push(...loadUserData)
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
        addGroupItem(addFeatNameInput.value, true);
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
        addTuduItem(-1, addFeatNameInput.value, null, true);
        addFeatNameInput.value = ''; // 清除
        updateUserData();
        addFeatModal.hide();
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
        addTuduItem(addTuduHidden.getAttribute('boxIndex'), addTuduInput.value, null, true);
        addTuduHidden.removeAttribute('boxIndex');
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
        editItemName(editTuduHidden.getAttribute('target'), editTuduInput.value);
        // updateUserData();
        editNameModal.hide();
    })
    // 刪除 del
    delItemHidden = document.getElementById('delItemHidden')
    delItemBtn = document.getElementById('delItemBtn');
    delItemBtn.addEventListener('click', () => {
        delItem(document.getElementById('delItemHidden').getAttribute('target'));
        // updateUserData();
        delItemModal.hide();
    })
    await createUserElem();
}

function editItemName(target, text) {
    const targetItem = document.querySelector(`${target}`);
    targetItem.textContent = text;
}

function delItem(target) {
    const targetItem = document.querySelector(`${target}`);
    targetItem.remove();
}

/**
 * 建立群組用的function
 * @param title {String}  group中顯示的title
 * @param save {boolean}
 */
function addGroupItem(title = null, save = false) {
    if (title == null) {
        title = document.getElementById('addFeatName').value;
    }
    //add itemblock => item-box => tudu-g-item => collapse-switch &
    let itemIndex = 0;
    let notUse = false;
    while (!notUse) {
        if (document.querySelector(`#itemBoxId${itemIndex}`) === null) {
            notUse = true;
        } else {
            itemIndex++;
        }
    }
    // if (objectId !== null) {
    //     itemIndex = objectId.replace('itemBoxId', '');
    // }

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
        addTuduHidden.setAttribute('boxIndex', `${itemIndex}`)
        addTuduItemModel.show();
    })
    const optionsEdit = document.createElement('li');
    optionsEdit.className = 'dropdown-item';
    optionsEdit.textContent = '編輯名稱';
    optionsEdit.addEventListener('click', () => {
        document.getElementById('editTuduInput').value = groupTitle.textContent; // 把值設定上去
        document.getElementById('editTuduHidden').setAttribute('target', `.group-title-${itemIndex}`);
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
        document.getElementById('delItemHidden').setAttribute('target', `#itemBoxId${itemIndex}`)
        delItemModal.show();
    })
    // 裝下方可摺疊的區塊
    const collapseBlock = document.createElement('div');
    collapseBlock.className = `collapse collapse-block-${itemIndex}`
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
    addFeatData({
        type: 0,
        save: save,
        id: itemBox.id,
        title: groupTitle.textContent,
    });
}

/**
 * 建立TuduItem用的function
 * @param boxIndex {String | number} 如果在Group內 需傳入是在第幾個的Group內
 * @param title {String}
 * @param objectId {String}
 * @param save
 */
async function addTuduItem(boxIndex = null, title, objectId = null, save = false) {
    const checkIndex = parseInt(boxIndex)
    const isGroup = !(isNaN(checkIndex) || checkIndex === -1)

    let itemIndex = 0;
    let notUse = false;
    while (!notUse) {
        if (document.querySelector(`#tuduItemId${itemIndex}`) === null) {
            notUse = true;
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
        tuduItem.setAttribute('boxIndex', itemIndex.toString());
    }

    const tuduTitle = document.createElement('div')
    tuduTitle.textContent = title;
    tuduTitle.className = `tudu-item-title-${itemIndex}`;

    const tuduTime = document.createElement('div');
    tuduTime.className = 'tudu-item-time';
    tuduTime.style.color = 'transparent'
    tuduTime.textContent = '99:99'

    const tuduCheck = document.createElement('input');
    tuduCheck.type = 'checkbox';
    tuduCheck.className = 'tudu-item-check';
    tuduCheck.addEventListener('change', async (e) => {
        if (e.target.checked) {
            tuduTime.textContent = `${await window.timeFeat.timeFormat(Date.now())}`;
            tuduTime.style.color = 'red'
        } else {
            tuduTime.textContent = '99:99'
            tuduTime.style.color = 'transparent'
        }
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
        // new bootstrap.Modal(document.getElementById('editName')).show()
        editNameModal.show();
    })
    const optionsDel = document.createElement('li');
    optionsDel.className = 'dropdown-item';
    optionsDel.textContent = '刪除';
    optionsDel.addEventListener('click', () => {
        document.getElementById('delTitleText').textContent = `確定要刪除「${tuduTitle.textContent}」嗎？`
        document.getElementById('delItemHidden').setAttribute('target', `#tuduItemId${itemIndex}`)
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
        const collapseBlock = document.querySelector(`.collapse-block-${checkIndex}`);
        if (!collapseBlock.classList.contains('show')) {
            new bootstrap.Collapse(collapseBlock).show();
        }
        collapseBlock.appendChild(tuduItem)
        pushGroupData({
            save: save,
            targetId: `itemBoxId${checkIndex}`,
            id: tuduItem.id,
            type: 1,
            title: tuduTitle.textContent,
            time: tuduTime.textContent,
        }); // 新增在群組中tuduItem的資料
    } else {
        itemBlock[0].appendChild(tuduItem);
        addFeatData({
            save: save,
            type: 1,
            id: tuduItem.id,
            title: tuduTitle.textContent,
        }); // 新增在外部的tuduItem資料
    }
}

function updateUserData() {
    window.userFeat.saveUserData(userData);
}
