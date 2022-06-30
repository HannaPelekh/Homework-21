import MainViewTodo from "./views/mainView";
import TodoModel from "./model";

export default class TodoController {
    #container = null;
    #view = null;
    #model = null;
    #todos = null;

    constructor(container) {
       this.#container = container;
       this.#view = new MainViewTodo(this.#container, {
        onCreate: this.onTodoCreate,
        onComplete: this.onTodoComplete,
        onDelete: this.onTodoDelete,
        onSave:  this.onSaveTodo,
        onCurent: this.onGetCurentTodo,        
        });
       this.#model = new TodoModel();
       this.init();

    }
    async init() {
        this.#todos = await this.#model.getTodos();             
        this.#view.renderTodos(this.#todos); 
    }
    onTodoCreate = async (todo) => { 
        this.#view.createSingleTodo(await this.#model.crateTodo(todo));          
    }
    onTodoComplete = (id) => {           
        const todo = this.#todos
            .find(t => t.id === id);
        todo.isComplete = true;         
        this.#model.completeTodo(id, todo).id
    }
    onTodoDelete = (id) => { 
        return this.#model.deleteTodo(id);        
    }
    onGetCurentTodo = (id) => { 
        return this.#todos.find(t => t.id === id);
    }
    onSaveTodo = (todo) => { 
        this.#model.editeTodo(todo);   
        this.#view.saveNewTodo(todo);      
    }
}



 