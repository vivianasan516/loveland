//The setup function only happens once
// center point
let centerX = 0.0, centerY = 0.0;

let radius = 40, rotAngle = -90;
let accelX = 0.0, accelY = 0.0;
let deltaX = 0.0, deltaY = 0.0;
let springing = 0.0080, damping = 0.80;

//corner 
let nodes = 5;

//zero fill arrays
let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];

// softening the shape
let organicConstant = 1.0;

function setup() {
  createCanvas(500, 500);
  //center shape in window
  centerX = width / 2;
  centerY = height / 2;

  //set arrays to 0
  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = 0;
    nodeStartY[i] = 0;
    nodeY[i] = 0;
    nodeY[i] = 0;
    angle[i] = 0;
  }

  // set frequencies for corners
  for (let i = 0; i < nodes; i++){
    frequency[i] = random(5, 12);
  }

  noStroke();
  frameRate(30);
}

function draw() {
  //background color and outline of the shape
  background(235,52,140);
  stroke(255,0,8);
  drawShape();
  moveShape();
}

function drawShape() {
  //  set the corner nodes starting locations
  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = centerX + cos(radians(rotAngle)) * radius;
    nodeStartY[i] = centerY + sin(radians(rotAngle)) * radius;
    rotAngle += 360.0 / nodes;
  }

  // draw the shape
  curveTightness(organicConstant);
  fill(255);
  beginShape();
  for (let i = 0; i < nodes; i++){
    curveVertex(nodeX[i], nodeY[i]);
  }
  for (let i = 0; i < nodes-1; i++){
    curveVertex(nodeX[i], nodeY[i]);
  }
  endShape(CLOSE);
}

function moveShape() {
  //move center point
  deltaX = mouseX - centerX;
  deltaY = mouseY - centerY;

  // set springing in motion
  deltaX *= springing;
  deltaY *= springing;
  accelX += deltaX;
  accelY += deltaY;

  // move the center
  centerX += accelX;
  centerY += accelY;

  // slow down springing effect
  accelX *= damping;
  accelY *= damping;

  // change curve shape
  organicConstant = 1 - ((abs(accelX) + abs(accelY)) * 0.1);

  //move the corner nodes
  for (let i = 0; i < nodes; i++){
    nodeX[i] = nodeStartX[i] + sin(radians(angle[i])) * (accelX * 2);
    nodeY[i] = nodeStartY[i] + sin(radians(angle[i])) * (accelY * 2);
    angle[i] += frequency[i];
  }
}




