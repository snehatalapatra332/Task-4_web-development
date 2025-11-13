// ================================
// Sneha's To-Do List with Time + Weekly Activity
// ================================

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const prevWeekList = document.getElementById("prev-week-list");
const toggleBtn = document.getElementById("toggle-activity");
const prevContainer = document.getElementById("prev-week-container");

// LocalStorage load
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();
renderPrevWeek();

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  const task = {
    text,
    done: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  renderPrevWeek();
  taskInput.value = "";
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    const span = document.createElement("span");
    span.innerHTML = `<strong>${task.text}</strong><br>
      <small>Added: ${formatDate(task.createdAt)}</small>`;

    if (task.done && task.completedAt) {
      span.innerHTML += `<br><small>Completed: ${formatDate(task.completedAt)}</small>`;
    }

    const doneBtn = document.createElement("button");
    doneBtn.textContent = task.done ? "Undo" : "Done";
    doneBtn.className = "done-btn";
    doneBtn.addEventListener("click", () => toggleDone(i));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", () => deleteTask(i));

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function toggleDone(i) {
  const task = tasks[i];
  task.done = !task.done;
  task.completedAt = task.done ? new Date().toISOString() : null;
  saveTasks();
  renderTasks();
  renderPrevWeek();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  saveTasks();
  renderTasks();
  renderPrevWeek();
}

function renderPrevWeek() {
  prevWeekList.innerHTML = "";

  const now = new Date();
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);

  const recent = tasks.filter(
    (t) => t.done && t.completedAt && new Date(t.completedAt) >= oneWeekAgo
  );

  if (recent.length === 0) {
    prevWeekList.innerHTML = "<li>No tasks completed in the last 7 days.</li>";
    return;
  }

  recent.forEach((t) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${t.text}</strong><br>
      <small>Completed: ${formatDate(t.completedAt)}</small>`;
    prevWeekList.appendChild(li);
  });
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🔽 Collapsible Activity Section
toggleBtn.addEventListener("click", () => {
  prevContainer.classList.toggle("active");
  toggleBtn.textContent = prevContainer.classList.contains("active")
    ? "▲ Hide Previous Week’s Activity"
    : "▼ Show Previous Week’s Activity";
});