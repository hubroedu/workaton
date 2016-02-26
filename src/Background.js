Background = function (imgPath, x, y, width, height, rotation) {
  var self = this;

  this.shape = new Shape.Rect(x, y, width, height, rotation);

  var img = this.img = new Image();
  this.img.src = imgPath;
  this.img.addEventListener("load", function() {
    self.loaded = true;
  });
  
};

var g = Background.prototype;

g.draw = function (ctx, dt) {
  if (this.loaded) {
    
    //ctx.translate(this.shape.x + this.shape.width / 2, this.shape.y + this.shape.height / 2);
    //ctx.rotate((Math.PI/180) * this.shape.rotation);
    
    ctx.fillStyle = ctx.createPattern(this.img, 'repeat');
    ctx.fillRect(
      this.shape.x,
      this.shape.y,
      this.shape.width,
      this.shape.height);
    
  }
};