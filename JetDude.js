//This is a JeyDude-class

JetDude = function() {
  //image loading for character
  Unit.call(this,{
    imgSrc: "/img/jetdude.png",
    x: 100, 
    y: 100, 
    w: 45, 
    h: 90, 
    dx: 0,
    dy:0,
    accY: 4,
    accX: 1,

    maxSpeed: 5,
    minSpeed: -5,
    gravity: 1.5,
    hp: 10});
  var self = this;

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

  if(KeyDown.up){
    this.move("up");
  }
  if(KeyDown.down){
    this.move("down");
  }
  if(KeyDown.left){
    this.move("left");
  }
  if(KeyDown.right){
    this.move("right");
  }
  
  this.fires.forEach(function (fire) {
    fire.configure({
      maxConeDx: Math.abs(self.dy),
      maxSpeed: Math.abs(self.dy) * 10,
      maxRadius: Math.abs(self.dy) * 1,
      maxDistance: Math.abs(self.dy) * 100,
    });
    fire.update();
  });
  this.moveUpdate();
 // console.log("velocities");
 // console.log(this.dx, this.dy);

}


j.draw = function(ctx) {
  var self = this;

  if (!this.loaded) {
    return "not loaded";
  }
  new Text(this.shape.x, this.shape.y, "X: " + this.shape.x + " Y: " + this.shape.y, "#fff").draw(ctx);
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

j.collied = function(colliedObject) {
  this.dx= 0; 
  this.dy= 0;
}

