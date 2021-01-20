class Obstacle {
  constructor() {
    this.pos = createVector(random(man.pos.x + 40, man.pos.x + 1200), random(height - 11));
    this.vel = createVector(-0.25, 0);
    this.acc = createVector(0, 0);
    this.quality = good;
  }

  show() {
    noStroke();
    fill(random(255));
    // changing these numbers makes the collision not work, why?
    rect(this.pos.x, this.pos.y, 10, 10) // try changing the numbers in person collision too
    
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
}

class Special extends Obstacle {
  constructor() {
    super();
     this.quality = star;
  }

  show() {
    fill(255, 165, 0);
    ellipse(this.pos.x, this.pos.y, 20, 20)
    
  }
}
