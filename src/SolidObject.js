SolidObject = function (imgSrc, x, y, width, height, rotation) {
  this.shape = new Shape.Rect(x, y, width, height, rotation);
  var self = this;
  var img = this.img = new Image();
  this.img.src = imgSrc;
  this.img.addEventListener("load", function() {
    self.loaded = true;
  });
};

var g = SolidObject.prototype;


g.draw = function (ctx, dt) {
  if (this.loaded) {
    ctx.save();
    
    ctx.fillStyle = ctx.createPattern(this.img, 'repeat');
    ctx.fillRect(
      this.shape.x,
      this.shape.y,
      this.shape.width,
      this.shape.height);
    
    ctx.restore();
  }
};