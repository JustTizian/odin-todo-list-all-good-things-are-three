import './styles.css'
import TodoList from './TodoList'
import Todo from './Todo'

import UIManager from './UIManager'

let todoLists = [new TodoList("Standard", true), new TodoList("Test")]

let todos = [
    new Todo(todoLists[0].id, "Example Todo1", "This is the description", "01-01-1970", "low", undefined, true),
    new Todo(todoLists[0].id, "Example Todo2", "This is the description", "01-01-1970", "low"),
    new Todo(todoLists[0].id, "Example Todo3", "This is the description", "01-01-1970", "low"),
    new Todo(todoLists[1].id, "Example Todo4", "This is the description", "01-01-1970", "low", undefined, true),
    new Todo(todoLists[1].id, "Example Todo5", "This is the description", "01-01-1970", "low"),
    new Todo(todoLists[1].id, "Example Todo6", "This is the description", "01-01-1970", "low")

]

const filters = {
    all: todo => true,
    completed: todo => todo.done,
    uncompleted: todo => !todo.done
}

let currentView = {type:"filter", id:filters["all"]}

render()

function render() {
    UIManager.renderTodoLists(Object.keys(filters), todoLists)
    
    if(currentView.type === "list"){
        UIManager.renderTodoList(getTodosFromList(currentView.id))
    }

    if(currentView.type === "filter"){
        UIManager.renderTodoList(todos.filter(currentView.id))
    }
}

function changeToListView(id){
    currentView.type = "list"
    currentView.id = id
    render()
}

function changeToFilterView(filter){
    currentView.type = "filter"
    currentView.id = filters[filter]
    render()
}

function changeActiveTodoList(id){
    const newActiveList = todoLists.find(list => list.id === id)
    if(newActiveList.active === true) return;
    
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

function getTodoData(id){
    const wantedTodo = todos.find(todo => todo.id === id)
    
    const name = wantedTodo.name
    const description = wantedTodo.description
    const dueDate = wantedTodo.dueDate
    const priority = wantedTodo.priority

    return {name, description, dueDate, priority}
}

function editTodo(todoId, newData){
    const todo = todos.find(todo => todo.id === todoId)
    
    if(todo.name !== newData.name){
        todo.name = newData.name
    }

    if(todo.description !== newData.description){
        todo.description = newData.description
    }

    if(todo.dueDate !== newData.dueDate){
        todo.dueDate = newData.dueDate
    }
    
    if(todo.priority !== newData.priority){
        todo.priority = newData.priority
    }
    console.log(todo)
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
    getTodoData
}


