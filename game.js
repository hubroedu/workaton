Game = function () {
  this.startup();
};

var CANVAS_MARGINS = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50,
};

var g = Game.prototype;

g.startup = function (options) {
  this.setupCanvas();
  this.loadAssets();
  this.gameLoop();
};

g.loadAssets = function () {
  var jetDude = this.jetDude = new JetDude();
  this.camera = new Camera(0, 0, this.canvas.width / 1, this.canvas.height / 1, this.canvas.width, this.canvas.height);
  this.ground = new Ground(100, 500, 500, 100);
  this.ground.loadAssets();

};

g.gameLoop = function () {
  requestAnimationFrame(this.gameLoop.bind(this));
  var now = new Date().getTime();
  var dt = now - (this.time || now);

  this.time = now;

  this.update(dt);
  this.draw(dt);
}

g.resizeCanvas = function () {
  this.canvas.width = window.innerWidth - CANVAS_MARGINS.left - CANVAS_MARGINS.right;
  this.canvas.height = window.innerHeight - CANVAS_MARGINS.top - CANVAS_MARGINS.bottom;
};

g.setupCanvas = function () {
  this.canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext('2d');

  this.canvas.style.margin = (
    CANVAS_MARGINS.top + "px " +
    CANVAS_MARGINS.right + "px " +
    CANVAS_MARGINS.bottom + "px " +
    CANVAS_MARGINS.left + "px"
  );

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', this.resizeCanvas, false);
  this.resizeCanvas();
};



// Called every frame before draw
g.update = function (dt) {
  var jetDude = this.jetDude;
  this.camera.move(this.jetDude.shape.x + 45/2, this.jetDude.shape.y + 90/2);
  console.log("camera pos", this.camera.x, this.camera.y);
  this.camera.update(dt);
};

// Called every frame after update
g.draw = function (dt) {
  var ctx = this.ctx;
  var canvas = this.canvas;
  ctx.save();
  var obs1 =  new Shape(100, 100, 30, 40);
  var obstacles = [];

  // Background
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#232323";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  this.camera.zoom(ctx);
  this.ground.draw(ctx, dt);
  console.log(this.ground);
  var jetDude = this.jetDude;
  if (jetDude.loaded) {
    jetDude.draw(ctx);
  }

  ctx.restore();
};



new Game();
