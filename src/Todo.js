export default class Todo{
    constructor(listId, name, description, dueDate, priority, id = crypto.randomUUID(), done = false, expanded = false){
        this.listId = listId;
        
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        
        this.id = id;
        this.done = done;
        this.expanded = expanded;
    }
}