Camera = function (x, y, width, height, canvasWidth, canvasHeight) {
  this.x = x;
  this.y = y;
  
  this.scaleX = 0.5;
  this.scaleY = 0.5;
  
  this.moveSpeed = 1.5;
  this.zoomSpeed = 0.005;
  
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  
  this.viewportWidth = width;
  this.viewportHeight = height;
};

var c = Camera.prototype;
var abs = Math.abs;

c.move = function (x, y) {
  this.destinationX = -x * this.scaleX + this.canvasWidth / 2;
  this.destinationY = -y * this.scaleY + this.canvasHeight / 2;
  this.hasDestination = true;
};

c.getRealScale = function () {
  return this.canvasWidth / this.viewportWidth;
};

c.update = function (dt) {
  
  var scaleDiff = abs(this.getRealScale() - this.scaleX);
  this.scaleX += scaleDiff < this.zoomSpeed ? scaleDiff : this.zoomSpeed;
  this.scaleY += scaleDiff < this.zoomSpeed ? scaleDiff : this.zoomSpeed;
  
  this.x = this.destinationX;
  this.y = this.destinationY;
};

c.zoom = function (ctx) {
  //ctx.translate(0, 0);
  ctx.translate(this.x, this.y);
  ctx.scale(this.scaleX, this.scaleY);
};

c.draw = function (ctx) {
  if (false) {
    
  ctx.strokeStyle = "#fff";
  ctx.strokeRect(-this.x / 2, -this.y / 2, this.viewportWidth, this.viewportHeight);
  ctx.fillRect(this.x + this.viewportWidth / 2, this.y + this.viewportHeight / 2, 10, 10);
  ctx.fillStyle="red";
  ctx.fillRect(this.destinationX - 5, this.destinationY - 5, 10, 10);
  ctx.fillStyle="white";
  ctx.fillRect(0, 0, 10, 10);
  }
};