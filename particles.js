Particles = {};


/**
 * A fire particle.
 * By calling update() and draw(), you can animate the particles as a stream.
 * Speed, distance, size etc are all configurable. However, you determine
 * min and max values, and the particle is generated and regenerated within these
 * parameters.
 * 
 * Some important configurations:
 * 
 *   * shape
 *     -star
 *     -sqare
 *     -circle
 * 
 * Usage:
 * 
 * var fires = Particles.Fire.generate(30, { minSpeed: 30 });
 * 
 * // In update function
 * fires.forEach(function (fire) { fire.update(); });
 * 
 * // In drawing function
 * fires.forEach(function (fire) { fire.draw(context, originX, originY); });
 * 
 * 
 * @param {[type]} opts [description]
 */
Particles.Fire = function (opts) {
  this.configure(opts);
  this.initialize();
};

// Generate a number of fire particles to animate
// Returns a list of particles
Particles.Fire.generate = function (count, opts) {
  var fires = [];
  for (var i = count; i >= 0; i--)
    fires.push(new Particles.Fire(opts));
  
  return fires;
}

var fire = Particles.Fire.prototype;

// You can confirure a particle in real time,
// for example tying minSpeed/maxSpeed to your character's
// move speed
fire.configure = function (opts) {
  opts = opts || {};
  
  this.config = {
    shape: opts.shape || "circle",
    gradient: opts.gradient || [
      [0, "rgba(255, 255, 255, 0.9)"],
      [0.5, "rgba(255, 255, 0, 0.7)"],
      [0.5, "rgba(255, 130, 0, .6)"],
      [1, "rgba(255, 0, 0, 0.4)"],
    ],
    minRadius: opts.minRadius || 1,
    maxRadius: opts.maxRadius || 10,
    minSpeed: opts.minSpeed || 2,
    maxSpeed: opts.maxSpeed || 20,
    minDistance: opts.minDistance || 10,
    maxDistance: opts.maxDistance || 100,
    minOffsetX: opts.minOffsetX || 0,
    minOffsetY: opts.minOffsetY || 0,
    maxOffsetX: opts.maxOffsetX || 5,
    maxOffsetY: opts.maxOffsetY || 5,
    minConeDx: opts.minConeDx || 0,
    maxConeDx: opts.maxConeDx || 2,
  };
};

fire.getFireGradient = function (ctx, x, y, radius) {
  var gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(this.config.gradient[0][0], this.config.gradient[0][1]);
  gradient.addColorStop(this.config.gradient[1][0], this.config.gradient[1][1]);
  gradient.addColorStop(this.config.gradient[2][0], this.config.gradient[2][1]);
  gradient.addColorStop(this.config.gradient[3][0], this.config.gradient[3][1]);
  return gradient;
};

fire.generateRandomDistance = function () {
  return ~~(Math.random() * this.config.maxDistance + this.config.maxDistance);
};

fire.generateRandomRadius = function () {
  return ~~(Math.random() * this.config.maxRadius + this.config.minRadius);
};

fire.generateRandomSpeed = function () {
  return ~~(Math.random() * this.config.maxSpeed + this.config.minSpeed);
};

fire.generateRandomCone = function () {
  return Math.random() > 0.5 ?
    (Math.random() * this.config.maxConeDx + this.config.minConeDx) :
    (-Math.random() * this.config.maxConeDx + this.config.minConeDx);
};

fire.generateRandomOffsetX = function () {
  return Math.random() > 0.5 ?
    ~~(Math.random() * this.config.maxOffsetX + this.config.minOffsetX) :
    ~~(-Math.random() * this.config.maxOffsetX + this.config.minOffsetX);
};

fire.generateRandomOffsetY = function () {
  return Math.random() > 0.5 ?
    ~~(Math.random() * this.config.maxOffsetY + this.config.minOffsetY) :
    ~~(-Math.random() * this.config.maxOffsetY + this.config.minOffsetY);
};

fire.initialize = function () {
  this.x = this.generateRandomOffsetX();
  this.y = this.generateRandomOffsetY();
  this.dx = this.generateRandomCone();
  this.dy = this.generateRandomSpeed();
  this.radius = this.generateRandomRadius();
  this.distance = this.generateRandomDistance();
};

fire.update = function () {
  if (this.y > this.distance) {
    this.initialize();
  }

  this.y += this.dy;
  this.x += this.dx;
};

fire.drawShape = function (ctx, x, y, size) {
  switch (this.config.shape) {
    case "circle":
      ctx.arc(x, y, size, Math.PI*2, false);
      break;
    case "square":
      ctx.fillRect(x, y, size, size);
      break;
    case "star":
      var rot = Math.PI / 2 * 3;
      var currentX = x;
      var currentY = y;
      var outerRadius = size * 2;
      var innerRadius = size;
      var spikes = 10;
      var step = Math.PI / spikes;

      ctx.moveTo(x, y - outerRadius);
      
      for(i = 0; i < spikes; i++) {
        currentX = x + Math.cos(rot) * outerRadius;
        currentY = y + Math.sin(rot) * outerRadius;
        ctx.lineTo(currentX, currentY);
        rot += step;

        currentX = x + Math.cos(rot) * innerRadius;
        currentY = y + Math.sin(rot) * innerRadius;
        ctx.lineTo(currentX, currentY);
        rot += step;
      }
      ctx.lineTo(x, y - outerRadius);
      
      ctx.stroke();
      ctx.closePath();
  }
}

fire.draw = function (ctx, x, y) {
  var fireX = this.x + x;
  var fireY = this.y + y;
  
  ctx.beginPath();
  ctx.fillStyle = this.getFireGradient(ctx, fireX, fireY, this.radius);
  this.drawShape(ctx, fireX, fireY, this.radius);
  ctx.fill();
};