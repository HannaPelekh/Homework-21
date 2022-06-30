import "./edit.css"

export default class EditTodoView {
    #container;     
    #curentID = null; 
    #editTodo = null;
    #editTitle = null;
    #editBody = null;
    #Save_btn = null;
    #ErrMsgEditTitle = null;
    #ErrMsgEditBody = null;
    #inputEditBox = null;  
    #IS_DATA_VALID = {
        title: false,
        body: false,  
    };

    static CLASSES = {
        todo_items: "todo_items",
        show_edit: "show_edit",
        edit_title: "edit_title",
        edit_body: "edit_body",
        save: "save",
        edit_title_error: "edit_title_error",
        edit_body_error: "edit_body_error",
        edit_todo: "edit_todo",
    }
    constructor(container) {
    this.#container = container;    
    this.init()
    }
    init(){
        this.renderEdit(); 
        this.initEditClasses();   
    }
    initEditClasses() {
        this.#editTitle = this.#container.querySelector(`.${EditTodoView.CLASSES.edit_title}`);
        this.#editBody = this.#container.querySelector(`.${EditTodoView.CLASSES.edit_body}`);
        this.#Save_btn = this.#container.querySelector(`.${EditTodoView.CLASSES.save}`);
        this.#ErrMsgEditTitle = this.#container.querySelector(`.${EditTodoView.CLASSES.edit_title_error}`);
        this.#ErrMsgEditBody = this.#container.querySelector(`.${EditTodoView.CLASSES.edit_body_error}`);
        this.#inputEditBox = this.#container.querySelector(`.${EditTodoView.CLASSES.edit_todo}`);
    }
    renderEdit() { 
        this.#container.innerHTML = `       
            <h2>Edit ToDo</h2>
            <div class="error_edit">
                <div class="edit_title_error"></div>
                <div class="edit_body_error"></div>
            </div>
            <div class="edit_todo">
                <input type="text" class="edit_title" id="edit_title" placeholder="ToDo Title">
                <input type="text" class="edit_body" id="edit_body" placeholder="ToDo Body">
                <button id="button_change" class="save">Save ToDo</button>
            </div>`
    };    
    EditTodo(id, todo){ 
        this.#curentID = id; 
        this.#editTodo = todo;   
        const editTitle = todo.title;
        const editBody = todo.body;         
        this.#container.classList.add(EditTodoView.CLASSES.show_edit);       
        this.#editTitle.value = editTitle;
        this.#editBody.value = editBody; 
        const curentTodo = {editTitle, editBody}; 
        return this.#curentID, curentTodo;
    }
    onTodoSave = (e) => {        
        this.#Save_btn.disabled = true;

        if(e.target.closest(`.${EditTodoView.CLASSES.edit_title}`)){
            this.#editTitle.addEventListener("keyup", this.validateEditTitle);
        };
        if(e.target.closest(`.${EditTodoView.CLASSES.edit_body}`)){
            this.#editBody.addEventListener("keyup", this.validateEditBody);
        }
        if(e.target.closest(`.${EditTodoView.CLASSES.edit_todo}`)){
            this.#inputEditBox.addEventListener("keyup", this.validateEditData);
        }
        if(e.target.closest(`.${EditTodoView.CLASSES.save}`)){  
            const editTodo = {...this.#editTodo,  
                id: this.#curentID, 
                title: this.#editTitle.value, 
                body: this.#editBody.value};             
            this.#container.classList.remove(EditTodoView.CLASSES.show_edit);  
            return this.#curentID, editTodo            
        };             
    };  
    validateEditTitle = (e) => {                       
        if (!e.target.value.trim()) {            
            this.#ErrMsgEditTitle.innerText = "";
            this.#Save_btn.disabled = true;
            this.#IS_DATA_VALID[e.target.id] = false;    
            return;
        }
        if (e.target.value.trim().length <= 3) {
            this.#ErrMsgEditTitle.innerText = "Error, Title should be more then 3 symbols";
            this.#Save_btn.disabled = true;
            this.#IS_DATA_VALID[e.target.id] = false;   
            return;
        }
        this.#IS_DATA_VALID[e.target.id] = true;
        this.#ErrMsgEditTitle.innerText = "";        
    }; 
    validateEditBody = (e) => {            
        if (!e.target.value.trim()) {
            this.#ErrMsgEditBody.innerText = "";
            this.#Save_btn.disabled = true;
            this.#IS_DATA_VALID[e.target.id] = false;
            return;
        }
        if (e.target.value.trim().length <= 3) {
            this.#ErrMsgEditBody.innerText = "Error, Body should be more then 3 symbols";
            this.#Save_btn.disabled = true;
            this.#IS_DATA_VALID[e.target.id] = false;
            return;
        }    
        this.#IS_DATA_VALID[e.target.id] = true;
        this.#ErrMsgEditBody.innerText = "";
    } 
    validateEditData = (e) => { 
        const target = e.target;              
        this.#Save_btn.disabled = !(
            this.#IS_DATA_VALID["edit_title"] &&      
            this.#IS_DATA_VALID["edit_body"]
        );          
    }
};
    
    

