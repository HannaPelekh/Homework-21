import Http from "../shared/http";


export default class TodoModel {
    #http = null;
    #todos = null;
    #todo = null;
    constructor() {
        this.#http = new Http();
        this.getTodos()
    };
    async getTodos() {
        this.#todos = await this.#http.get();
        return this.#todos;        
    };
    crateTodo (todo) {
        return this.#http.create({...todo, isComplete: false});
    }
    completeTodo = (id, todo) => {         
        return this.#http.update(id, todo);
    }
    deleteTodo = (id) => {
        return this.#http.delete(id);
    }
    editeTodo = (todo) => { 
        return  this.#http.update(todo.id, todo);
        
    }
}