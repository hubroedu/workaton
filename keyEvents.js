KeyDown = {
  right: false,
  left: false,
  up: false,
  down: false
}

window.addEventListener("keydown", function(e) {
  e = e || window.event;
  if (e.keyCode == '38') {
    // up arrow
    console.log("key up");
    KeyDown.up = true;
  }
  else if (e.keyCode == '40') {
    // down arrow
    KeyDown.down = true;
  }
  else if (e.keyCode == '37') {
    // left arrow
    KeyDown.left = true;
  }
  else if (e.keyCode == '39') {
    // right arrow
    KeyDown.right = true;
  }
}, true);

window.addEventListener("keyup", function(e) {
  e = e || window.event;
  if (e.keyCode == '38') {
    // up arrow
    KeyDown.up = false;
  }
  else if (e.keyCode == '40') {
    // down arrow
    KeyDown.down = false;
  }
  else if (e.keyCode == '37') {
    // left arrow
    KeyDown.left = false;
  }
  else if (e.keyCode == '39') {
    // right arrow
    KeyDown.right = false;
  }
}, true);
