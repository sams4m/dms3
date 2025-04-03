// COMM2747 Creative Coding Assignment 1
// Written by: Samantha Lugay 
// Student Number: s4087814
// ----------------------------------------------------------------------- //
// DECLARE VARS
// random colour index
let randCol = 2;

// DECLARE CLASS
class Background {
  constructor() {
    // initialise vars
    // random whole number of circles on screen
    this.numCircles = round(random(1, maxNumCircles));
    console.log('Number of circles:', this.numCircles);
    
    // assign a random colour index #
    // this determines the initial colour of blobs on screen
    randCol = rand_col_index();
    console.log('random colour index:', randCol);
    
    // declare randomised value array
    // will hold objects: x coord, y coord, size of circle
    // number of circles == the length of randVals
    this.randVals = [this.numCircles];
    
    // loop to create and assign values into each 
    // object in array 
    for (let i = 0; i < this.numCircles; i++) {
      this.randVals[i] = rand_vals(i);
    }

    
  }
  
  // ---------------------------------------------------------------- //
  draw() {
    //GROWING CIRCLE
    // looping of how the growing circles behave
    // i == number of circles being drawn, the higher the i
    // the more circles being drawn for each iteration 
    // i increment adjusts the 'smoothness' of the movement -> # steps
    for (let i = 40; i > 0; i-=8){ 
      // colour of circles -> based off random colour index
      // rgb values -8 each time --> gets lighter as it grows ->  
      // allows new circles that bloom to be seen 
      fill(colours[randCol].r + i, colours[randCol].g + i, colours[randCol].b + i)
      
      
      // looping to draw each circle on screen
      for (let j = 0; j < this.numCircles; j++) {
        // draw circle
        // ellipse(x coord, y coord, size)
        ellipse(this.randVals[j].x, this.randVals[j].y, i / 2 + this.randVals[j].size); 
      
        // Add the 'adder' for circle size to grow 
        this.randVals[j].size+=adder;

        //If circle size is greater than window height, 
        // restart circle growth and reassign randVals values
        if (this.randVals[j].size >= height) {
          this.randVals[j] = rand_vals(j);
        }
      }     
    }
    
    // blur the background screen 
    // gives the blooming feeling 
    filter(BLUR, 25);
  }
}

// ----------------------------------------------------------------------- //
// RANDOM COLOUR INDEX # FUNCTION 
function rand_col_index() {
  // declare var r, which will compute a random index number 
  // out of the number colours in colours array 
  let r = floor(random(colours.length - 1));
  console.log('r:', r);
  
  // if the new random index == the current index number 
  // call the function again to get a new random index number
  // that is different 
  if (r == randCol) {
    console.log('call recursive')
    return rand_col_index();
  } else {
    // return new random index
    //randCol= r;
    return r;
  }
}

// ----------------------------------------------------------------------- //
// ASSIGN RANDOM OBJ VALUES FUNCTION 
function rand_vals(i) {
  // devlare a local place holder obj variable 
  let vals = {
    // random x coordinate
    x: random(width),
    // random y coordinate
    y: random(height),
    // random starting size of circle
    size: random(15),
  }
    
  // print random vals
  console.log('randVal', i, vals);
  
  // return vals object
  return vals;
}

