let grid;
let score = 0;

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.position(screen.availWidth / 2 - 400 / 2, 120);
  noLoop();
  grid = blankGrid();
  // console.table(grid);
  addNumber();
  addNumber();
  updateCanvas();
}

// One "move"
function keyPressed() {
  let flipped = false;
  let rotated = false;
  let played = true;
  switch (keyCode) {
    case DOWN_ARROW:
      // do nothing
      break;
    case UP_ARROW:
      grid = flipGrid(grid);
      flipped = true;
      break;
    case RIGHT_ARROW:
      grid = transposeGrid(grid);
      rotated = true;
      break;
    case LEFT_ARROW:
      grid = transposeGrid(grid);
      grid = flipGrid(grid);
      rotated = true;
      flipped = true;
      break;
    default:
      played = false;
  }

  if (played) {
    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);
    if (flipped) {
      grid = flipGrid(grid);
    }
    if (rotated) {
      grid = transposeGrid(grid);
    }
    if (changed) {
      addNumber();
    }
    updateCanvas();

    let gameover = isGameOver();
    if (gameover) {
      console.log('GAME OVER');
    }

    let gamewon = isGameWon();
    if (gamewon) {
      console.log('GAME WON');
    }
  }
}

function updateCanvas() {
  background(255);
  drawGrid();
  select('#score').html(score);
}

function drawGrid() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      let val = grid[i][j];
      let s = val.toString();

        strokeWeight(4);
        stroke(0);


      if (val != 0) {
        fill(colorsSizes[s].color);
      } else {
        noFill();
      }
      rect(i * w, j * w, w, w);
      if (val !== 0) {
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        textSize(colorsSizes[s].size);
        text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}
