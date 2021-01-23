
var timerValue = 15;
var good = 1;
var star = 0;
var landscape;
var fuel;
var man;
var harddif;
var endscene;
var drag;
var bad = [];
var bonus = [];
var currentScene = 1;
var endSceneCountdown = 0;

function setup() {
  createCanvas(640, 360);
  man = new Person();
  drawScene1();
  for (let i = 0; i < 150; i++) {
    bad[i] = new Obstacle();
  }
  for (let j = 0; j < 35; j++) {
    bonus[j] = new Special();
  }
  setInterval(timeIt, 1000);

}
// scene 1, the start scene


var drawScene1 = function() {
  currentScene = 1;
  man.score = 0;
  background(0, 0, 255);
  textSize(50);
  textAlign(CENTER);
  fill(0);
  text("Asteroid collector!!!", width / 2, 50);
  textSize(30);
  fill("red")
  text("Click to start mission", width / 2, 100);
  noStroke();
  fill("red");
  rect(width / 4, height / 2, 50, 50);
  fill(255);
  rect(width / 2, height * 3 / 4, 60, 60);
}

var drawScene2 = function() {
  currentScene = 2;
  man.score = 0;
  background(0, 0, 255);
  textSize(50);
  textAlign(CENTER);
  fill("white");
  text("The Task", width / 2, 50);
  textSize(20);
  text("collect as many asteroid samples as you can in 15 seconds", width / 2, 75);
  text("fly your drone over the samples to pick them up", width / 2, 100);
  text("watchout for stars which will dicintergrate your samples", width / 2, 120);
 text("press z after launch for a challenge", width / 2, 140);
  text("Click to launch drone", width / 2, 165);
  text("Asteroid ------>", width / 2, 245);
  noStroke();
  fill(255);
  rect(width / 4, height / 2, 0, 50);
  fill(255);
  rect(width / 2 + 100, height / 2 + 25, 60, 60);
}
var drawScene3 = function() {
  currentScene = 3;
  background(space);
  fill("red")

  if (timerValue > 10) {
    text("0:" + timerValue, 500, 85);
  }
  if (timerValue <= 10) {
    text('0:0' + timerValue, 500, 85);
  }
  if (timerValue === 10) {
    text('0:' + timerValue, 500, 85);
  }
  if (timerValue === 0) {
    text('game over', width / 2, height / 2 + 15);
  }

  // changed this number, not sure what it does, will check it out later
  translate(-man.pos.x + 50, 0);
  endSceneCountdown += 1.2;

  let gravity = createVector(0, 0.20);
  man.applyForce(gravity);

  man.update();
  man.display();
  man.edges();

  for (let i = 0; i < 150; i++) {
    if (man.hits(bad[i])) {
      console.log(bad[i].pos.x);
    }
    bad[i].show();
    bad[i].update();
  }

  for (let j = 0; j < 35; j++) {
    if (man.hits(bonus[j])) {
      console.log(bonus[j].pos.x);
    }
    bonus[j].show();
    bonus[j].update();
  }

  if (timerValue === 0) {
    drawScene5();
  }
}
var drawScene4 = function() {
  currentScene = 4;
  background(harddif);
  fill("red")

  if (timerValue > 10) {
    text("0:" + timerValue, 500, 85);
  }
  if (timerValue <= 10) {
    text('0:0' + timerValue, 500, 85);
  }
  if (timerValue === 10) {
    text('0:' + timerValue, 500, 85);
  }
  if (timerValue === 0) {
    text('game over', width / 2, height / 2 + 15);
  }

  // changed this number, not sure what it does, will check it out later
  translate(-man.pos.x + 50, 0);
  endSceneCountdown += 1.2;

  let gravity = createVector(0, 0.20);
  man.applyForce(gravity);

  man.update();
  man.display();
  man.edges();

  for (let i = 0; i < 150; i++) {
    if (man.hits(bad[i])) {
      console.log(bad[i].pos.x);
    }
    bad[i].show();
    bad[i].update();
  }

  for (let j = 0; j < 35; j++) {
    if (man.hits(bonus[j])) {
      console.log(bonus[j].pos.x);
    }
    bonus[j].show();
    bonus[j].update();
  }

  if (timerValue === 0) {
    drawScene5();
  }
}
var drawScene5 = function() {
  currentScene = 5;
  endSceneCountdown = 0;
  man.reset();

  resetMatrix();

  bad = [];
  for (let i = 0; i < 150; i++) {
    bad[i] = new Obstacle();
  }

  bonus = [];
  for (let j = 0; j < 35; j++) {
    bonus[j] = new Special();
  }

  background(fuel);
  textSize(20);
  textAlign(CENTER);
  noStroke();
  fill("red");

  text("You finished the game and returned to earth!", width / 2, 50);
  text("Your score was " + man.score + ". Good job!", width / 2, 80);
  text("click to play again", width / 2, 300);

}

// changed the height of the jump
function keyPressed() {
  if (key == " ") {
    let jump = createVector(0, -6);
    man.applyForce(jump);
  }
  if (key == "z") {
    drawScene4();
  }
}

function preload() {
  space = loadImage('download (3).jpg')
  fuel = loadImage('fuel-gauge.jpg')
  endscene = loadImage('Thumbs.Up_.jpg')
  drag = loadImage('9-95700_firework-explosion-transparent-background.png')
  harddif = loadImage('F1.large-2-1200x800.jpg')
}

function draw() {
  if (currentScene === 1) {
    drawScene1();
  }
  if (currentScene === 2) {
    drawScene2();
  }
  if (currentScene === 3) {
    drawScene3();
  }
  if (currentScene === 4) {
    drawScene4();
  }


}

function timeIt() {
  if (timerValue > 0) {
    timerValue--;
  }

}

function mousePressed() {

  if (currentScene === 1) {
    drawScene2();
  } else if (currentScene === 2) {
    timerValue = 15;
    drawScene3();
  } else if (currentScene === 5) {
    drawScene1();
  }
}
