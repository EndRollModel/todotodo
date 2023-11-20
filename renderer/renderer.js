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

let addFeatBtn;
let todoList;
let itemBlock;

//modal
let addGroupBtn; // 新增群組的按鈕  (feat)
let addFeatNameInput; // 輸入名稱的input內容 (feat)
let addTuduBtn; // 新增待辦事項的按鈕 (tuduItem)
let addTuduInput; // 新增待辦事項的Input內容 (tuduItem)
let addTuduHidden; // 新增待辦事項的數值內容 (tuduItem)
let checkAddTudu; // 新增待辦事項的按鈕(於group中)
let editTuduInput; // 編輯群組或待辦input內容
let editeTuduHidden; // 編輯群組或待辦的隱藏內容傳輸class用
let editNameBtn; // 編輯名稱的內容
let delItemHidden; // 刪除的對象指定內容
let delItemBtn; // 刪除的按鈕
let settingModalTitle; //
let checkSettingBtn; // 確認設定的內容

// modal
let addFeatModal;
let addTuduItemModel;
let editNameModal;
let delItemModal;

const userData = {}

function createPage() {

}

window.onload = async function () {
    // modal
    addFeatModal = new bootstrap.Modal(document.getElementById('addFeatModal'));
    // addFeatModal.hide();
    addTuduItemModel = new bootstrap.Modal(document.getElementById('addTuduItem'));
    // addTuduItemModel.hide();
    editNameModal = new bootstrap.Modal(document.getElementById('editName'));
    // editNameModal.hide();
    delItemModal = new bootstrap.Modal(document.getElementById('delItemModal'));
    // delItemModal.hide();

    addFeatBtn = document.getElementById('addFeatBtn');
    todoList = document.getElementById('tudulist');
    itemBlock = document.getElementsByClassName('item-block');

    // 由最外層按下的按鈕新增的事件
    // modal 新增群組按鈕
    addGroupBtn = document.getElementById('addGroupBtn');
    addFeatNameInput = document.getElementById('addFeatNameInput')
    addGroupBtn.addEventListener('click', () => {
        addGroupItem(addFeatNameInput.value);
        addFeatNameInput.value = ''; // 清除
        addFeatModal.hide();
    });
    // modal tudu新增按鈕
    addTuduBtn = document.getElementById('addTuduBtn');
    addTuduBtn.addEventListener('click', () => {
        addTuduItem(-1, addFeatNameInput.value);
        addFeatNameInput.value = ''; // 清除
        addFeatModal.hide();
    })

    // 由群組新增按鈕事件
    // 新增 tudu
    addTuduInput = document.getElementById('addTuduInput')
    addTuduHidden = document.getElementById('addTuduHidden');
    checkAddTudu = document.getElementById('checkAddTudu');
    checkAddTudu.addEventListener('click', () => {
        addTuduItem(addTuduHidden.getAttribute('boxIndex'), addTuduInput.value);
        addTuduHidden.removeAttribute('boxIndex');
        addTuduInput.value = ''; // 清除
        addTuduItemModel.hide();
    })
    // 編輯名稱 edit
    editTuduInput = document.getElementById('editTuduInput');
    editeTuduHidden = document.getElementById('editeTuduHidden');
    editNameBtn = document.getElementById('editNameBtn');
    editNameBtn.addEventListener('click', () => {
        editItemName(editeTuduHidden.getAttribute('target'), editTuduInput.value)
        editNameModal.hide();
    })
    // 刪除 del
    delItemHidden = document.getElementById('delItemHidden')
    delItemBtn = document.getElementById('delItemBtn');
    delItemBtn.addEventListener('click', () => {
        delItem(document.getElementById('delItemHidden').getAttribute('target'))
        delItemModal.hide();
    })


    // addFeatBtn.addEventListener('click', () => addGroupI
    // tem('我就測試'));
    // addFeatBtn.addEventListener('click', function () {
    // const groupItem = document.createElement('div');
    // groupItem.className = ''
    // const plusBlock = document.createElement('div');
    // plusBlock.className = 'plusBlock';
    // const bsItem = new bootstrap.Collapse(groupItem, {
    //     toggle: false
    // });
    // itemBlock[0].append(groupItem);
    // })

    // addFeatBtn.addEventListener('click', function () {
    //     const bItem = document.createElement('div');
    //     bItem.setAttribute('data-bs-toggle', 'collapse');
    //     bItem.setAttribute('data-bs-target', '#subtree1');
    //     bItem.className = 'tudu-g-item';
    //     bItem.textContent = 'HELLO'
    //     itemBlock[0].appendChild(bItem)
    // })
    // // sItem
    // const bItem = document.createElement('div');
    // bItem.setAttribute('data-bs-toggle', 'collapse');
    // bItem.setAttribute('data-bs-target', '#subtree1');
    // bItem.className = 'tudu-g-item';
    // bItem.textContent = 'HELLO'

    // window.electronAPI.writeFile('This is some data to write to the file.');
//     add feat -> 按鈕後 modal 新增大項目
    // b -> modal 新增 小項目
    // s ->
    // console.log(await window.tuduFeat.update('123'))
}

