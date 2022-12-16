function setup() {
  let width;
  if (window.innerWidth > 768){
    var canvas1 = createCanvas(400, 400);
    width = 400;
  } else {
    width = 300;
    var canvas1 = createCanvas(300, 300)
  }
  canvas1.parent('sketch-holder');
  background(0);
  genMaze(width);
}