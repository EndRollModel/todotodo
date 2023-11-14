// 結構：
// body : {
//  .toolbar // 關閉與縮小按鈕的工具列
//  .body-block{ 最外圍整個區塊
//      .item-block{ // tuduList的項目
//          .item-box { // 群組的未來可拖曳區域
//              .tudu-g-item{ // 群組
//                  .tudu-s-item{ 代辦事項
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

window.onload = async function () {
    addFeatBtn = document.getElementById('add-tudu-btn');
    todoList = document.getElementById('tudulist');
    itemBlock = document.getElementsByClassName('item-block');

    addFeatBtn.addEventListener('click', () => addGroupItem('我就測試'));
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

function addGroupItem(title) {
    //add itemblock => item-box => tudu-g-item => collapse-switch &
    let itemIndex = 0;
    let notUse = false;
    const itemBoxCount = document.querySelectorAll('.item-box').length;
    while (!notUse) {
        if (document.querySelector(`.tindex${itemIndex}`) === null) {
            notUse = true;
        } else {
            itemIndex++;
        }
    }
    const itemBox = document.createElement('div');
    itemBox.className = `item-box tindex${itemIndex}`;
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
    const optionsEdit = document.createElement('li');
    optionsEdit.className = 'dropdown-item';
    optionsEdit.textContent = '編輯名稱';
    const optionsSetting = document.createElement('li');
    optionsSetting.className = 'dropdown-item';
    optionsSetting.textContent = '設定';
    const optionsDel = document.createElement('li');
    optionsDel.className = 'dropdown-item';
    optionsDel.textContent = '刪除';

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

function addSItem (title) {

}
