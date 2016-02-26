SolidObject = function (id, imgSrc, x, y, width, height, rotation) {
  this.id = id;
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
    
    //ctx.fillStyle = ctx.createPattern(this.img, 'repeat');
    
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.shape.x,
      this.shape.y,
      this.shape.width,
      this.shape.height);
    ctx.restore();
  new Text(this.shape.x + this.shape.width/2, this.shape.y + this.shape.height/2, "ID:" + this.id , "#fff").draw(ctx);
  }
};