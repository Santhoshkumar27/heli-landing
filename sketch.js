var heli,helipad;
var helimg,helipadimg;
var bg,bgf;
var expoim,exp;
var ms,msi;
var tim=0000;
var time=0;
var gameo;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gend=0;
var misGroup,misImage;

var gameOver, restart;

var life=3;

var helia,explo,mscom;





function preload(){
 
   expoim=loadAnimation("exp.png")
  helimg=loadImage("heli.png");
  helipadimg=loadImage("helipad2.png")
  bg=loadImage("cityg.png");

  misImage=loadImage("mis.png")
  gameOverImg = loadImage("go.png");
  restartImg = loadImage("rs2.png");
  msi=loadImage("ms.png")

  helia= loadSound("helih.mp3");
  explo=loadSound("explosion.wav");
  mscom=loadSound("mscom.mp3");
  gameo=loadSound("gameo.mp3");

  


}
function setup() {
  createCanvas(1000,800);

  bgf = createSprite(500,400,1000,1000);
  bgf.addImage(bg);
  bgf.scale=1.15;
  
  
  



   helipad =createSprite(850, 720, 50, 50);
  helipad.addImage(helipadimg);
  helipad.scale=0.150;
  heli =createSprite(100, 150, 50, 50);
  heli.addAnimation("heli",helimg);
  heli.addAnimation("explosion",expoim);
  heli.scale=0.2;



  gameOver = createSprite(500,300);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(500,450);
  restart.addImage(restartImg);

  ms = createSprite(500,300);
  ms.addImage(msi);
  
  
 gameOver.scale = 0.4;
 restart.scale = 0.2;
 ms.scale=0.4;

 gameOver.visible = false;
  restart.visible = false;
  ms.visible=false;


  misGroup = new Group();
  

  
}

function draw() {
  background("lightblue");
  drawSprites();
  textSize(40);
  fill("darkblue");
  text("Life :  "+ life, 50,750);
  if (frameCount % 60=== 0) {

    tim+=0001;
    
  }
  textSize(30);
    fill("black");
    text("Time :  "+ tim, 50,700);
      
   
  if (gameState===PLAY){
    
    
    keyPressed();
    helia.play();

    heli.changeAnimation("heli");
 
 if(heli.y >=(helipad.y-40) && heli.x >=(helipad.x-20)) {
   hasDocked = true;
   helia.stop();
   ms.visible=true;
   heli.velocityX=0;
   heli.velocityY=0;
   misGroup.setVelocityXEach(0);
misGroup.setVelocityYEach(0);
misGroup.setLifetimeEach(-1);
misGroup.destroyEach();
tim=0;

mscom.play();
  
 }
 if (heli.isTouching(misGroup)){
 helia.stop();
 explo.play();

 heli.changeAnimation("explosion");
 
 misGroup.destroyEach();
 
  gameState=END;
  life -= 1;
  
 // console.log(gameState);
}
// console.log(heli.x);
 //onsole.log(heli.y);
 //console.log(helipad.x);
 //console.log(helipad.y);
 //console.log(life);

}
else if (gameState === END) {
  
  
  
 
    restart.visible = true;
heli.velocityX=0;
heli.velocityY=0


misGroup.setVelocityXEach(0);
misGroup.setVelocityYEach(0);
misGroup.setLifetimeEach(-1);
misGroup.destroyEach();

 if(mousePressedOver(restart)) {
    reset();

  }
  if(life==0){
    gameOver.visible=true;
    restart.visible=false;
    tim=0
    gameo.play();

  }
  
}
spawnmis();


 // drawSprites();
}
function keyPressed
(){
  
  if(keyDown("UP_ARROW")){
    heli.velocityY =-1;
    
   
  }
   if(keyDown("DOWN_ARROW")){
    heli.velocityY= +1;
  
  }
   if(keyDown("LEFT_ARROW")){
    heli.velocityX =-1;
   
  }
   if(keyDown("RIGHT_ARROW")){
    heli.velocityX= +1;
    


}
}

function spawnmis() {
  
  if (frameCount % 90=== 0) {
    var mis = createSprite(displayWidth/2+300,displayHeight/2+100,40,10);
    mis.y = Math.round(random(80,550));
    mis.addImage(misImage);
    mis.scale = 0.03;
    mis.velocityX = -3;
    
     
    mis.lifetime = 300;
    
    
    
    misGroup.add(mis);
  }
  
}

function reset(){
  heli.x=100;
  heli.y=150;
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
    misGroup.destroyEach();
  
  
  

  
}