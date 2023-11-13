// 結構：
// body : {
//  .toolbar // 關閉與縮小按鈕的工具列
//  .body-block{ 最外圍整個區塊
//      .item-block{ // tuduList的項目
//          .tudu-g-item{ // 群組
//              .tudu-s-item{ 代辦事項
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

    addFeatBtn.addEventListener('click', function () {
        const groupItem = document.createElement('div');
        groupItem.className = ''
        const plusBlock = document.createElement('div');
        plusBlock.className = 'plusBlock';
        groupItem.append()
    })


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

    console.log(await window.tuduFeat.update('123'))

}
