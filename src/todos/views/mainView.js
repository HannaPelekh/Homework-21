import HeaderTodoView from "./header";
import TodoListView from "./list";
import EditTodoView from "./edit";

export default class MainViewTodo{
    #container = null;
    #headerContainer = null;    
    #listContainer = null;
    #editContainer = null;
    #headerView = null;
    #listView = null;
    #editView = null;   
    #options = null;
    #btnCreate = null;  
    #title = null;
    #body = null;

    static CLASSES = {    
        header: "header",
        list_container: "list_container",
        edit_container: "edit_container",
        button_create: "button_create",
        todo_complete: "todo_complete",        
        hideComplete_Btn: "hide_element",
        close: "close",
        complete: "complete_btn",
        active_item: "active_item",
        title: "title",
        body: "body"
    }    

    constructor(container, options) {
        this.#container = container;   
        this.#options = options; 
        this.init()
        this.#listView = new TodoListView(this.#listContainer);
        this.#headerView = new HeaderTodoView(this.#headerContainer);
        this.#editView = new EditTodoView(this.#editContainer);            
          
    }

    init(){
        this.renderView();
        this.initContainers(); 
        this.initListeners();
    }
     
    renderView() { 
        this.#container.innerHTML = `        
            <div id="header" class="header">header</div> 
            <div class="todo_container">
                <div class="list_container">list_container</div>  
                <div class="edit_container">edit_container</div>
            </div>`
    };
    initContainers(){        
        this.#headerContainer = this.#container.querySelector(`.${MainViewTodo.CLASSES.header}`);
        this.#listContainer = this.#container.querySelector(`.${MainViewTodo.CLASSES.list_container}`);
        this.#editContainer = this.#container.querySelector(`.${MainViewTodo.CLASSES.edit_container}`);                        
    }; 
    renderTodos(todos) {
        this.#listView.renderTodos(todos);
    };      
    initListeners() {
        this.#container.addEventListener('click',this.onTodoClick); 
    };  
    createSingleTodo = (todo) => {        
        this.#listView.createSingleTodo(todo);
    };   
    onTodoClick =(e) => {
        const target = e.target;    

        if(this.#headerView.onTodoCreate(e)){
            this.#options.onCreate(this.#headerView.onTodoCreate(e));  
            this.#headerView.clearDate(); 
            return;
        }
        if(this.#listView.onTodoComplete(e)){
            this.#options.onComplete(this.#listView.onTodoComplete(e));   
            return;
        }
        if(this.#listView.onTodoEdit(e)){   
            const curentTodoID = this.#listView.onTodoEdit(e);
            const curentTodo = this.#options.onCurent(curentTodoID);
            this.#editView.EditTodo(curentTodoID, curentTodo);             
            return;
        }
        if(this.#editView.onTodoSave(e)){            
            this.#options.onSave(this.#editView.onTodoSave(e));  
            return;

        }
        if(this.#listView.onTodoDelete(e)){
            this.#options.onDelete(this.#listView.onTodoDelete(e));
            return;
        }        
    } 
    saveNewTodo = (todo) => {
        this.#listView.saveNewTodo(todo); 
    }   
}

   
    