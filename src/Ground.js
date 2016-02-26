Ground = function (x, y, width, height) {
  this.shape = new Shape.Rect(x, y, width, height);
};

var g = Ground.prototype;

g.loadAssets = function () {
  var self = this;
  var img = this.img = new Image();
  this.img.src = "/img/ground.jpg";
  this.img.addEventListener("load", function() {
    self.loaded = true;
  });
};

g.draw = function (ctx, dt) {
  if (this.loaded) {
    ctx.fillStyle = ctx.createPattern(this.img, 'repeat');
    ctx.fillRect(
      this.shape.x,
      this.shape.y,
      this.shape.width,
      this.shape.height);
  }
};