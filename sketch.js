var dog, happyimg,normalimg, database,  foodStock;
var feed,add;
var lastfed;
var foodobj;
var call;
var front,milk;

function preload(){
  normalimg=loadImage("dogImg.png");
  happyimg=loadImage("dogImg1.png");
  milk=loadImage("Milk.png");
}

function setup() {
  createCanvas(800, 700);

  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value",readstock);
  foodobj = new Food();

  call=new Form();

  front=createSprite(500,400,0,0);
  front.addImage(milk);
  front.scale=0.12;
  front.visible=false;

  dog=createSprite(600,400,150,150);
  dog.addImage(normalimg);
  dog.scale=0.2;
  
  feed  = createButton("FEED THE DOG");
  feed.position(700,70);
  if(foodStock===0){
    feed.mousePressed(error);
  }else{
    feed.mousePressed(feeddog);
  }

  add  =  createButton("ADD FOOD");
  add.position(600,70);
  add.mousePressed(addfoods);
}


function draw() {  
  background(46, 139, 87);
  //fill("black");
  foodobj.display();
  call.display();
  
  front.display();

  if(foodStock<=0){
    foodStock=0;
    dog.addImage(normalimg);
    front.visible=false;
  }
  
  fedtime=database.ref('feedtime');
  fedtime.on("value",function(data){
   lastfed=data.val();
  })
  textSize(16);
  stroke(0);
  fill("white");
  text("Food Remaing :"+foodStock,350,100);
  if(lastfed>=12){
    text("LAST FED TIME  : "+lastfed%12+"PM",50,100);
  }else if(lastfed===0){
    text("LAST FED TIME : 12AM",50,100)
  }else{
    text("LAST FED TIME :"+lastfed+"AM",50,100);
  }
  drawSprites();

}

function readstock(data){
  foodStock = data.val();
  foodobj.updatefoodstock(foodStock);
}
function addfoods(){
  foodStock++
  front.visible=false;
  dog.addImage(normalimg);
  database.ref('/').update({
    food:foodStock
  })
}
function feeddog(){
  
  foodobj.updatefoodstock(foodStock-1);
  front.visible=true;
  dog.addImage(happyimg);
  database.ref('/').update({
    food:foodobj.getfoodstock(),
    feedtime:hour()

  })

}

function error(){
  text("NO FOOD LEFT FOR THE PET",400,400);
}