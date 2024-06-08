let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let priorityTasks = JSON.parse(localStorage.getItem("priorityTasks")) || [];

function displayTasks() {
  displayTaskList(tasks, "taskList");
  displayTaskList(priorityTasks, "priorityTaskList");
}

function displayTaskList(list, listId) {
  const taskList = document.getElementById(listId);
  taskList.innerHTML = "";

  list.forEach((task, index) => {
    const taskRow = document.createElement("tr");
    taskRow.classList.add("task-row");

    const taskTitleCell = document.createElement("td");
    taskTitleCell.textContent = task.title;

    const statusCell = document.createElement("td");
    statusCell.textContent = task.completed ? "Completed" : "Pending";

    const actionsCell = document.createElement("td");
    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Pending" : "Complete";
    completeButton.addEventListener("click", () =>
      toggleComplete(index, listId)
    );
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(index, listId));
    actionsCell.appendChild(completeButton);
    actionsCell.appendChild(deleteButton);

    if (listId === "taskList") {
      const priorityButton = document.createElement("button");
      priorityButton.textContent = "Mark Priority";
      priorityButton.addEventListener("click", () => moveToPriority(index));
      actionsCell.appendChild(priorityButton);
    }

    taskRow.appendChild(taskTitleCell);
    taskRow.appendChild(statusCell);
    taskRow.appendChild(actionsCell);
    taskList.appendChild(taskRow);
  });
}

function addTask(isPriority) {
  const taskInput = document.getElementById("taskInput");
  const title = taskInput.value.trim();
  if (title !== "") {
    const task = { title: title, completed: false };
    if (isPriority) {
      priorityTasks.push(task);
    } else {
      tasks.push(task);
    }
    taskInput.value = "";
    displayTasks();
    saveTasks();
  }
}

function deleteTask(index, listId) {
  if (listId === "taskList") {
    tasks.splice(index, 1);
  } else {
    priorityTasks.splice(index, 1);
  }
  displayTasks();
  saveTasks();
}

function toggleComplete(index, listId) {
  const list = listId === "taskList" ? tasks : priorityTasks;
  list[index].completed = !list[index].completed;
  displayTasks();
  saveTasks();
}

function moveToPriority(index) {
  const task = tasks.splice(index, 1)[0];
  priorityTasks.push(task);
  displayTasks();
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("priorityTasks", JSON.stringify(priorityTasks));
}

displayTasks();
