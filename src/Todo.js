import { format, isAfter, isBefore, isEqual, isThisWeek } from "date-fns"

export default class Todo {
    constructor(listId, name, description, dueDate, priority, id = crypto.randomUUID(), done = false, expanded = false) {
        this.listId = listId;

        this.name = name;
        this.description = description;
        this.dueDate = dueDate ? new Date(dueDate) : null
        this.priority = priority;

        this.id = id;
        this.done = done;
        this.expanded = expanded;
    }

    toggleExpanded() {
        this.expanded = !this.expanded
    }

    isDueToday() {
        if(!this.dueDate) return
        const date = new Date()
        return isEqual(new Date(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate()),
            new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    }

    isDueTomorrow(){
        if(!this.dueDate) return
        
        const date = new Date()
        return isEqual(new Date(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate()),
            new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))
    }

    isDueThisWeek(){
        if(!this.dueDate) return
        const date = new Date()
        return isThisWeek(new Date(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate()), { weekStartsOn: 1 }) 
        && isAfter(new Date(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate()), new Date(date.getFullYear(), date.getMonth(), date.getDate())) 
        || this.isDueToday()
    }

    isOverDue(){
        if(!this.dueDate) return
        const date = new Date()
        return isBefore(new Date(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate()),
            new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    }

    getFormattedDate(){
        return this.dueDate ? format(this.dueDate, "dd/MM/yyyy") : null
    }

    getRawDate(){
        if(!this.dueDate) return
        return `${this.dueDate.getFullYear()}-${(this.dueDate.getMonth() + 1).toString().padStart(2, "0")}-${this.dueDate.getDate().toString().padStart(2, "0")}`
    }
}