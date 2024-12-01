const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const filterSelect = document.querySelector("#filter-select");
const searchInput = document.querySelector("#search-input");
const themeToggle = document.getElementById('theme-toggle');
let oldInputValue;

// Funções

document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const feedbackMessage = document.getElementById('feedback-message');
    function showFeedback(message) {
        feedbackMessage.textContent = message;
        feedbackMessage.classList.remove('hide');

        setTimeout(() => {
            feedbackMessage.classList.add('hide');
        }, 2000);
    }

    const todoForm = document.getElementById('todo-form');
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        showFeedback('Tarefa adicionada com sucesso!');
    });

    todoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-todo')) {
            const todoItem = event.target.closest('.todo');
            todoItem.classList.add('fade-out');

            setTimeout(() => {
                todoItem.remove();
                showFeedback('Tarefa removida com sucesso!');
            }, 300);
        }
    });
});
const applyTheme = (theme) => {
    document.body.classList.toggle('dark', theme === 'dark');
    themeToggle.classList.toggle('dark', theme === 'dark');
};
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});
const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

    filterTodos();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerHTML === oldInputValue) {
            todoTitle.innerHTML = text;
        }
    });
};

const filterTodos = () => {
    const todos = document.querySelectorAll(".todo");
    const filterValue = filterSelect.value;
    const searchValue = searchInput.value.toLowerCase();

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
        const isDone = todo.classList.contains("done");
        const shouldDisplay =
            (filterValue === "all" ||
                (filterValue === "done" && isDone) ||
                (filterValue === "todo" && !isDone)) &&
            todoTitle.includes(searchValue);

        todo.style.display = shouldDisplay ? "flex" : "none";

    });
};

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
        filterTodos();
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
        filterTodos();
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});



// Filtros
filterSelect.addEventListener("change", filterTodos);
searchInput.addEventListener("input", filterTodos);




