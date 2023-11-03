// document.getElementById('myButton').addEventListener('click', () => {
//     ipcRenderer.send('button-clicked');
// });


let addFeatBtn;
let todoList;

window.onload = function (){
    addFeatBtn = document.getElementById('addFeatBtn');
    todoList = document.getElementById('todolist');

    addFeatBtn.addEventListener('click', function (){
        const newDiv = document.createElement('div');
        newDiv.setAttribute('data-bs-toggle', 'collapse');
        newDiv.setAttribute('data-bs-target', '#subtree1');
        newDiv.textContent = 'HELLO'
        todoList.appendChild(newDiv)
    })


}
