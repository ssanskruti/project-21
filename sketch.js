var santa;
var score=0;
var PLAY=1;
var gameState=PLAY;
var END=2

function preload(){
s=loadAnimation("santa1.png","santa2.png","santa3.png","santa4.png")
g=loadImage("ground1.png");
bg=loadImage("bg.png");
deer1=loadImage("deer1.png");
deer2=loadImage("deer2.png");
deer3=loadImage("deer3.png");
collided=loadAnimation("santa3.png");
restart=loadImage("restart.png");
gameover=loadImage("gameover.png");
}

function setup() {
 createCanvas(600,400);
 santa=createSprite(50,260,20,50);
 santa.addAnimation("run",s);
 santa.addAnimation("collided",collided);
 santa.scale=0.4;

 ground=createSprite(200,353,1500,10);
 ground.addImage("ground",g);

 deersGroup=new Group();

 gameOver=createSprite(300,200);
 gameOver.addImage(gameover);
 gameOver.scale=0.7;

 Restart=createSprite(300,340);
 Restart.addImage(restart);
 Restart.scale=0.5
}

function draw() {
 background(bg);
 text("Score:"+score,500,50);
 console.log(santa.y)
 
 if(gameState===PLAY){
 gameOver.visible=false;
 Restart.visible=false;
  ground.velocityX=-(3+2*score/20000);
  score=score+Math.round(frameount=80);
  console.log(santa.y);
  if(ground.x<0){
    ground.x=ground.width/2
    }
  if(keyDown("space")&&santa.y>=268){
   santa.velocityY=-15
   }
   santa.velocityY=santa.velocityY+0.7;
   spawnDeers();
   if(deersGroup.isTouching(santa)){
    gameState=END;
   }
 }

 else if(gameState===END){
  gameOver.visible=true;
  Restart.visible=true;
  ground.velocityX=0;
  santa.velocityY=0;
  deersGroup.setVelocityXEach(0);
  santa.changeAnimation("collided")
 }
 
 santa.collide(ground);
 if(mousePressedOver(Restart)){
  reset();
 }
 
 drawSprites();
}

function spawnDeers(){
 if(frameCount%100===0){
 deer=createSprite(400,310,20,50);
 deer.velocityX=-(6+score/2000);
 var rand=Math.round(random(1,3));
 switch(rand){
  case 1:deer.addImage(deer1);
         break;
  case 2:deer.addImage(deer2);
         break;
  case 3:deer.addImage(deer3);
         break;
 }
 deer.scale=0.2;
 deer.lifetime=300;
 deersGroup.add(deer);
 }   
}
function reset(){
 gameState=PLAY;  
 gameOver.visible=false;
 Restart.visible=false;
 deersGroup.destroyEach();
 score=0;
}