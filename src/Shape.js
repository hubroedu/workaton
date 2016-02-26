Shape = {};

Shape.Rect = function (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

var r = Shape.Rect.prototype;

r.intersects = function (other) {
  var bottomRightOverlap = (
    (other.x >= this.x && other.x <= this.x + this.height) &&
    (other.y >= this.y && other.y <= this.y + this.width)
  );
  
  var topRightOverlap = (
    (other.x + other.width >= this.x && other.x + other.width <= this.x + this.height) &&
    (other.y + other.height >= this.y && other.y + other.height <= this.y + this.width)
  );
  
  return topRightOverlap || bottomRightOverlap;
};
