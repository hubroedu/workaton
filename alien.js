Alien = function() {
  //image loading for character
  Unit.call(this,{imgSrc: "/img/alien.png", x: 200, y: 220, w: 45, h: 90, dx: 0, dy:0, accY: 0, accX: 0, 
    maxSpeed: 0, minSpeed: 0, gravity: 0, hp: 10});
  var self = this;

}

var a = Alien.prototype; 

a.draw = function(ctx) {
  var self = this;

  if (!this.loaded) {
    return "not loaded";
  }
 // console.log("this shapes: ");
 // console.log(this.shape.x, this.shape.y);
  ctx.drawImage(this.img, this.shape.x, this.shape.y, 45, 90);
}