function editItemName(target, text) {
    const targetItem = document.querySelector(`${target}`);
    targetItem.textContent = text;
}

function delItem(target) {
    const targetItem = document.querySelector(`${target}`);
    targetItem.remove();
}

function addGroupItem(title = null) {
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
    const itemBox = document.createElement('div');
    itemBox.className = `item-box`;
    itemBox.id = `itemBoxId${itemIndex}`
    const groupItem = document.createElement('div');
    groupItem.className = 'tudu-g-item';
    const collapseSwitchBox = document.createElement('div');
    collapseSwitchBox.className = 'collapse-switch-box';
    const collapseSwitch = document.createElement('img');
    collapseSwitch.src = './resource/img/chevron-right.svg';
    collapseSwitch.setAttribute('data-bs-toggle', 'collapse');
    collapseSwitch.setAttribute('data-bs-target', `.collapse-block-${itemIndex}`);
    collapseSwitch.setAttribute('aria-expanded', `true`);
    // collapseSwitch.addEventListener('click', () => {
    //     const allCollapse = document.querySelectorAll('.collapse');
    //     allCollapse.forEach(function (element) {
    //         const elementBoxIndex = element.getAttribute('boxIndex');
    //         // 如果元素的 boxIndex 与目标 boxIndex 相符，展开元素，否则折叠元素
    //         if (elementBoxIndex && parseInt(elementBoxIndex) === itemIndex) {
    //             var collapse = new bootstrap.Collapse(element, {toggle: false});
    //             collapse.show();
    //         } else {
    //             var collapse = new bootstrap.Collapse(element);
    //             collapse.hide();
    //         }
    //     });
    // })
    const groupTitle = document.createElement('div');
    groupTitle.className = `tudu-g-title group-title-${itemIndex}`;
    groupTitle.textContent = title;
    const groupOption = document.createElement('div');
    groupOption.className = 'tudu-g-option';
    const optionImg = document.createElement('img');
    optionImg.className = 'tudu-item-option dropdown-toggle'
    optionImg.src = './resource/img/list.svg';
    optionImg.setAttribute('data-bs-toggle', 'dropdown')
    optionImg.setAttribute('data-bs-auto-close', 'true')
    optionImg.setAttribute('aria-expanded', 'false')
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
        document.getElementById('editeTuduHidden').setAttribute('target', `.group-title-${itemIndex}`);
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

    // 將三個鈕新增至block內
    optionsBlock.appendChild(optionsAdd);
    optionsBlock.appendChild(optionsEdit);
    // optionsBlock.appendChild(optionsSetting); 暫時還不需要這個
    optionsBlock.appendChild(optionsDel);
    groupOption.appendChild(optionsBlock);

    groupOption.appendChild(optionImg); // 更多選項的圖片
    collapseSwitchBox.appendChild(collapseSwitch)
    // 添加捲軸 標題 更多按鈕
    groupItem.appendChild(collapseSwitchBox);
    groupItem.appendChild(groupTitle);
    groupItem.appendChild(groupOption);
    // 添加進box
    itemBox.appendChild(groupItem);
    itemBox.appendChild(collapseBlock);
    itemBlock[0].appendChild(itemBox);
}

async function addTuduItem(boxIndex = null, title) {
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
        document.getElementById('editeTuduHidden').setAttribute('target', `.tudu-item-title-${itemIndex}`);
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
    } else {
        itemBlock[0].appendChild(tuduItem);
    }
}
