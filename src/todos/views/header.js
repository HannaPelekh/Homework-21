import "./header.css"
export default class HeaderTodoView {
    #container;
    #buttonCreate;
    #titleCreate = null;
    #bodyCreate = null;    
    #ErrMsgTitle = null;
    #ErrMsgBody = null;
    #inputBox = null;  
    #IS_DATA_VALID = {
        title: false,
        body: false,  
    };
    constructor(container) {
    this.#container = container;    
    this.init()
    }
    static CLASSES = { 
        title: "title",
        body: "body",
        button_create: "button_create",
        input_title: "input_title",
        input_body: "input_body",
        title_error: "title_error",
        body_error: "body_error",
        add_container: "add_container",
    }   
    init(){
        this.renderHeader();         
        this.initHeaderClasses();         
    }
    initHeaderClasses(){
        this.#buttonCreate = this.#container.querySelector(`.${HeaderTodoView.CLASSES.button_create}`); 
        this.#titleCreate = this.#container.querySelector(`.${HeaderTodoView.CLASSES.input_title}`); 
        this.#bodyCreate = this.#container.querySelector(`.${HeaderTodoView.CLASSES.input_body}`);
        this.#ErrMsgTitle = this.#container.querySelector(`.${HeaderTodoView.CLASSES.title_error}`);
        this.#ErrMsgBody = this.#container.querySelector(`.${HeaderTodoView.CLASSES.body_error}`);
        this.#inputBox = this.#container.querySelector(`.${HeaderTodoView.CLASSES.add_container}`);       
    };
    renderHeader() { 
        this.#container.innerHTML = `        
            <div id="add_container" class="add_container">
                <input type="text" class="input_create input_title" placeholder="ToDo Title" id="input_title">
                <input type="text" class="input_create input_body" placeholder="ToDo Body" id="input_body">
                <button id="button_create" class="button_create">Create ToDo</button>
            </div> 
            <div class="error">
                <div class="title_error"></div>
                <div class="body_error"></div>
            </div>`
    };        
     
    onTodoCreate = (e) => { 
        this.#buttonCreate.disabled = true;

        if(e.target.closest(`.${HeaderTodoView.CLASSES.input_title}`)){
            this.#titleCreate.addEventListener("keyup", this.validateTitle);
        }
        if(e.target.closest(`.${HeaderTodoView.CLASSES.input_body}`)){
            this.#bodyCreate.addEventListener("keyup", this.validateBody);
        }
        if(e.target.closest(`.${HeaderTodoView.CLASSES.add_container}`)){
            this.#inputBox.addEventListener("keyup", this.validateData);
        }
        if(e.target.closest(`.${HeaderTodoView.CLASSES.button_create}`)){              
            const title = this.#titleCreate.value;            
            const body = this.#bodyCreate.value;
            const todo = {title, body}
            return todo;   
        };         
    };  
    validateTitle =(e) => {                       
        if (!e.target.value.trim()) {            
            this.#ErrMsgTitle.innerText = "";
            this.#buttonCreate.disabled = true;
            this.#IS_DATA_VALID[e.target.id] = false;    
            return;
        }
        if (e.target.value.trim().length <= 3) {
            this.#ErrMsgTitle.innerText = "Error, Title should be more then 3 symbols";
            this.#buttonCreate.disabled = true;
            this.#IS_DATA_VALID[e.target.id] = false;   
            return;
        }
        this.#IS_DATA_VALID[e.target.id] = true;
        this.#ErrMsgTitle.innerText = "";        
        } 
    validateBody = (e) => {            
        if (!e.target.value.trim()) {
            this.#ErrMsgBody.innerText = "";
            this.#buttonCreate.disabled = true;
            this.#IS_DATA_VALID[e.target.id] = false;
            return;
        }
        if (e.target.value.trim().length <= 3) {
            this.#ErrMsgBody.innerText = "Error, Body should be more then 3 symbols";
            this.#buttonCreate.disabled = true;
            this.#IS_DATA_VALID[e.target.id] = false;
            return;
        }    
        this.#IS_DATA_VALID[e.target.id] = true;
        this.#ErrMsgBody.innerText = "";
    } 
    validateData = (e) => { 
        const target = e.target; 
        this.#buttonCreate.disabled = !(
            this.#IS_DATA_VALID["input_title"] &&      
            this.#IS_DATA_VALID["input_body"]
        );          
    } 
    clearDate(){
            this.#titleCreate.value = "";
            this.#bodyCreate.value = "";   
    }
}
