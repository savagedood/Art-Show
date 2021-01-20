
// This is the main character in the game

function Person() {
  this.pos = createVector(50, height - 10);
  this.vel = createVector(1, 0);
  this.acc = createVector(0, 0);
  this.score = 0;

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(10);
    this.acc.add(f);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.display = function() {
    fill("red");
    stroke(255);
    rect(this.pos.x, this.pos.y, 10, 10);

    stroke(255, 0, 0);
    textSize(100);
    textAlign(CENTER);
    text(this.score, this.pos.x + 10, 90);
  }

  this.hits = function(Obs) {
    if (Obs.quality === good && (Obs.pos.x >= this.pos.x && Obs.pos.x <= (this.pos.x + 10)) && (Obs.pos.y >= this.pos.y && Obs.pos.y <= (this.pos.y + 10))) {
      this.score+=2;
      Obs.pos.y = -400;
    }
    else if (Obs.quality === star && (Obs.pos.x >= this.pos.x && Obs.pos.x <= (this.pos.x + 10)) && (Obs.pos.y >= this.pos.y && Obs.pos.y <= (this.pos.y + 10))) {
      this.score-= 10;
      Obs.pos.y = -400;
    }
  }
  // I changed some of these numbers so that my person is displayed on the ground properly
  // I added a second edge on the top of the screen
  this.edges = function() {
    if (this.pos.y > height - 11) {
      this.vel.y *= 0;
      this.pos.y = height - 11;
    } else if (this.pos.y < 0) {
      this.vel.y *= 0;
      this.pos.y = 0;
    }
  }

  // this resets the person at the bottom of the screen
  this.reset = function() {
    this.pos.y = 349;
    // this kills the velocity so the person doesn't immediately shoot up when the game restarts
    this.vel = createVector(0, 0);
    // this resets the velocity so that the game will still work the same as before when it restarts
    this.vel = createVector(1, 0);
  }
}
