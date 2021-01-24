class Obstacle {
  constructor() {
    this.pos = createVector(random(man.pos.x + 40, man.pos.x + 1200), random(35, height -11));
    this.vel = createVector(-0.25, 0);
    this.acc = createVector(0, 0);
    this.quality = floor(random()*4)+1;
  
   
  }

  show() {
    noStroke();
    if (currentScene === 3) {
      switch(this.quality) {
        case 1:
          fill("white");
          break;
        case 2:
          fill(211,211,211);
          break;
        case 3:
          fill(169,169,169);
          break;
        case 4:
          fill("black");
          break;
      }
    }
    if (currentScene === 4) {
      fill(0)
      this.vel = createVector(-1, 0);
    }
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
    fill("red");
    ellipse(this.pos.x, this.pos.y, 15, 15)

  }
}
