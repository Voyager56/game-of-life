function makearray(rows,cols){
  let array
  array = new Array(cols).fill(0)
  for(let i=0;i<cols;i++){
    array[i] = new Array(rows).fill(0)
  } 
  return array;
}
function mod(n, m) {
  if(m!=0){
  return ((n % m) + m) % m;
  }
  else{return }
}
function randomgrid(grid,rows,cols){
    for(let i = 0; i<cols;i++){
      for(let j =0;j<rows;j++){
        grid[i][j] = Math.floor(random(2))
    }
  }
  return grid
}

function generategeneration(grid,cols,rows,nextgen){
  for(let i= 0; i<cols;i++){
    for(let j=0;j<rows;j++){
      let p = grid[i][j]
      let count = neighbor(grid,i,j)
      if(p == 1 && (count<2 || count >3)){
        nextgen[i][j] =0;
      }
      if(p == 1 && (count == 2 || count == 3)){
        nextgen[i][j] = p;
      }
      if(p == 0 && count==3){
        nextgen[i][j] =1;
      }
    }
  }

  return nextgen;
}
function show(grid,cols,rows,resolution){
  for(let i = 0; i<cols;i++){
    for(let j =0;j<rows;j++){
      square(i*resolution,j*resolution,resolution)
      if(grid[i][j] == 1){
        fill(0)
      }else{fill(255)}
    }
  }
}
const rows = 70;
const cols = 70;
let grid;
function setup() {
   grid = makearray(rows,cols);
   grid = randomgrid(grid,rows,cols);
  createCanvas(400, 400);
}
 
function draw() {
  ful
  background(220);
  stroke(100)
  let nextgen = makearray(rows,cols)
  const resolution = width/rows;
  show(grid,cols,rows,resolution)
  grid = generategeneration(grid,cols,rows,nextgen);
}

function neighbor(grid,col,row){
  let counter = 0;
  for(let i =-1;i<2;i++){
    for(let j = -1;j<2;j++){
       let newI = (col+j+cols)%cols;
       let newJ = (row+i+rows)%rows;
      counter += grid[newI][newJ]
    }
  }
  counter -= grid[col][row]
  return counter;
}