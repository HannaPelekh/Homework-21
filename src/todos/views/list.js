import "./list.css"
export default class TodoListView {
    #container; 
    #currentEl= null;
    #currentTodo = null;
    #todos = null;     
   
    static CLASSES = {        
        todo_complete: "todo_complete",        
        hideComplete_Btn: "hide_element",
        close: "close",
        complete: "complete_btn",
        active_item: "active_item",
        title: "title",
        body: "body",
        todo_items: "todo_items",
    }   
    constructor(container) {
    this.#container = container; 
    

    }
    renderTodos(todos){        
        this.#todos = this.#container.innerHTML = todos.map(t => this.createTodoEl(t)).join('')        
        return this.#todos
    }
    createTodoEl(todo) {
        return `<div class="todo_items ${
            todo.isComplete ? TodoListView.CLASSES.todo_complete : ""
            }" id="${todo.id}">
            <div class="close"></div>
            <h2 class="title">${todo.title}</h2>
            <p class="body">${todo.body}</p>
            <div class="dateAndComplete">
                <div class="time_box">
                    <p>${this.createDate(todo.createDate)}</p>
                    <p>${this.createTime(todo.createTime)}</p>
                </div>    
                <button class="complete_btn ${
                    todo.isComplete ? TodoListView.CLASSES.hideComplete_Btn : ""
                    }" id="${todo.id}">complete</button>
            </div>
        </div>`
    }
   
    createDate(date){
        const newDate = moment(date).format("DD.MM.YYYY")        
        return newDate
    }
    createTime(time){
        const newTime = moment(time).format("HH:mm:ss")        
        return newTime
    } 
    createSingleTodo = (todo) => {        
        this.#container.insertAdjacentHTML('afterbegin',this.createTodoEl(todo));
    };   
    saveNewTodo = (todo) => {
         this.#currentTodo = this.#container.querySelector(`.${TodoListView.CLASSES.active_item}`);
        if(this.#currentTodo.id === todo.id){ 
            this.#currentTodo.querySelector(`.${TodoListView.CLASSES.title}`).innerHTML = todo.title;
            this.#currentTodo.querySelector(`.${TodoListView.CLASSES.body}`).innerHTML = todo.body;    
            this.#currentTodo.classList.remove(TodoListView.CLASSES.active_item); 
        }     
    }            
            
    getCurrentTodo(e){
        return this.#currentEl = e.target.closest(`.${TodoListView.CLASSES.todo_items}`);
    } 
    onTodoComplete = (e) => {
        this.getCurrentTodo(e);
        if(e.target.closest(`.${TodoListView.CLASSES.complete}`)){                        
            this.#currentEl.classList.add(TodoListView.CLASSES.todo_complete); 
            e.target.closest(`.${TodoListView.CLASSES.complete}`).classList
            .add(TodoListView.CLASSES.hideComplete_Btn)
            return this.#currentEl.id;
        }
    }
    onTodoEdit = (e) => {        
        this.getCurrentTodo(e);
        if(e.target.closest(`.${TodoListView.CLASSES.title}`) || 
            e.target.closest(`.${TodoListView.CLASSES.body}`)){  
            this.removeTodoActivClass();         
            this.setTodoActivClass(e);            
            return this.#currentEl.id;
        }
    }    
    removeTodoActivClass = () => {    
        [...this.#container.children].forEach(todo => todo.classList.remove(TodoListView.CLASSES.active_item));        
    }
    setTodoActivClass(e) { 
        this.getCurrentTodo(e);
        this.#currentEl.classList.add(TodoListView.CLASSES.active_item); 
    } 
    onTodoDelete(e) {  
        this.getCurrentTodo(e);
        if(e.target.closest(`.${TodoListView.CLASSES.close}`)){           
            this.#currentEl.remove();              
            return this.#currentEl.id;  
        }
    };
   
 
}