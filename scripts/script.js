const createListItem = function (text, done) {
  const listItem = document.createElement("li");

  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.addEventListener("change", toggleDone);
  if (done) {
    checkBox.checked = true;
    listItem.classList.add("complete");
  }

  const description = document.createElement("input");
  description.setAttribute("type", "text");
  description.value = text;
  description.addEventListener("focusout", changeDescription);

  const deleteBtn = document.createElement("i");
  deleteBtn.className = "fa fa-trash-o";
  deleteBtn.addEventListener("click", removeTask);

  listItem.appendChild(checkBox);
  listItem.appendChild(description);
  listItem.appendChild(deleteBtn);

  return listItem;
};

const createNewTask = function (text) {
  text = text.trim();
  if (text.length < 1) {
    return;
  }

  const todoList = document.getElementById("to-do-list");
  const listItem = createListItem(text, false);
  todoList.appendChild(listItem);

  addTaskAPI(text).then((details) => {
    listItem.details = details;
  });
};

const addExistingTask = function (details) {
  const todoList = document.getElementById("to-do-list");
  const listItem = createListItem(details.description, details.done);
  listItem.details = details;

  todoList.appendChild(listItem);
};

const removeTask = function (e) {
  const toDelete = e.target.parentNode;

  const parent = toDelete.parentNode;
  parent.removeChild(toDelete);

  removeTaskAPI(toDelete.details._id);
};

const toggleDone = function (e) {
  const parent = e.target.parentNode;

  parent.classList.toggle("complete");
  parent.details.done = !parent.details.done;

  updateTaskAPI(parent.details, "done");
};

const handleSubmit = function (e) {
  e.preventDefault();
  const input = e.target.querySelector("input");
  const { value } = input;
  input.value = "";

  createNewTask(value);
};

const changeDescription = function (e) {
  const description = e.target;
  const container = description.parentNode;

  const value = e.target.value.trim();
  if (value.length < 1) {
    e.target.value = container.details.description;
    return;
  }

  description.value = value;
  container.details.description = value;

  updateTaskAPI(container.details, "description");
};

const addEventListeners = function () {
  const addTaskForm = document.getElementById("add-item-form");
  addTaskForm.addEventListener("submit", handleSubmit);
};

const getAllTasksFromBackend = async function () {
  const collection = await getFullListAPI();

  for (const details of collection) {
    addExistingTask(details);
  }
};

addEventListeners();
getAllTasksFromBackend();
