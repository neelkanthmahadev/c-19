var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.5

  doorsGroup = new Group()

  climbersGroup = new Group()

  invisibleBlockGroup = new Group()
}

function draw() {
  background(200);

  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300
    }

    if (keyDown("space")) {
      ghost.velocityY = -10

    }
    ghost.velocityY = ghost.velocityY + 0.8
    if (keyDown("left")) {
      ghost.x -= 3
    }
    if (keyDown("right")) {
      ghost.x += 3
    }
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy()
      gameState = "end";
    }
    spawndoor()


  }

  drawSprites()

  if (gameState === "end") {
    stroke("red")
    fill("red")
    textSize(30)
    text("Game Over", 230, 230)
  }
}

function spawndoor() {
  if (frameCount % 200 == 0) {
    door = createSprite(200, -50)
    door.addImage("door", doorImg)
    doorsGroup.add(door)

    climber = createSprite(200, 10)
    climber.addImage("climber", climberImg)
    climbersGroup.add(climber)

    invisibleBlock = createSprite(200, 15)
    invisibleBlockGroup.add(invisibleBlock)

    door.x = Math.round(random(120, 400))
    climber.x = door.x
    invisibleBlock.x = door.x

    door.velocityY = 1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1

    invisibleBlock.width = climber.width
    invisibleBlock.height = 2


  }


}