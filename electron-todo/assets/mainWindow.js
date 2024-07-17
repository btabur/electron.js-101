const { ipcRenderer } = require('electron');

checkTodoCount()

ipcRenderer.on('todo:addItem', (event, todoList) => {

  const container = document.querySelector('.todo-container')

const row = document.createElement("div")
row.className="row"

const col = document.createElement("div");
col.className=" todo-item p-2 mb-3 text-light bg-dark col-md-8 offset-2 shadow card d-flex justify-content-center flex-row align-items-center"


const p =document.createElement("p")
p.className="m-0 w-100"
p.innerText="Bu bir yapılacaklar listesidir"

const deleteBtn = document.createElement("button")
deleteBtn.className="btn btn-sm btn-outline-danger flex-shirnk-1";
deleteBtn.innerText="X"

deleteBtn.addEventListener("click",()=> {
  if(confirm("Silmek istediğinizden emin misiniz")) {

  }
})


col.appendChild(p)
col.appendChild(deleteBtn)

row.appendChild(col)


container.appendChild(row)
checkTodoCount()



});




function checkTodoCount() {
  const container = document.querySelector(".todo-container");
  const alertContainer = document.querySelector(".alert-container")

  if(container.children.length !==0) {
    alertContainer.style.display="none"
  }else {
    alertContainer.style.display="block"
  }
}