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
  this.loadAssets();
  this.setupCanvas();
  this.gameLoop();
};

g.loadAssets = function () {
  var jetDude = this.jetDude = {
    img: new Image(),
    loaded: false,
    fires: Particles.Fire.generate(50)
  };
  jetDude.img.src = "/img/jetdude.png";
  jetDude.img.addEventListener("load", function() {
    jetDude.loaded = true;
  });
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
  this.jetDude.fires.forEach(function (fire) {
    fire.update();
  });
};

// Called every frame after update
g.draw = function (dt) {
  var ctx = this.ctx;
  var canvas = this.canvas;
  
  // Background
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#232323";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  var jetDude = this.jetDude;
  if (jetDude.loaded) {
    var x = 100;
    var y = 100;
    var jetpackY = 70;
    var jetpackX = 8;
    
    ctx.drawImage(jetDude.img, x, y, 45, 90);
    
    ctx.globalCompositeOperation = "lighter";
    
    jetDude.fires.forEach(function (fire) {
      fire.draw(ctx, x + jetpackX, y + jetpackY);
    });
  }
  
};


new Game();