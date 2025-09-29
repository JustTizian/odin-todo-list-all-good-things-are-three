import script from "./script"

function $(query) {
    return document.querySelector(query)
}

const todoListsContainer = $(".todo-lists-container")
const todosContainer = $(".todos-container")

const addTodoButton = $(".add-todo-button")

const newTodoFormDialog = $(".new-todo-form-dialog")
const newTodoForm = $(".new-todo-form")

const addTodoListButton = $(".add-todo-list-button")

const newTodoListFormDialog = $(".new-todo-list-form-dialog")
const newTodoListForm = $(".new-todo-list-form")

const editTodoFormDialog = $(".edit-todo-form-dialog")
const editTodoForm = $(".edit-todo-form")


addTodoListButton.addEventListener("click", () => {
    newTodoListFormDialog.showModal()
})

newTodoListForm.addEventListener("submit", (event) => {
    const data = event.target.elements
    const name = data["newTodoListName"].value
    script.addTodoList(name)
})

addTodoButton.addEventListener("click", () => {
    const todoLists = script.getTodoLists()

    const select = newTodoForm.querySelector("select")
    todoLists.forEach(list => {
        const option = document.createElement("option")
        option.value = list.id
        option.textContent = list.name
        if (list.active) {
            option.selected = true
        }
        select.append(option)
    })

    newTodoFormDialog.showModal()
})

newTodoForm.addEventListener("submit", (event) => {
    const newTodoData = event.target.elements

    const newTodoName = newTodoData["newTodoName"].value
    const newTodoDescription = newTodoData["newTodoDescription"].value
    const newTodoDueDate = newTodoData["newTodoDueDate"].value
    const newTodoPriority = newTodoData["newTodoPriority"].value

    const newTodoListId = newTodoData["todo-list-to-add-todo-to"].value

    script.addTodo(newTodoListId, newTodoName, newTodoDescription, newTodoDueDate, newTodoPriority)
})

newTodoFormDialog.addEventListener("close", () => {
    newTodoForm.querySelector('select').replaceChildren()
})

function renderTodoLists(filterTypes, todoLists) {
    todoListsContainer.replaceChildren()

    filterTypes.forEach(filterType => {
        const listEl = document.createElement("li")
        listEl.dataset.id = filterType
        listEl.dataset.viewType = "filter"
        listEl.classList.add("todo-list")

        const listNameDisplay = document.createElement("button")
        listNameDisplay.classList.add("choose-todo-list")
        listNameDisplay.textContent = filterType.charAt(0).toUpperCase() + filterType.slice(1)

        listEl.append(listNameDisplay)
        todoListsContainer.append(listEl)
    })

    todoLists.forEach((list, index) => {
        const listEl = document.createElement("li")
        listEl.dataset.id = list.id
        listEl.dataset.viewType = "list"
        listEl.classList.add("todo-list")

        const listNameDisplay = document.createElement("button")
        listNameDisplay.classList.add("choose-todo-list")
        listNameDisplay.textContent = list.name
        listEl.append(listNameDisplay)

        if (index != 0) {
            const listDeleteButton = document.createElement("button")
            listDeleteButton.textContent = "Delete"
            listDeleteButton.classList.add("delete-list-button")
            listEl.append(listDeleteButton)
        }


        todoListsContainer.append(listEl)
    })
}

todoListsContainer.addEventListener("click", (event) => {
    if (!event.target.closest(".todo-list")) return;

    const todoEl = event.target.closest(".todo-list")
    console.log(event.target)

    if (event.target.matches(".delete-list-button")) {
        console.log(event.target)
        console.log("triggered")
        script.deleteTodoList(todoEl.dataset.id)
        return;
    }

    if (event.target.matches(".choose-todo-list")) {
        if (todoEl.dataset.viewType === "list") {
            script.changeActiveTodoList(todoEl.dataset.id)
            script.changeToListView(todoEl.dataset.id)
        }

        if (todoEl.dataset.viewType === "filter") {
            script.changeToFilterView(todoEl.dataset.id)
        }
    }

})

function renderTodoList(todoList) {
    todosContainer.replaceChildren()

    todoList.forEach(todo => {
        const todoEl = document.createElement("li")
        todoEl.dataset.id = todo.id
        todoEl.classList.add("todo")

        const todoNameDisplay = document.createElement("p")
        todoNameDisplay.textContent = todo.name

        const todoDeleteButton = document.createElement("button")
        todoDeleteButton.textContent = "Delete"
        todoDeleteButton.classList.add("delete-todo-button")

        const todoEditButton = document.createElement("button")
        todoEditButton.textContent = "Edit"
        todoEditButton.classList.add("edit-todo-button")

        todoEl.append(todoNameDisplay, todoEditButton, todoDeleteButton)
        todosContainer.append(todoEl)
    })
}

todosContainer.addEventListener("click", (event) => {
    if (!event.target.closest(".todo")) return;

    const todoId = event.target.closest(".todo").dataset.id
    if (event.target.matches(".delete-todo-button")) {
        script.deleteTodo(todoId)
    }
    if(event.target.matches(".edit-todo-button")){
        openEditDialog(todoId)
    }
})

function openEditDialog(todoId){
    editTodoForm.dataset.todoId = todoId
    
    const todoData = script.getTodoData(todoId)
    editTodoForm.querySelector("#edit-todo-name").value = todoData.name
    editTodoForm.querySelector("#edit-todo-description").value = todoData.description
    editTodoForm.querySelector("#edit-todo-due-date").value = todoData.dueDate
    editTodoForm.querySelectorAll(".edit-todo-priority").forEach(radio => {
        if(radio.value === todoData.priority) radio.checked = true
    })

    editTodoFormDialog.showModal()
}

editTodoForm.addEventListener("submit", (event) => {
    const newTodoData = event.target.elements
    
    const name = newTodoData["editTodoName"].value
    const description = newTodoData["editTodoDescription"].value
    const dueDate = newTodoData["editTodoDueDate"].value
    const priority = newTodoData["editTodoPriority"].value

    script.editTodo(editTodoForm.dataset.todoId, {name, description, dueDate, priority})
})

export default {
    renderTodoLists,
    renderTodoList
}
