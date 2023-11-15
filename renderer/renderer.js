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
let addTuduBoxIndex; // 新增待辦事項的數值內容 (tuduItem)
let checkAddTudu; // 新增待辦事項的按鈕(於group中)
let editNameBtn; // 編輯名稱的內容
let checkSettingBtn; // 確認設定的內容

window.onload = async function () {
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
    });
    // modal tudu新增按鈕
    addTuduBtn = document.getElementById('addTuduBtn');
    addTuduBtn.addEventListener('click', () => {
        addTuduItem(-1, addFeatNameInput.value);
        addFeatNameInput.value = ''; // 清除
    })

    // 由群組新增按鈕事件
    // 新增 tudu
    addTuduInput = document.getElementById('addTuduInput')
    addTuduBoxIndex = document.getElementById('addTuduBoxIndex');
    checkAddTudu = document.getElementById('checkAddTudu');
    checkAddTudu.addEventListener('click', () => {
        addTuduItem(addTuduBoxIndex.getAttribute('boxIndex'), addTuduInput.value);
        addTuduBoxIndex.removeAttribute('boxIndex');
        addFeatNameInput.value = ''; // 清除
    })

    // addFeatBtn.addEventListener('click', () => addGroupItem('我就測試'));
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

function addGroupItem(title = null) {
    if (title == null) {
        title = document.getElementById('addFeatName').value;
    }
    //add itemblock => item-box => tudu-g-item => collapse-switch &
    let itemIndex = 0;
    let notUse = false;
    const itemBoxCount = document.querySelectorAll('.item-box').length;
    while (!notUse) {
        if (document.querySelector(`#itemBox${itemIndex}`) === null) {
            notUse = true;
        } else {
            itemIndex++;
        }
    }
    const itemBox = document.createElement('div');
    itemBox.className = `item-box`;
    itemBox.id = `itemBox${itemIndex}`
    const groupItem = document.createElement('div');
    groupItem.className = 'tudu-g-item';
    const collapseBlock = document.createElement('div');
    collapseBlock.className = 'collapse-block';
    const collapseSwitch = document.createElement('img');
    collapseSwitch.src = './resource/img/chevron-right.svg';
    collapseSwitch.setAttribute('data-bs-toggle', 'collapse');
    collapseSwitch.setAttribute('data-bs-target', `.collapse-list-${itemIndex}`);
    collapseSwitch.setAttribute('aria-expanded', `false`);
    const groupTitle = document.createElement('div');
    groupTitle.className = 'tudu-g-title';
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
        addTuduBoxIndex.setAttribute('boxIndex', `${itemIndex}`)
        new bootstrap.Modal(document.getElementById('addTuduItem')).show();
    })
    const optionsEdit = document.createElement('li');
    optionsEdit.className = 'dropdown-item';
    optionsEdit.textContent = '編輯名稱';
    optionsEdit.addEventListener('click', () => {
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
    })

    // 將三個鈕新增至block內
    optionsBlock.appendChild(optionsAdd);
    optionsBlock.appendChild(optionsEdit);
    optionsBlock.appendChild(optionsSetting);
    optionsBlock.appendChild(optionsDel);
    groupOption.appendChild(optionsBlock);

    groupOption.appendChild(optionImg); // 更多選項的圖片
    collapseBlock.appendChild(collapseSwitch)
    // 添加捲軸 標題 更多按鈕
    groupItem.appendChild(collapseBlock);
    groupItem.appendChild(groupTitle);
    groupItem.appendChild(groupOption);
    // 添加進box
    itemBox.appendChild(groupItem)
    itemBlock[0].appendChild(itemBox);
}

function addTuduItem(boxIndex = null, title) {
    const checkIndex = parseInt(boxIndex)
    if (isNaN(checkIndex) || checkIndex === -1) {

    }

    const tuduItem = document.createElement('div');
    tuduItem.className = 'tudu-item';

    const tuduTitle = document.createElement('div')
    tuduTitle.textContent = title;
    tuduTitle.className = `tudu-item-title`;

    const tuduTime = document.createElement('div');
    tuduTime.className = 'tudu-item-time';
    tuduTime.textContent = ''

    const tuduCheck = document.createElement('input');
    tuduCheck.type = 'checkbox';
    tuduCheck.className = 'tudu-item-check';
    tuduCheck.addEventListener('change', async (e) => {
        if (e.target.checked) {
            tuduTime.textContent = `${await window.timeFeat.timeFormat(Date.now())}`;
        } else {
            tuduTime.textContent = '';
        }
    })

    const tuduItemOption = document.createElement('div');
    tuduItemOption.className = 'tudu-item-option';
    const optionImg = document.createElement('img');
    optionImg.src = './resource/img/list.svg';
    tuduItemOption.appendChild(optionImg)

    tuduItem.appendChild(tuduCheck);
    tuduItem.appendChild(tuduTitle);
    tuduItem.appendChild(tuduTime);
    tuduItem.appendChild(tuduItemOption);

    itemBlock[0].appendChild(tuduItem);

}
