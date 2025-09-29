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
        return isThisWeek(new Date(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate())) 
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
        return format(this.dueDate, "dd/MM/yyyy")
    }
}