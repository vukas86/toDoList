const inputElement = document.getElementById("input");
const btnElement = document.querySelector(".btn");
const itemsElement = document.querySelector(".items");

btnElement.addEventListener("click", (e) => {
  e.preventDefault();
  if (!inputElement.value) {
    alert("Input can not be empty");
  } else {
    const renderTask = `
        <li>
          <span class="task__name">${inputElement.value}</span>
          <span class="task__icons">
            <i class="fa-solid fa-pen-to-square"></i
            ><i class="fa-solid fa-trash-can"  id="btn__delete" onclick=removeTask(this) ></i>
          </span>
        </li >
`;

    function appendTasks(name, data) {
      let old = localStorage.getItem(name);
      if (old === null) old = "";
      localStorage.setItem(name, old + data);
    }

    itemsElement.insertAdjacentHTML("afterbegin", renderTask);
    localStorage.setItem("tasks", renderTask);
    appendTasks("allTasks", renderTask);
  }
});

function loadTasks() {
  const tasks = localStorage.getItem("allTasks");

  itemsElement.insertAdjacentHTML("afterbegin", tasks);
}
loadTasks();

// function findKey() {
//   for (let i = 0; i < localStorage.length; i++) {
//     console.log(localStorage.getItem(localStorage.key(i)));
//   }
// }

// findKey();

// const deleteBtn = document.getElementById("btn__delete");
// console.log(deleteBtn);

function removeTask(e) {
  let key = localStorage.key(e);
  let items = localStorage.getItem(key);
  console.log(items);
  let parent = e.parentNode.parentNode;
  console.log(parent);
  //   parent.remove();
}
