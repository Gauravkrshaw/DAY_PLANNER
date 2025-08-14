const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");

let todos = [];

todoInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && todoInput.value.trim() !== "") {
        todos.push({ text: todoInput.value, completed: false });
        todoInput.value = "";
        renderTodos();
    }
});

function renderTodos(filter = "all") {
    todoList.innerHTML = "";
    let filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;

        const span = document.createElement("span");
        span.innerHTML = `<input type="checkbox" ${todo.completed ? "checked" : ""} 
                          onclick="toggleComplete(${index})"> ${todo.text}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "×";
        deleteBtn.onclick = () => {
            todos.splice(index, 1);
            renderTodos(filter);
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    updateItemsLeft();
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function updateItemsLeft() {
    const count = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${count} items left`;
}

function filterTodos(type) {
    renderTodos(type);
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
}
