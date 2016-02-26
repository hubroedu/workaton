World = function () {
  this.setupWorld();
};

var w = World.prototype;

w.setupWorld = function () {
  this.immaterialObjects = [
    new Background("/img/sky.png",    -1000,-1000, 2000, 1000),
    new Background("/img/stone.jpg", -1000, 0, 5000, 1000),
  ];
  
  if (DEBUG) {
    for (var x = -2000 ; x <= 2000; x+=100) {
      for (var y = -2000 ; y <= 2000; y+=100) {
      
        this.immaterialObjects.push(
          new Shape.Rect(x, y, 2, 4000, 0, "white")
        );
        this.immaterialObjects.push(
          new Text(x, y, "x: " + x + " y: " + y, "white")
        );
        
        this.immaterialObjects.push(
          new Shape.Rect(x, y, 4000, 2, 0, "white")
        );
        this.immaterialObjects.push(
          new Text(x, y, "x: " + x + " y: " + y, "white")
        );
      }
    };
  }
  
  this.solidObjects = [
    new SolidObject("/img/ground.jpg", -1000, 0, 700, 50),
    new SolidObject("/img/ground.jpg", 0, 0, 2000, 50),
    new SolidObject("/img/ground.jpg", 0, 400, 500, 50),
    new SolidObject("/img/ground.jpg", 0, 800, 500, 50),
    new SolidObject("/img/ground.jpg", 0, 1000, 500, 50),
    new SolidObject("/img/ground.jpg", 0, 1200, 500, 50),
    new SolidObject("/img/ground.jpg", 0, 1600, 500, 50),
    new SolidObject("/img/ground.jpg", -300, 0, 50, 500),
    new SolidObject("/img/ground.jpg", 000, 0, 50, 500),
    new SolidObject("/img/ground.jpg", -300, 300, 50, 500, -40),
  ];
};

w.draw = function (ctx, dt) {
  this.immaterialObjects.forEach(function (o) {
    if (o.img && !o.loaded) return;
    o.draw(ctx);
  });
  
  this.solidObjects.forEach(function (o) {
    if (o.loaded) {
      o.draw(ctx);
    }
  });
};