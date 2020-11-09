//Create variables here
var dog,hDog,dogI,foodS,foodStock;
var database;
var position;

function preload(){
  //load images here 
  dogI=loadImage("images/dogImg.png")
  hDog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  
  database=firebase.database()

  dog = createSprite(250,250,10,10);
  dog.shapeColor = "red";
  dog.addImage(dogI)
  dog.scale=0.5

  foodStock=database.ref('food')
  foodStock.on("value",readStock,writeStock)
  //database.ref('/').on("value",readStock,writeStock)
}

function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    foodS=foodS-1;
    writeStock(foodS)
    dog.addImage(hDog)
  }

  drawSprites();

  //textSize(20)
  fill("black")
  //stroke("white")
  text("PRESS UP_ARROW KEY TO FEED DRAGO MIKI",120,150)
 
  fill("black")
  text("FOOD STOCK:"+foodS,50,250)

}

//functions
/*function readPosition(data){
  if(position!==undefined){
  position=data.val()
  console.log(position)
  dog.x=position.x;
  dog.y=position.y;
}}

function showError(){
  console.log(error)
}*/

function readStock(data){
  foodS=data.val()
}

function writeStock(x){  
  if(x<=0){
    x=0
  }
  database.ref('/').update({
    food:x})
}





