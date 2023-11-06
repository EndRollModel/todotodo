// document.getElementById('myButton').addEventListener('click', () => {
//     ipcRenderer.send('button-clicked');
// });

let addFeatBtn;
let todoList;
let itemBlock;

window.onload = function (){
    addFeatBtn = document.getElementById('add-todo-btn');
    todoList = document.getElementById('todolist');
    itemBlock = document.getElementById('item-block')

    addFeatBtn.addEventListener('click', function (){
        const bItem = document.createElement('div');
        bItem.setAttribute('data-bs-toggle', 'collapse');
        bItem.setAttribute('data-bs-target', '#subtree1');
        bItem.className = 'todo-b-item';
        bItem.textContent = 'HELLO'
        itemBlock.appendChild(bItem)
    })
    // sItem
    const bItem = document.createElement('div');
    bItem.setAttribute('data-bs-toggle', 'collapse');
    bItem.setAttribute('data-bs-target', '#subtree1');
    bItem.className = 'todo-b-item';
    bItem.textContent = 'HELLO'



}
