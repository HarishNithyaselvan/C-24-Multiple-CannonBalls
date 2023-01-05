const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;

//var name = ["Harish","Trinabh","Darrien","Tyler","Mahith"]
//console.log(name)
//var num = [1,2,3,4,5]
//console.log(num)

var balls = []

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angle = 20

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  for(var i = 0; i<balls.length;i++) {
    showcannonBalls(balls[i])
  }
  cannon.display();
}
function keyPressed() {
  if(keyCode === DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x,cannon.y)
    cannonBall.trajectory = []
    Matter.Body.setAngle(cannonBall.body,cannon.angle)
    balls.push(cannonBall)
  }
}

function showcannonBalls(ball) {
  if(ball) {
    ball.display()
  }
}
function keyReleased() {
  if(keyCode === DOWN_ARROW) {
   balls[balls.length-1].shoot()
  }
}
