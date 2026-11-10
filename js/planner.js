// Array that stores all tasks. Each task is an object: { text, done }
let tasks = [];

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const count = document.getElementById("task-count");

// ADD a task when the form is submitted (button click or Enter key)
form.addEventListener("submit", function (event) {
  event.preventDefault();               // stop the page from reloading
  const text = input.value.trim();
  if (text === "") return;              // ignore empty tasks
  tasks.push({ text: text, done: false });
  input.value = "";
  renderTasks();
});

// COMPLETE or un-complete a task
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

// DELETE a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Redraw the whole list from the array
function renderTasks() {
  list.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const label = document.createElement("span");
    label.textContent = task.text;      // textContent is safe against injected HTML
    label.addEventListener("click", function () { toggleTask(index); });

    const doneBtn = document.createElement("button");
    doneBtn.textContent = task.done ? "Undo" : "Done";
    doneBtn.className = "small-btn";
    doneBtn.addEventListener("click", function () { toggleTask(index); });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "small-btn danger";
    delBtn.addEventListener("click", function () { deleteTask(index); });

    li.append(label, doneBtn, delBtn);
    list.appendChild(li);
  });

  const remaining = tasks.filter(function (t) { return !t.done; }).length;
  count.textContent = tasks.length === 0
    ? "No tasks yet. Add one above!"
    : remaining + " of " + tasks.length + " tasks remaining";
}

renderTasks();