function makearray(cols,rows){
  let array = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  return array;
}
function randomgrid(grid,cols,rows){
    for(let i = 0; i<rows;i++){
      for(let j =0;j<cols;j++){
        grid[i][j] = Math.floor(random(2))
    }
  }
  return grid
}
function neighbor(grid,col,row){
  let counter = 0;
  for(let i =-1;i<2;i++){
    for(let j = -1;j<2;j++){
      let newI = col + i;
      let newJ = row + j;
      counter += grid[newI][newJ]
    }
  }
  counter -= grid[col][row]
  return counter;
}
function generategeneration(grid,cols,rows,nextgen){
  for(let i = 1; i<rows-1;i++){
    for(let j =1;j<cols-1;j++){
      if(grid[i][j] == 1 && neighbor(grid,i,j)<2){
        nextgen[i][j] =0;
      }
      if(grid[i][j] == 1 && (neighbor(grid,i,j) == 2 || neighbor(grid,i,j) == 3)){
        nextgen[i][j] = 1;
      }
      if(grid[i][j] == 1 && neighbor(grid,i,j)>3){
        nextgen[i][j] =0;
      }
      if(grid[i][j] == 0 && neighbor(grid,i,j)==3){
        nextgen[i][j] =1;
      }      
    }
  }
  
  return nextgen;
}
function show(grid,cols,rows,resolution){
  for(let i = 0; i<rows;i++){
    for(let j =0;j<cols;j++){
      square(i*resolution,j*resolution,resolution)
      if(grid[i][j] == 1){
        fill(0)
      }else{fill(255)}
    }
  }
}
const rows = 50;
const cols = 50;
let grid;
function setup() {
   grid = makearray(cols,rows);
   grid = randomgrid(grid,cols,rows)
  createCanvas(400, 400);
}

function draw() {
  background(220);
  stroke(100)
  let nextgen = makearray(cols,rows)
  const resolution = width/rows;
  show(grid,cols,rows,resolution)
  grid = generategeneration(grid,cols,rows,nextgen);
}