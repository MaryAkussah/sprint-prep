
let tasks = [];

let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {

  const text = taskInput.value.trim();

  if (text === "") return;

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  taskInput.value = "";

  renderTasks();
}

function toggleTask(id) {

  tasks = tasks.map(task => {

    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed
      };
    }

    return task;

  });

  renderTasks();
}

function deleteTask(id) {

  tasks = tasks.filter(task => task.id !== id);

  renderTasks();
}

function updateCount() {

  const remaining = tasks.filter(task => !task.completed);

  taskCount.textContent = remaining.length;

}

function setFilter(filter) {

  currentFilter = filter;

  renderTasks();

}

function renderTasks() {

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {

    filteredTasks = tasks.filter(task => !task.completed);

  } else if (currentFilter === "completed") {

    filteredTasks = tasks.filter(task => task.completed);

  }

  filteredTasks.forEach(task => {

    const li = document.createElement("li");

    const span = document.createElement("span");

    span.textContent = task.text;

    span.className = "task-text";

    if (task.completed) {
      span.classList.add("completed");
    }

    span.addEventListener("click", function() {

      toggleTask(task.id);

    });

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", function() {

      deleteTask(task.id);

    });

    li.appendChild(span);

    li.appendChild(deleteButton);

    taskList.appendChild(li);

  });

  updateCount();

}

renderTasks();


