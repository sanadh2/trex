let trex_running;
let groundImage;
let cloudImage;
let trex;
let ground;
let cloud;
let ground2;
let obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
let obstaclesGroup;
let trexCollided;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
let cloudGroup;
let score = 0;
let j_sound;
let gameOver;
let restart_img;
let restart;
let over;
let over_img;

let checkpoint;
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trexCollided = loadAnimation("trex_collided.png");
  j_sound = loadSound("jump.mp3");
  gameOver = loadSound("die.mp3");
  over_img = loadImage("gameOver.png");
  checkpoint = loadSound("checkpoint.mp3");
  restart_img = loadImage("restart.png");
}

function setup() {
  createCanvas(1000, 500);
  trex = createSprite(50, 250, 20, 20);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexCollided);
  ground = createSprite(50, 500, 2000, 20);
  ground.visible = false;
  ground2 = createSprite(50, 485, 2000, 2);
  ground2.shapeColor = "Grey";
  ground2.addImage(groundImage);
  obstaclesGroup = new Group();
  cloudGroup = new Group();
  trex.debug = true;
  over = createSprite(500, 200, 100, 100);
  over.addImage(over_img);
  restart = createSprite(500, 250, 100, 100);
  restart.addImage(restart_img);
  trex.setCollider("rectangle", -5, 0, 50, 80, 15);
}

function draw() {
  background("White");
  text("score " + score, 900, 100);

  if (gameState == PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    if (score % 100 == 0) checkpoint.play();
    if (ground2.x < 0) {
      ground2.x = ground2.width / 2;
    }
    if (keyDown("space") && trex.y >= 400) {
      trex.velocityY = -10;
      j_sound.play();
    }
    trex.velocityY += 0.5;
    ground2.velocityX = -10;
    spawnClouds();
    spawnObstacles();
    over.visible = false;
    restart.visible = false;
    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
      gameOver.play();
    }
  } else if (gameState == END) {
    ground2.velocityX = 0;
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.changeAnimation("collided", trexCollided);
    over.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  trex.collide(ground);
  drawSprites();
}
function reset() {
  gameState = PLAY;
  over.visible = false;
  restart.visible = false;
  score = 0;
  obstaclesGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
}

function spawnClouds() {
  if (frameCount % 80 == 0) {
    cloud = createSprite(1000, 100, 200, 50);

    cloud.addImage(cloudImage);
    cloud.scale = random(0.7, 1.5);

    cloud.y = Math.round(random(10, 100));
    cloud.velocityX = -10;

    cloud.depth = trex.depth;
    trex.depth += 1;
    cloud.lifetime = 200;

    cloudGroup.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 50 == 0) {
    var obstacle = createSprite(1100, 450, 100, 100);
    obstacle.velocityX = -10;
    obstacle.debug = true;
    obstacle.setCollider("rectangle", -5, 0, 50, 80, 15);
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
    }
    obstaclesGroup.add(obstacle);
  }
}
