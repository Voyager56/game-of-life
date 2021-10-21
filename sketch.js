function makeArray(cols,rows){
  return Array(cols).fill(0).map(() => Array(rows).fill(0));;
}

function randomGrid(grid,rows,cols){
    for(let i = 0; i<cols;i++){
      for(let j =0;j<rows;j++){
        grid[i][j] = Math.floor(random(2))
    }
  }
  return grid
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

function nextGeneration(grid,cols,rows,nextgen){
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

function mouseClicked(){
  let resolution = (width/rows);
  newI = Math.floor(mouseX/resolution);
  newJ = Math.floor(mouseY/resolution);
  if(grid[newI][newJ]==1){
    grid[newI][newJ] = 0;
  }else{
    grid[newI][newJ] = 1;
  }
}

function show(grid,cols,rows,resolution){
  for(let i = 0; i<cols;i++){
    for(let j =0;j<rows;j++){
      if(grid[i][j] == 1){
        fill(0)
      }else{
        fill(255)
      }
      square(i*resolution,j*resolution,resolution)
    }
  }
}
let rows = 60;
let cols = 60;
let grid;
let start = 'off';
function setup() {
  button = createButton('start')
  stopbtn = createButton('stop')
  reset = createButton('reset')
  raondombtn = createButton('random')
  button.mousePressed(() => {
    start = 'on'
   })
   stopbtn.mousePressed(()=>{
     start = 'off'
   })
   raondombtn.mousePressed(()=>{
     grid = makearray(cols,rows);
     grid = randomgrid(grid,rows,cols);
   })
   reset.mousePressed(()=>{
     grid = makearray(cols,rows);
   })
    grid = makeArray(cols,rows);
    grid = randomGrid(grid,rows,cols);
    createCanvas(800, 800);
}
 
function draw() {
  background(220);
  stroke(100)
  let nextgen = makeArray(cols,rows)
  const resolution = width/rows;
  if(start == 'off'){
    show(grid,cols,rows,resolution)
  }
  if(start == 'on'){
    show(grid,cols,rows,resolution)
    grid = nextGeneration(grid,cols,rows,nextgen);
  }
}
