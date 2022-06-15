const inputElement = document.getElementById("input");
const btnElement = document.querySelector(".btn");
const addBtnEelement = document.querySelector(".btn__add");
const clearBtnElement = document.querySelector(".btn__clear");
const itemsElement = document.querySelector(".items");

function saveTask(name) {
  localStorage.setItem(`${name}`, name);
}

addBtnEelement.addEventListener("click", (e) => {
  e.preventDefault();

  if (!inputElement.value) {
    alert("Input can not be empty");
  } else {
    saveTask(inputElement.value);

    const renderTask = `
        <li>
          <span class="task__name">${inputElement.value}</span>
          <span class="task__icons">
            <i class="fa-solid fa-pen-to-square"></i
            ><i class="fa-solid fa-trash-can"  id="btn__delete" onclick=removeTask(this) ></i>
          </span>
        </li >
        
`;

    itemsElement.insertAdjacentHTML("afterbegin", renderTask);
  }
});

function renderAllTasks() {
  const allKeys = Object.keys(localStorage);
  console.log(allKeys);
  if (allKeys.length === 0) return;

  const renderTask = allKeys.map((e) => {
    return `
  <li>
    <span class="task__name">${e}</span>
    <span class="task__icons">
      <i class="fa-solid fa-pen-to-square"></i
      ><i class="fa-solid fa-trash-can"  id="btn__delete" onclick=removeTask(this)></i>
    </span>
  </li >
`;
  });

  itemsElement.insertAdjacentHTML("afterbegin", renderTask);
}

function removeTask(e) {
  let parent = e.parentNode.parentNode;
  let keyName = parent.querySelector(".task__name").textContent;
  console.log(keyName);
  let items = window.localStorage.getItem(keyName);
  console.log(items);
  localStorage.removeItem(items);
  parent.remove();
}

renderAllTasks();

clearBtnElement.addEventListener("click", (e) => {
  e.preventDefault();
  window.localStorage.clear();
  window.location.reload();
});
