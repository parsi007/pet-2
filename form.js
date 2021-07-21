class Form {

    constructor() {
      this.name = createInput("ENTER ITS NAME");
      this.done = createButton('Done');
      this.call = createElement('h4');
    }
    hide(){
      this.done.hide();
      this.name.hide();
    }
  
    display(){
  
      this.name.position(600,600);
      this.done.position(620, 640);
  
      this.done.mousePressed(()=>{
        this.name.hide();
        this.done.hide();
        this.call.html("Name :"+this.name.value())
        this.call.position(600, 600);
      });
  
    }
  }