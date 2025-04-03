// COMM2747 Creative Coding Assignment 1
// Written by: Samantha Lugay 
// Student Number: s4087814
// ----------------------------------------------------------------------- //
// GHOST SPRITE FUNCTION
function ghost_sprite() {
  // colour of ghost sprite
  // light yellow #f6f1f1, alpha 80%
  fill(246, 241, 241, 80);
  
  // spin the sprite so that it floats away for a bit
  // isn't always on screen and emulating a ghostly vibe 
  rotate(frameCount / 200.0);
  
  // draw the sprite -> call func star
  // star (x pos, y pos, inner r, outer r, number of points)
  star(mouseY, mouseX/2, 5, 20, 7);
 
}

// ----------------------------------------------------------------------- //
// STAR FUNCTION
//x-coord, y-coord, inner radius, outer radius, num of points
function star(x, y, r1, r2, n) {
  // full circle = 2pi
  // angle between each arm of star (points)
  let angle = TWO_PI / n;
  // angles where arms meet 
  let halfAngle = angle / 2.0;
  
  // start drawing star
  beginShape();
  // loops until a full circle complete
  for (let i = 0; i < TWO_PI; i += angle) {
    // drawing points of star
    // x = cosine, y = sin
    let sx = x + cos(i) * r2;
    let sy = y + sin(i) * r2;
    vertex(sx, sy);
    // coming back to where arms of star meet 
    sx = x + cos(i + halfAngle) * r1;
    sy = y + sin(i + halfAngle) * r1;
    vertex(sx, sy);
  }
  //end drawing shape
  endShape(CLOSE);
}