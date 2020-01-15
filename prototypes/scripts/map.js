// Variables for referencing the canvas and 2dcanvas context
var canvas, ctx;

// Variables to keep track of the mouse position and left-button status 
var mouseX, mouseY, mouseDown = 0;

// Keep track of xy coords
var coords = new Array;

// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position, the size of the dot
function drawDot(ctx, x, y, size) {
  // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
  r = 255;
  g = 0;
  b = 0;
  a = 50;

  // Select a fill style
  ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";

  // Draw a filled circle
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

// Clear the canvas context using the canvas width and height
function clearCanvas(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Keep track of the mouse button being pressed and draw a dot at current location
function sketchpad_mouseDown() {
  mouseDown = 1;
  drawDot(ctx, mouseX, mouseY, 12);
  coords.push({
    x: mouseX,
    y: mouseY
  })
}

// Keep track of the mouse button being released
function sketchpad_mouseUp() {
  mouseDown = 0;
}

// Keep track of the mouse position and draw a dot if mouse button is currently pressed
function sketchpad_mouseMove(e) {
  // Update the mouse co-ordinates when moved
  getMousePos(e);

  // Draw a dot if the mouse button is currently being pressed
  if (mouseDown == 1) {
    drawDot(ctx, mouseX, mouseY, 12);
    coords.push({
      x: mouseX,
      y: mouseY
    })
  }
}

// Get the current mouse position relative to the top-left of the canvas
function getMousePos(e) {
  if (!e)
    var e = event;

  if (e.offsetX) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  } else if (e.layerX) {
    mouseX = e.layerX;
    mouseY = e.layerY;
  }
}

// Draw something when a touch start is detected
function sketchpad_touchStart() {
  // Update the touch co-ordinates
  getTouchPos();

  drawDot(ctx, touchX, touchY, 10);
  coords.push({
    x: touchX,
    y: touchY
  })

  // Prevents an additional mousedown event being triggered
  event.preventDefault();
}

// Draw something and prevent the default scrolling when touch movement is detected
function sketchpad_touchMove(e) {
  // Update the touch co-ordinates
  getTouchPos(e);

  // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
  drawDot(ctx, touchX, touchY, 10);
  coords.push({
    x: touchX,
    y: touchY
  })

  // Prevent a scrolling action as a result of this touchmove triggering.
  event.preventDefault();
}

// Get the touch position relative to the top-left of the canvas
// When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
// but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
// "target.offsetTop" to get the correct values in relation to the top left of the canvas.
function getTouchPos(e) {
  if (!e) {
    var e = event;
  }
  if (e.touches) {
    if (e.touches.length == 1) { // Only deal with one finger
      var touch = e.touches[0]; // Get the information for finger #1
      touchX = touch.pageX - touch.target.offsetLeft;
      touchY = touch.pageY - touch.target.offsetTop;
    }
  }
}

// Set-up the canvas and add our event handlers after the page has loaded
function init() {
  // Get the specific canvas element from the HTML document
  canvas = document.getElementById('sketchpad');

  // If the browser supports the canvas tag, get the 2d drawing context for this canvas
  if (canvas.getContext)
    ctx = canvas.getContext('2d');

  // Check that we have a valid context to draw on/with before adding event handlers
  if (ctx) {
    canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
    canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
    window.addEventListener('mouseup', sketchpad_mouseUp, false);
    canvas.addEventListener('touchstart', sketchpad_touchStart, false);
    canvas.addEventListener('touchmove', sketchpad_touchMove, false);
    document.getElementById('clear').addEventListener('click', () => {
      // ctx.drawImage(document.getElementById('map'), 0, 0);
      coords = [];
    }, false);
    document.getElementById('create').addEventListener('click', () => {
      mapCoords();
    })

    // ctx.drawImage(document.getElementById('map'), 0, 0);
  }
}

function mapCoords() {
  document.getElementById('body').appendChild(document.createElement('canvas'));
  var newCanvas = document.getElementsByTagName('canvas')[1];
  newCanvas.setAttribute('height', '600');
  newCanvas.setAttribute('width', '800');
  var ctx2 = newCanvas.getContext('2d');
  // ctx2.drawImage(document.getElementById('map'), 0, 0);
  for (i in coords) {
    console.log(i);
    drawDot(ctx2, coords[i].x, coords[i].y, 10);
  }
}