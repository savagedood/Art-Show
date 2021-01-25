// the varibles use in the code
var streak = 0;
var numGoodObstacles = 200;
var numBadObstacles = 175;
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
var spaceImageFilename = 'download (3).jpg';
var fuelImageFilename = 'fuel-gauge.jpg';
var harddifImageFilename = 'F1.large-2-1200x800.jpg';
var firstSceneImageFilename = '458820.jpeg';

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
  background(firstSceneImage);
  currentScene = 1;
  man.score = 0;
  textSize(50);
  textAlign(CENTER);
  fill("yellow");
  textFont('Georgia');
  text("Asteroid collector!!!", width / 2, 50);
  textSize(30);
  fill("red")
  text("Click to start mission", width / 2, 325);
  noStroke();
}

//the info screen/instructions
var drawScene2 = function() {
  currentScene = 2;
  man.score = 0;
  streak = 0;
  background(0, 0, 255);
  textSize(50);
  textAlign(CENTER);
  fill("white");
  text("The Task", width / 2, 50);
  textSize(20);
  textAlign(LEFT);
  text("- collect as many asteroid samples as you can in 20 seconds", width / 8, 85);
  text("- fly your drone over the samples to pick them up", width / 8, 110);
  text("- watchout for stars which will discintergrate your samples", width / 8, 135);
  text("- press z for black hole", width / 8, 160);
  text("- press s for galaxy", width / 8, 185);
  text("- (your score will increase alot due to your collected streak)", width / 8, 210);
  text("1 pt Asteroid", width / 4, 245);
  text("2 pt Asteroid", width / 4, 270);
  text("3 pt Asteroid", width / 4, 295);
  text("Star", width / 4, 320);

  noStroke();
  fill("white");
  rect(width / 4 -20, 235, 10, 10);
  fill("grey");
  rect(width / 4 -20, 265, 10, 10);
  fill("black");
  rect(width / 4 -20, 290, 10, 10);
  fill("red");
  ellipse(width / 4 -15, 314, 15, 15)
}

//the easy difficulty scene (the game)
var drawScene3 = function() {
  currentScene = 3;
  background(spaceImage);

  // Cretae the top bar where the score and timer will be shown.
  fill("black")
  rect(0, 0, sceneWidth, 30);
  textSize(25);
  fill("yellow");
  text("Score: ", 75, 25);
  text("Streak: " + streak, 225, 25);

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
  background(harddifImage);

  // Cretae the top bar where the score and timer will be shown.
  stroke(255, 0, 0);
  fill("black");
  rect(0, 0, sceneWidth, 30);
  textSize(25);
  fill("yellow");
  text("Score ", 75, 25);
  text("Streak: " + streak, 225, 25);
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

  background(fuelImage);
  textSize(20);
  textAlign(CENTER);
  noStroke();
  fill("red");
  textFont('bold');
  text("Welcome back to earth! Your score was " + man.score, width / 2, 50);
  text("click to refuel drone and play again", width / 2, 310);

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
  spaceImage = loadImage(spaceImageFilename)
  fuelImage = loadImage(fuelImageFilename)
  harddifImage = loadImage(harddifImageFilename)
  firstSceneImage = loadImage(firstSceneImageFilename)
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
