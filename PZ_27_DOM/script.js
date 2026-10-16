"use strict";
console.log("ПЗ 27: стартовый проект подключён");
document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.getElementById("page-title");
  const formEl = document.getElementById("task-form");
  const inputEl = document.getElementById("task-input");
  const listEl = document.getElementById("task-list");
  const statsEl = document.getElementById("stats");
  const errorEl = document.getElementById("error");
  const initialTasks = document.querySelectorAll(".task");
  if (titleEl) {
    titleEl.textContent = "Мой список задач";
  }
  initialTasks.forEach((task, index) => {
    if (!task.dataset.id) {
      task.dataset.id = index + 1;
    }
  });
  function createButton(label, action) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.dataset.action = action;
    return btn;
  }
  function updateStats() {
    const allTasks = listEl.querySelectorAll(".task");
    const doneTasks = listEl.querySelectorAll(".task.done");
    const total = allTasks.length;
    const done = doneTasks.length;
    const remaining = total - done;
    statsEl.textContent = `Всего: ${total} | Выполнено: ${done} | Осталось: ${remaining}`;
    if (errorEl) errorEl.textContent = "";
  }
  updateStats();
  function createTask(text) {
    const li = document.createElement("li");
    li.className = "task";
    li.dataset.id = Date.now(); 
    const span = document.createElement("span");
    span.textContent = text;
    const btnDone = createButton("Готово", "done");
    const btnUp = createButton("Наверх", "up");
    const btnDelete = createButton("Удалить", "delete");
    li.append(span, btnDone, btnUp, btnDelete);
    listEl.append(li);
  }
  formEl.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const text = inputEl.value.trim()
    if (!text) {
      if (errorEl) {
        errorEl.textContent = "Введите название задачи!";
        errorEl.style.color = "red";
      }
      inputEl.focus();
      return;
    }
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.style.color = "";
    }
    createTask(text);
    inputEl.value = ""; 
    updateStats();
  });
  listEl.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const taskCard = button.closest(".task");
    if (!taskCard) return;
    const action = button.dataset.action;
    switch (action) {
      case "done":
        taskCard.classList.toggle("done");
        break;
      case "up":
        listEl.prepend(taskCard);
        break;
      case "delete":
        taskCard.remove();
        break;
    }
    updateStats();
  });
});
