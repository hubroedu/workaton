Text = function (x, y, text, color) {
  this.x = x;
  this.y = y;
  this.text = text;
  this.color = color || "#fff";
};

var t = Text.prototype;

t.draw = function (ctx) {
  ctx.font = "16px Arial";
  ctx.fillStyle = this.color;
  ctx.fillText(this.text, this.x, this.y);
};