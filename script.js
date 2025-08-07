//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, cookie, fallingObject;
let captureImg, cookieImg, fallingImg, bgImg, bgImg2;
let buttonImg1, buttonImg2;
let honey;
let score = 0;

/* PRELOAD LOADS FILES */
function preload(){
  captureImg = loadImage('assets/plate.png');
  fallingImg = loadImage('assets/pastry.png');
  cookieImg = loadImage('assets/cookie.png');
  bgImg = loadImage('assets/title page.png');
  bgImg2 = loadImage('assets/plain bg.png');
  buttonImg = loadImage('assets/play.png');
  buttonImg2 = loadImage()
  honey = loadFont('assets/MISTERHONEY-Regular.ttf');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

  //set up homescreen;
  
  //create play and direction button
  playButton = new Sprite(buttonImg,width/2 -60, height/2 + 150);
  directionButton = new Sprite(width/2 + 62, height/2 +150);
  
  //resizeImg
  captureImg.resize(80,0);
  fallingImg.resize(45,0);
  cookieImg.resize(45,0);
  buttonImg.resize(145,0);
  //create goups
  let buttons = new Group();
  
  //Create catcher 
  catcher = new Sprite(captureImg,-200,-370,"k");

  //Create objects 
  fallingObject = new Sprite(fallingImg,-400,370);
  cookie = new Sprite(cookieImg,-400,-370);

  // set standards
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;

  cookie.color = color(0,128,128);
  cookie.vel.y = 2;
  cookie.rotationLock = true;

  buttons.add(playButton);
  buttons.add(directionButton);
}
/* DRAW LOOP REPEATS */
function draw(){
  background(bgImg);
  //display all buttons
  playButton.w = 100;
  playButton.h = 50;
  playButton.collider = 'k';
  playButton.color = (165,122,132);
  
  directionButton.w = 100;
  directionButton.h = 50;
  directionButton.collider = 'k';
  directionButton.color = (165,122,132);
  fill('black');
  textFont('arial');
  
  directionButton.text = 'directions';
  
  //show directions screen
 
  //show play screen and play game
  if(playButton.mouse.presses()){
    background(bgImg2);
    playButton.pos = {x: -400, y: -370};
    directionButton.pos = {x: -400, y:-370};
    fallingObject.pos = {x: random(width), y: 0};
    catcher.x = 200;
    catcher.y = 370;
  
    //If fallingObject reaches bottom, move back to random     position at top.
    if(cookie.y >= height){
      cookie.y = 0;
      cookie.x = random(width);
      cookie.vel.y = random(1,5);
      score = score - 2;
    } 
    if(fallingObject.y >= height){
      fallingObject.y = 0;
      fallingObject.x = random(width);
      fallingObject.vel.y = random(1,5);
      score--;
    }
    //move catcher
    if(kb.pressing("left")){
      catcher.vel.x = -6;
    } else if(kb.pressing("right")){
      catcher.vel.x = 6;
    } else{
      catcher.vel.x = 0;
    }
    //stops catcher from edge 
    if(catcher.x < 50){
      catcher.x = 50;
    }else if(catcher.x > 350){
      catcher.x = 350;
    }
    
    //If fallingObject collides with catcher, move back to     random position at top.
    if(cookie.collides(catcher)){
      cookie.y = 0;
      cookie.x = random(width);
      cookie.vel.y = random(1,5);
      cookie.direction = 'down';
      score = score + 2;
    }
    if(fallingObject.collides(catcher)){
      fallingObject.y = 0;
      fallingObject.x = random(width);
      fallingObject.vel.y = random(1,5);
      fallingObject.direction = 'down';
      score++; 
    }
    //draw score 
    fill(0, 128, 128);
    textSize(20);
    text(score, 10, 30);
  
    //lose screen
    if(score == -3){
      youLose();
    if(mouseIsPressed){
      restart();
      }
    }
    //win screen
    if(score == 20){
      youWin();
    if(mouseIsPressed){
      restart();
      }
    }
  }
}
//FUNCTIONS
function play(){
  
}
function youWin(){
  //move sprites
    catcher.pos = { x: 600, y: -300 };
    fallingObject.pos = { x: -100, y: 0 };
    cookie.pos = { x: -100, y: 0 };

    textFont(honey);
    textSize(20);
    fill(0);
    text("You win! :)", width/2 - 50, height/2 - 30); 
    textSize(12);
    text("Click anywhere to play again.", width/2 - 70, height/2);
}
function restart(){
  score = 0;
  catcher.pos = {x: 200, y: 380};
  cookie.y = 0;
  fallingObject.y = 0;
  fallingObject.x = random(width);
  fallingObject.vel.y = random(1,5);
  objects.direction = 'down';
  cookie.x = random(width);
  cookie.vel.y = random(1,5);
}
function youLose(){
  //move sprites
    catcher.pos = { x: 600, y: -300 };
    cookie.pos = { x: -100, y: 0 };
    fallingObject.pos = { x: -100, y: 0 };

    textFont(honey);
    textSize(20);
    fill(0);
    text("You lose!", width/2 - 50, height/2 - 30); 
    textSize(12);
    text("Click anywhere to play again.", width/2 - 70, height/2);
}