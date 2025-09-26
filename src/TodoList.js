export default class TodoList{
    constructor(name, active = false, id = crypto.randomUUID()){
        this.name = name;
        this.id = id;
        this.active = active;
    }

    setActiveStatus(newStatus){
        this.active = newStatus
    }
}