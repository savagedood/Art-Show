// the varibles use in the code
var streak = 0;
var numGoodObstacles = 100;
var numBadObstacles = 75;
var timerValue = 20;
var good = 1;
var star = 0;
var landscape;
var fuel;
var man;
var harddif;
var firstScene;
var goodObstacles = [];
var badObstacles = [];
var currentScene = 1;
var sceneWidth = 640
var sceneHeight = 360
var spaceImage = 'download (3).jpg';
var fuelImage = 'fuel-gauge.jpg';
var harddifImage = 'F1.large-2-1200x800.jpg';
var firstSceneImage = '458820.jpeg';

// setting up what the screen will look like
function setup() {
  createCanvas(sceneWidth, sceneHeight);
  man = new Person();
  drawScene1();
  for (let i = 0; i < numGoodObstacles; i++) {
    goodObstacles[i] = new Obstacle();
  }
  for (let j = 0; j < numBadObstacles; j++) {
    badObstacles[j] = new Special();
  }
  setInterval(timeIt, 1000);

}
// scene 1, the start scene
var drawScene1 = function() {
  currentScene = 1;
  man.score = 0;
  background(firstSceneImage);
  textSize(50);
  textAlign(CENTER);
  fill(0);
  textFont('Georgia');
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
//the info screen/instructions
var drawScene2 = function() {
  currentScene = 2;
  man.score = 0;
  background(0, 0, 255);
  textSize(50);
  textAlign(CENTER);
  fill("white");
  text("The Task", width / 2, 50);
  textSize(20);
  text("collect as many asteroid samples as you can in 20 seconds", width / 2, 75);
  text("fly your drone over the samples to pick them up", width / 2, 100);
  text("watchout for stars which will dicintergrate your samples", width / 2, 120);
  text("press z for a challenge", width / 2, 140);
  text("press s launch drone", width / 2, 165);
  text("Asteroid ------>", width / 2, 245);
  noStroke();
  fill(255);
  rect(width / 4, height / 2, 0, 50);
  fill(255);
  rect(width / 2 + 100, height / 2 + 25, 60, 60);
}
//the easy difficulty scene (the game)
var drawScene3 = function() {
  currentScene = 3;
  background(space);

  // Cretae the top bar where the score and timer will be shown.
  fill("black")
  rect(0, 0, sceneWidth, 30);
  textSize(25);
  fill("yellow");
  text("Score: ", 75, 25);
  if (timerValue >= 10) {
    text('0:' + timerValue, 500, 25);
  } else if (timerValue < 10) {
    text('0:0' + timerValue, 500, 25);
  }


  // changed this number, not sure what it does, will check it out later
  translate(-man.pos.x + 50, 0);

  let gravity = createVector(0, 0.20);
  man.applyForce(gravity);

  man.update();
  man.display();
  man.edges();

  for (let i = 0; i < numGoodObstacles; i++) {
    if (man.hits(goodObstacles[i])) {
      console.log(goodObstacles[i].pos.x);
    }
    goodObstacles[i].show();
    goodObstacles[i].update();
  }

  for (let j = 0; j < numBadObstacles; j++) {
    if (man.hits(badObstacles[j])) {
      console.log(badObstacles[j].pos.x);
    }
    badObstacles[j].show();
    badObstacles[j].update();
  }

  if (timerValue === 0) {
    drawScene5();
  }

}
// the hard difficulty (the game)
var drawScene4 = function() {
  currentScene = 4;
  background(harddif);

  // Cretae the top bar where the score and timer will be shown.
  stroke(255, 0, 0);
  fill("black");
  rect(0, 0, sceneWidth, 30);
  textSize(25);
  fill("yellow");
  text("Score: ", 75, 25);
  if (timerValue >= 10) {
    text('0:' + timerValue, 500, 25);
  } else if (timerValue < 10) {
    text('0:0' + timerValue, 500, 25);
  }




  // changed this number, not sure what it does, will check it out later
  translate(-man.pos.x + 50, 0);

  let gravity = createVector(0, 0.20);
  man.applyForce(gravity);

  man.update();
  man.display();
  man.edges();

  for (let i = 0; i < numGoodObstacles; i++) {
    if (man.hits(goodObstacles[i])) {
      console.log(goodObstacles[i].pos.x);
    }
    goodObstacles[i].show();
    goodObstacles[i].update();
  }

  for (let j = 0; j < numBadObstacles; j++) {
    if (man.hits(badObstacles[j])) {
      console.log(badObstacles[j].pos.x);
    }
    badObstacles[j].show();
    badObstacles[j].update();
  }

  if (timerValue === 0) {
    drawScene5();
  }

}
//the end scene
var drawScene5 = function() {
  currentScene = 5;
  man.reset();

  resetMatrix();

  goodObstacles = [];
  for (let i = 0; i < numGoodObstacles; i++) {
    goodObstacles[i] = new Obstacle();
  }

  badObstacles = [];
  for (let j = 0; j < numBadObstacles; j++) {
    badObstacles[j] = new Special();
  }

  background(fuel);
  textSize(20);
  textAlign(CENTER);
  noStroke();
  fill("red");
  textFont('bold');
  text("You finished the game and returned to earth!", width / 2, 50);
  text("Your score was " + man.score * streak + ". good job!", width / 2, 80);
  text("click to refuel drone and play again", width / 2, 300);

}

// changed the height of the jump
function keyPressed() {
  if (key == " ") {
    let jump = createVector(0, -6);
    man.applyForce(jump);
  }
  //when pressed it changes to the harder difficulty
  if (key == "z" && currentScene === 2) {
    drawScene4();
    timerValue = 20;
  }

  if (key == "s" && currentScene === 2) {
    timerValue = 20;
    drawScene3();
  }
}

function preload() {
  space = loadImage(spaceImage)
  fuel = loadImage(fuelImage)
  harddif = loadImage(harddifImage)
  firstScene = loadImage(firstSceneImage)
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
//if the timer value is greater than 0 it will keep counting down by 1 each time
function timeIt() {
  if (timerValue > 0) {
    timerValue--;
  }

}
// if you click your mouse and the criteria matches it will change the scene
function mousePressed() {

  if (currentScene === 1) {
    drawScene2();

  } else if (currentScene === 5) {
    timerValue = 20;   
    drawScene2();
  }
}
