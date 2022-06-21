const inputElement = document.getElementById("input");
const addBtnEelement = document.querySelector(".btn__add");
const clearBtnElement = document.querySelector(".btn__clear");
const itemsElement = document.querySelector(".items");

function saveTask(name) {
  localStorage.setItem(`${name}`, name);
}

function strikeTask(e) {
  let parent = e.parentNode.parentNode.querySelector(".task__name");

  let parentName =
    e.parentNode.parentNode.querySelector(".task__name").textContent;

  localStorage.removeItem(parentName);

  parent.style.setProperty("text-decoration", "line-through");

  sessionStorage.setItem(`${parentName.strike()}`, `${parentName}`);
}

function inputTasks(id) {
  return `
  <li>
    <span class="task__name">${id}</span>
    <span class="task__icons">
    <i class="fa-solid fa-check" onclick=strikeTask(this)></i>
      <i class="fa-solid fa-trash-can"  id="btn__delete" onclick=removeTask(this) ></i>
    </span>
  </li>
`;
}

addBtnEelement.addEventListener("click", (e) => {
  e.preventDefault();

  if (!inputElement.value) {
    alert("Input can not be empty");
  } else {
    saveTask(inputElement.value);

    const renderTask = inputTasks(inputElement.value);

    itemsElement.insertAdjacentHTML("afterbegin", renderTask);
  }
});

function renderAllTasks() {
  const allKeys = Object.keys(localStorage);

  if (allKeys.length === 0) return;

  const renderTask = allKeys
    .map((e) => {
      return inputTasks(e);
    })
    .join("");

  itemsElement.insertAdjacentHTML("afterbegin", renderTask);
}

function removeTask(e) {
  let parent = e.parentNode.parentNode;
  let keyName = parent.querySelector(".task__name").textContent;
  let items = window.localStorage.getItem(keyName);

  localStorage.removeItem(items);
  parent.remove();
}

renderAllTasks();

clearBtnElement.addEventListener("click", (e) => {
  e.preventDefault();
  window.localStorage.clear();
  window.location.reload();
});
