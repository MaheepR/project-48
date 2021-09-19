var bg,bgImg;
var boy,boyImg;
var ground;
var berryImg,branchImg,leafImg;
var berryG,branchG,leafG;
var platformG,platformImg;
var invisibleBoundary;
var hasTouched=false;
var score=0;
var gameState=1;
var jump_sound;
var bk_song;
var mute_btn;

function preload(){
  bgImg=loadImage("backgroud.png");
  boyImg=loadImage("Boy.png");
  platformImg=loadImage("platform.png");
  berryImg=loadImage("berry.png");
  branchImg=loadImage("branch.png");
  leafImg=loadImage("leaf.png");
  jump_sound=loadSound("jump.wav");
  bk_song=loadSound("sound1.mp3");
}


function setup() {
  createCanvas(800,600);

  bk_song.play();
  bk_song.setVolume(0.5);

  bg=createSprite(400,300);
  bg.addImage("bg",bgImg);
  bg.velocityY=1;
  bg.scale=7;

  boy=createSprite(400,580,50,50);
  boy.addImage("boy",boyImg);
  boy.scale=0.25;
  boy.setCollider("rectangle",1,-55,boy.width,boy.height);
  
  
  ground=createSprite(0,600,1600,10);
  ground.shapeColor="brown";

  invisibleBoundary1=createSprite(0,0,1600,10);
  invisibleBoundary1.visible=false;

  platformG=new Group();
  berryG=new Group();
  branchG=new Group();
  leafG=new Group();

  mute_btn = createImg('mute.png');
  mute_btn.position(750,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

}
function draw() {
  background(0);  

  
  if(bg.y>400){
    bg.y=300;
}

if(gameState===1){
score = score + Math.round(getFrameRate()/61);

if(keyDown("space")){
  boy.velocityY=-13;
  jump_sound.play();
}

if(keyDown("left")){
  boy.x-=5;
}

if(keyDown("right")){
  boy.x+=5;
}

boy.velocityY = boy.velocityY + 0.8;

boy.collide(invisibleBoundary1);

if(!hasTouched){
 if(boy.collide(ground)){
   score=0;  
 }
}

if(boy.collide(platformG)){
  hasTouched=true;
}

if(berryG.isTouching(boy)){
  score+=1;
}

if(leafG.isTouching(boy) ||  branchG.isTouching(boy) || boy.y>600 ){
  boy.destroy();
  handleGameOver();
}

//calling functions
spawnPlatforms();  
spawnBerries(); 
spawnLeaves();
spawnBranches();
     
if(score===100){
  win();
}
}

  drawSprites();

  textSize(25);
fill("yellow");
text("Score : "+score,20,580);

}

//spawning platforms
function spawnPlatforms(){
  if(frameCount % 150 === 0){
    var platform=createSprite(Math.round(random(100,600)),Math.round(random(200,400)),20,20);
    platform.addImage("platform",platformImg);
    platform.scale=0.9;
    platform.lifetime=150;
    platform.setCollider("rectangle",1,1,10,platform.height);
    platformG.add(platform);
  }
}

//spawning berries
function spawnBerries(){
  if(frameCount % 1200 === 0){
    var berry=createSprite(Math.round(random(200,700)),50,20,20);
    berry.addImage("berry",berryImg);
    berry.scale=0.5;
    berry.velocityY=15;
    berry.lifetime=185;
    berryG.add(berry);
  }
}

//spawning leaves
function spawnLeaves(){
  if(frameCount % 500 === 0){
    var leaf=createSprite(Math.round(random(200,700)),50,20,20);
    leaf.addImage("leaf",leafImg);
    leaf.velocityY=8;
    leaf.lifetime=185;
    leafG.add(leaf);
  }
}

//spawning branches
function spawnBranches(){
  if(frameCount % 250 === 0){
    var branch=createSprite(Math.round(random(200,700)),50,20,20);
    branch.addImage("branch",branchImg);
    branch.velocityY=8;
    branch.lifetime=185;
    branchG.add(branch);
  }
}

function handleGameOver(){
  gameState=2;
  swal({
    title: `Game Over`,
     text: "Oops you lost the game....!!!",
     text: "Your Score is " + score,
     imageUrl:
       "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
     imageSize: "100x100",
     confirmButtonText: "Thanks For Playing"  
   }); 
}

function win(){
  gameState=3;
  swal({
    title: `Game Won`,
    text: "Yay you won the game....!!!",
    imageUrl:
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize: "100x100",
    confirmButtonText: "Ok"
    
  });
  
}

function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

