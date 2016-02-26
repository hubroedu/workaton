JetDude = function() {
  //image loading for character
  var self = this;
  this.img = new Image();
  this.img.src = "/img/jetdude.png";
  this.loaded = false;

  this.img.addEventListener("load", function() {
    self.loaded = true;
  });

  this.x = 100;
  this.y = 100;
  this.jetpackY = 70;
  this.jetpackX = 8;

  this.fires = Particles.Fire.generate(50);
}

var j = JetDude.prototype;

