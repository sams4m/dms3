// COMM2747 Creative Coding Assignment 1
// Written by: Samantha Lugay 
// Student Number: s4087814
// ----------------------------------------------------------------------- //
// DECLARE GLOBAL VAR
// background
let bg;
// maximum number of circles on screen,
// adder -> speed of circle growth, 
// sounds array
const maxNumCircles = 10, adder = 3, sound = [];

// preloading sounds into sound array
function preload() {
  sound.push(loadSound ('/sound/chimes.wav'));
  sound.push(loadSound ('/sound/chimes01.wav'));
  
  console.log('sounds loaded');
}

// ----------------------------------------------------------------------- //
function setup(){
  // create canvas with width = window width, height = window height
  createCanvas(innerWidth , innerHeight);
  // define colour mode being used
  colorMode(RGB);
  // initial background colour
  background(colours[2].r, colours[2].g, colours[2].b);
  
  // no stroke around shapes
  noStroke();
  
  // assign Background obj values to bg array
  // class in background.js
  bg = new Background();
    
}

// ----------------------------------------------------------------------- //
function draw() {
  // if canvas pressed, interaction occurs
  if (mouseIsPressed === true) {
    screenClicked();
  }
  
  // draw the background (the blobs on screen)
   bg.draw();

  // draw ghost sprite
  // function in ghost.js
  ghost_sprite();
}  
 

// ----------------------------------------------------------------------- //
// SCREEN CLICKED FUNCTION 
function screenClicked() {
  console.log('screen clicked');

  // play sound
  sound[1].play();
  
  // resetting the background -> run new instance on background class
  // assign background obj values to bg array
  bg = new Background();
}



