Unit = function (config) {
	var self = this;
	this.img = new Image();
  	this.img.src = config.imgSrc;
  	this.loaded = false;
  	this.img.addEventListener("load", function() {
    	self.loaded = true;
  	});
  	this.shape = new Shape.Rect(config.x, config.y, config.w, config.h);

  	 //Velocities
 	this.dx = config.dx;
  	this.dy = config.dy;
  	this.accX = config.accX;
  	this.accY = config.accY;	
  	this.maxSpeed = config.maxSpeed;
	this.minSpeed = config.minSpeed;
	this.gravity = config.gravity;
	this.hp = config.hp; 

this.move = function(dir) {
	if ( dir == "up") {
    // up arrow
    if (this.dy > this.minSpeed ) {
      this.dy -= this.accY;
    }
  }
  if (dir == "down") {
    // down arrow
    if (this.dy < this.maxSpeed) {
      this.dy += this.accY;
    }
  }
  if (dir == "right") {
    // right arrow
    if (this.dx < this.maxSpeed) {
      this.dx += this.accX;
    }
  }
  if (dir == "left") {
    // left arrow¨
    if (this.dx > this.minSpeed) {
      this.dx -= this.accX;
    }
  }

  if (this.dy < this.maxSpeed) {
    this.dy += this.gravity;
  }
}

this.moveUpdate = function() {
  this.shape.x += this.dx;
  this.shape.y += this.dy;
}
}