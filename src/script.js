import './styles.css'
import TodoList from './TodoList'
import Todo from './Todo'

import UIManager from './UIManager'
import { isValid } from 'date-fns'

let todoLists = loadTodoLists() || [new TodoList("Standard", true), new TodoList("Custom Todo List")]

let todos = loadTodos() ||
    [
        new Todo(todoLists[0].id, "Example Todo1", "This is the description", "09-29-2025", "low", undefined, false, true),
    ]

function loadTodos() {
    if (!localStorage.getItem("todos")) return

    const data = (JSON.parse(localStorage.getItem("todos")))
    const todos = data.map(todo => {
        return new Todo(todo.listId, todo.name, todo.description, todo.dueDate, todo.priority, todo.id, todo.done, todo.expanded)
    })

    return todos
}

function loadTodoLists() {
    if (!localStorage.getItem("todosLists")) return

    const data = (JSON.parse(localStorage.getItem("todosLists")))
    const todoLists = data.map(list => {
        return new TodoList(list.name, list.active, list.id)
    })

    return todoLists
}

const filters = {
    all: todo => true,
    completed: todo => todo.done,
    uncompleted: todo => !todo.done,
    "due today": todo => todo.isDueToday(),
    "due tomorrow": todo => todo.isDueTomorrow(),
    "due this week": todo => todo.isDueThisWeek(),
    overdue: todo => todo.isOverDue()
}

let currentView = { type: "filter", id: filters["all"] }

render()

function render() {
    const prevScroll = window.scrollY

    UIManager.renderTodoLists(Object.keys(filters), todoLists)

    if (currentView.type === "list") {
        UIManager.renderTodoList(getTodosFromList(currentView.id))
    }

    if (currentView.type === "filter") {
        UIManager.renderTodoList(todos.filter(currentView.id))
    }

    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("todoLists", JSON.stringify(todoLists))
    window.scrollTo(0, prevScroll)
}

function changeToListView(id) {
    currentView.type = "list"
    currentView.id = id
    render()
}

function changeToFilterView(filter) {
    currentView.type = "filter"
    currentView.id = filters[filter]
    render()
}

function changeActiveTodoList(id) {
    const newActiveList = todoLists.find(list => list.id === id)
    if (newActiveList.active === true) return;

    todoLists.forEach(list => list.setActiveStatus(false))
    todoLists.find(list => list.id === id).setActiveStatus(true)
}

function addTodo(listId, name, description, dueDate, priority) {
    todos.push(new Todo(listId, name, description, dueDate, priority))
    render()
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id)
    render()
}

function addTodoList(name) {
    todoLists.push(new TodoList(name))
    render()
}

function deleteTodoList(listId) {
    todos = todos.filter(todo => todo.listId !== listId)
    todoLists = todoLists.filter(list => list.id !== listId)
    render()
}

function getTodosFromList(listId) {
    return todos.filter(todo => todo.listId === listId)
}

function getTodoLists() {
    return todoLists
}

function getTodoData(id) {
    const wantedTodo = todos.find(todo => todo.id === id)

    const name = wantedTodo.name
    const description = wantedTodo.description
    const dueDate = wantedTodo.dueDate
    const priority = wantedTodo.priority

    return { name, description, dueDate, priority }
}

function editTodo(todoId, newData) {
    const todo = todos.find(todo => todo.id === todoId)

    if (todo.name !== newData.name) {
        todo.name = newData.name
    }

    if (todo.description !== newData.description) {
        todo.description = newData.description
    }

    if (todo.dueDate !== newData.dueDate) {
        console.log(newData)
        todo.dueDate = newData.dueDate
    }

    if (todo.priority !== newData.priority) {
        todo.priority = newData.priority
    }
    
    render()
}

function expandTodo(id) {
    todos.find(todo => todo.id === id).toggleExpanded()
    render()
}

export default {
    addTodo,
    editTodo,
    deleteTodo,
    addTodoList,
    deleteTodoList,
    getTodoLists,
    changeToListView,
    changeToFilterView,
    changeActiveTodoList,
    getTodoData,
    expandTodo
}


