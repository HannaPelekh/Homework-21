export default class Paint{

    #paintComponent = null;
    #colors_container =  null;      
    #buttons_container =  null;
    #canvas = null;
    #List_container = null;    
    #brush_color = null; 
    #size_button = null; 
    #drawing_tool = null;
    #array_size = []; 
    #array_color = [];  
    #array_tools = []; 
    #current = {
        tool: "brush",
        color: "#ff82bf",
        size: 30}    
    #mouse = { x:0, y:0 };
    #draw = false;   
    #ctx = null; 
    static CLASSES = {
        paint_container: "paint-container",
        buttons_container: "buttons-container",
        list_container: "list-container",
        colors_container: "colors-container",
        btn_size_pen: "btn_size_pen",
        button: "button",
        color: "color",
        tools: "tools",
        canvas: "canvas",
        active: "active", 
        big: "big", 
        medium: "medium",
        small: 'small',             
    }
    constructor(el) {         
        this.#paintComponent = el;
        this.init(); 
    }
    init() {
        this.renderPaintComponent();
        this.setContainers();
        this.setCanvasSize();        
        this.setCanvasContext(); 
        this.setListenersSettings(); 
        this.setLineStyle();
        this.setListenersDrawing()
    }
    renderPaintComponent(){
        const content = this.createPaintComponent();        
        this.#paintComponent.innerHTML = content;
    }  
    createPaintComponent(){
        return      `<div class="${Paint.CLASSES.paint_container}">
                        <div class="${Paint.CLASSES.buttons_container}">
                            <div class="${Paint.CLASSES.btn_size_pen} ${Paint.CLASSES.active}" id="30">
                                <div class="${Paint.CLASSES.big}"></div>              
                            </div>
                            <div class="${Paint.CLASSES.btn_size_pen}" id="20">
                                <div class="${Paint.CLASSES.medium}"></div>                            
                            </div>
                            <div class="${Paint.CLASSES.btn_size_pen}" id="10">
                                <div class="${Paint.CLASSES.small}"></div>                            
                        </div>
                        <div class="${Paint.CLASSES.tools} ${Paint.CLASSES.active}" id="brush"></div>
                        <div class="${Paint.CLASSES.tools}" id="eraser"></div> 
                        </div>
                        <div class="${Paint.CLASSES.list_container}">
                            <canvas class="${Paint.CLASSES.canvas}"></canvas>
                        </div>
                        <div class="${Paint.CLASSES.colors_container}">
                            <div class="${Paint.CLASSES.color} ${Paint.CLASSES.active} pink" id="#ff82bf"></div>
                            <div class="${Paint.CLASSES.color} green" id="#648c01"></div>
                            <div class="${Paint.CLASSES.color} yellow" id="#ffd601"></div>
                            <div class="${Paint.CLASSES.color} blue" id="#07B1BC"></div>
                            <div class="${Paint.CLASSES.color} violet" id="#9356A0"></div>                           
                        </div>
                    </div>`
    }
    setContainers = () => {
        this.#colors_container =  this.#paintComponent
            .querySelector(`.${Paint.CLASSES.colors_container}`);
        this.#buttons_container =  this.#paintComponent
            .querySelector(`.${Paint.CLASSES.buttons_container}`);
        this.#List_container =  this.#paintComponent
            .querySelector(`.${Paint.CLASSES.list_container}`)
        this.#canvas =  this.#List_container
            .querySelector(`.${Paint.CLASSES.canvas}`)
    }
    setCanvasSize(){
        this.#canvas.width = 900;
        this.#canvas.height = 800;
    }       
    setListenersSettings(){
        this.#colors_container.addEventListener('click',(e) => this.onChooseColors(e));
        this.#buttons_container.addEventListener('click',(e) => this.onChooseButtons(e));
    }
    setListenersDrawing(){
        this.#canvas.addEventListener('mousedown', (e) => {                
            if(this.#current.tool === "brush") {                                   
                this.startDrawing(e)
            }
            if(this.#current.tool === "eraser") {                    
                this.startErasing(e);
            }
        })           
        this.#canvas.addEventListener('mousemove',(e) => {
            if(this.#draw === true && this.#current.tool === "brush"){
                this.Drawing(e);
            }
            if(this.#draw === true && this.#current.tool === "eraser"){
                this.Erasing(e);
            }   
        }) 
        this.#canvas.addEventListener('mouseup', (e) => {
            if(this.#current.tool === "brush"){
                this.stopDrawing(e);
            }
            if(this.#current.tool === "eraser"){
                this.stopErasing(e);
            }  
        })
    }
    onChooseColors = (e)=>{   
        this.#brush_color = e.target.closest(`.${Paint.CLASSES.color}`)         
        if(this.#brush_color){ 
            this.#current.color = this.#brush_color.id;           
            this.#array_color = this.#colors_container.querySelectorAll(`.${Paint.CLASSES.color}`) 
            this.functionDeactivation(this.#array_color) 
            this.functionActivation(this.#brush_color); 
            this.setLineStyle();
        }          
        
    }   
    onChooseButtons(e){
        this.#size_button = e.target.closest(`.${Paint.CLASSES.btn_size_pen}`);
        this.#drawing_tool = e.target.closest(`.${Paint.CLASSES.tools}`)         
        if(this.#size_button){
            this.#current.size = this.#size_button.id  
            this.#array_size = this.#buttons_container.querySelectorAll(`.${Paint.CLASSES.btn_size_pen}`)  
            this.functionDeactivation(this.#array_size) 
            this.functionActivation(this.#size_button);            
            this.setLineStyle()
        }
        if(this.#drawing_tool){   
            this.#current.tool = this.#drawing_tool.id          
            this.#array_tools = this.#buttons_container.querySelectorAll(`.${Paint.CLASSES.tools}`)  
            this.functionDeactivation(this.#array_tools) 
            this.functionActivation(this.#drawing_tool);                
            this.setLineStyle();     
        }
    } 
    functionActivation(el) {
        el.classList.add(Paint.CLASSES.active);
    }    
    functionDeactivation(arr) {
        arr.forEach(el => {
            el.classList.remove(Paint.CLASSES.active)
        });
    } 
    setCanvasContext(){
        this.#ctx = this.#canvas.getContext('2d');
    }
    setLineStyle() {
        this.#ctx.strokeStyle = this.#current.color;
        this.#ctx.lineWidth = this.#current.size;
        this.#ctx.lineCap = 'round';          
    }    
    startDrawing(e){          
        this.#mouse.x = e.offsetX;
        this.#mouse.y = e.offsetY;
        this.#ctx.globalCompositeOperation = 'destination-over'; 
        this.#draw = true        
        this.Drawing(e);
        this.#ctx.moveTo(this.#mouse.x, this.#mouse.y);           
    }
    Drawing(e){ 
        this.#mouse.x = e.offsetX;
        this.#mouse.y = e.offsetY;    
        this.#ctx.lineTo(this.#mouse.x, this.#mouse.y);
        this.#ctx.stroke();
    }
    stopDrawing(e){          
        this.#mouse.x = e.offsetX;
        this.#mouse.y = e.offsetY; 
        this.#ctx.lineTo(this.#mouse.x, this.#mouse.y);
        this.#ctx.stroke();
        this.#ctx.beginPath();
        this.#draw = false; 
    }
    startErasing(e){
        this.#mouse.x = e.offsetX;
        this.#mouse.y = e.offsetY;
        this.#ctx.globalCompositeOperation = 'destination-out'; 
        this.#draw = true        
        this.Erasing(e); 
        this.#ctx.moveTo(this.#mouse.x, this.#mouse.y); 
        this.#ctx.arc(this.#mouse.x, this.#mouse.y, this.#current.size/2, 0, 2*Math.PI);
    }    
    Erasing(e){
        this.#mouse.x = e.offsetX;
        this.#mouse.y = e.offsetY;        
        this.#ctx.arc(this.#mouse.x, this.#mouse.y, this.#current.size/2, 0, 2*Math.PI);        
        this.#ctx.lineTo(this.#mouse.x, this.#mouse.y);
        this.#ctx.stroke()
    }
    stopErasing(e){
        this.#mouse.x = e.offsetX;
        this.#mouse.y = e.offsetY; 
        this.#ctx.lineTo(this.#mouse.x, this.#mouse.y);
        this.#ctx.arc(this.#mouse.x, this.#mouse.y, this.#current.size/2, 0, 2*Math.PI); 
        this.#ctx.stroke();
        this.#ctx.beginPath();
        this.#draw = false; 
    }

}        
