
var maxSpeed = 5;
var minSpeed = -5;
var gravity = 1.5;

JetDude = function() {
  //image loading for character
  var self = this;
  this.img = new Image();
  this.img.src = "/img/jetdude.png";
  this.loaded = false;
  this.img.addEventListener("load", function() {
    self.loaded = true;
  });

  this.shape = new Shape.Rect(0, 0, 45, 90);
  //Velocities
  this.dx = 0;
  this.dy = 0;
  this.accY = 4;
  this.accX = 1;
  //jetpack properties
  this.jetpackY = 70;
  this.jetpackX = 8;
  this.fires = Particles.Fire.generate(10);

}

// Fire move action on donwkey
var j = JetDude.prototype;

j.update = function() {
  var self = this;
  // console.log(this.shape.intersects());

  if (KeyDown.up) {
    // up arrow
    if (this.dy > minSpeed ) {
      this.dy -= this.accY;
    }
  }
  else if (KeyDown.down) {
    // down arrow
    if (this.dy < maxSpeed) {
      this.dy += this.accY;
    }
  }
  else if (KeyDown.right) {
    // right arrow
    if (this.dx < maxSpeed) {
      this.dx += this.accX;
    }
  }
  else if (KeyDown.left) {
    // left arrow¨
    if (this.dx > minSpeed) {
      this.dx -= this.accX;
    }
  }

  if (this.dy < maxSpeed) {
    this.dy += gravity;
  }

  this.move();
  
  this.fires.forEach(function (fire) {
    fire.configure({
      maxConeDx: Math.abs(self.dy),
      maxSpeed: Math.abs(self.dy) * 10,
      maxRadius: Math.abs(self.dy) * 1,
      maxDistance: Math.abs(self.dy) * 100,
    });
    fire.update();
  });
}

j.move = function() {
  this.shape.x += this.dx;
  this.shape.y += this.dy;
}

j.draw = function(ctx) {
  var self = this;

  if (!this.loaded) {
    return "not loaded";
  }
  ctx.globalCompositeOperation = "lighter";
  ctx.drawImage(this.img, this.shape.x, this.shape.y, 45, 90);
  this.fires.forEach(function (fire) {
    fire.draw(ctx, self.shape.x + self.jetpackX, self.shape.y + self.jetpackY);
  });
}


//Helper Functions
j.atMaxSpeed = function(speed) {
   if (Math.abs(speed) > maxSpeed) {
     return true;
   };
   return false;
}

