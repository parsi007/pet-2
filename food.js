class Food{
    constructor(){
        this.foodstock = 0;
        this.lastfed;
        this.image = loadImage("Milk.png");
       }
    
       updatefoodstock(food){
         this.foodstock=food;
       }
       
       detuctfood(){
         if(this.foodstock>0){
           this.foodstock--;
         }
        }
       
        getfoodstock(){
          return this.foodstock;
       }

       getfedtime(time){
        this.lastfed=time;
       }

       display(){
        var x=80,y=100;
        imageMode(CENTER); 
        if(this.foodstock!==0){
          for(var i = 0;i<this.foodstock;i++){
            if(i%10===0){
              x=80;
              y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
          }
        }
      }

}