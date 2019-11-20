
var AstArray = [];
var NbAst = 5;
var tab = [];


  // Change this number to get more meteores

  createBalls(NbAst);
function createBalls(numberOfBalls) {
  for(var i=0; i < numberOfBalls; i++) {
    
    // Create a meteore with random position and speed
    var meteore =  new Ball(1,
                          1,
                          (2*Math.random())-1,
                          (2*Math.random())-1); // radius, change if ou like.
    
    // Add it to the array
    AstArray[i] = meteore;
  }
  
}                                


 
function collisionTestWithWalls(meteore) {

    if (meteore.x < meteore.rayon) {
        meteore.x = meteore.rayon;
        meteore.vx *= -1;
    } 
    if (meteore.x > width - (meteore.rayon)) {
        meteore.x = width - (meteore.rayon);
        meteore.vx *= -1;
    }     
    if (meteore.y < meteore.rayon) {
        meteore.y = meteore.rayon;
        meteore.vy *= -1;
    }     
    if (meteore.y > height - (meteore.rayon)) {
        meteore.y = height - (meteore.rayon);
        meteore.vy *= -1;
    }
}



function Ball(x, y, vx, vy) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.rayon = 20;
  this.boundingBox = {
    x: x,
    y: y,
    width: 40,
    height: 40
  }

  this.drawBoundingBox = function(ctx) {
    ctx.save();
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.boundingBox.x, this.boundingBox.y,    this.boundingBox.width, this.boundingBox.height);
    ctx.restore();
  }

  //Fonction de dessin
  this.draw = function() {
    this.drawBoundingBox(ctx);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    
    for (var i=0;i<1;i++){
      // permet d'arrondir les bords de l'astéroids pour la rendre plus homogène
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.lineTo(this.x+40,this.y+20);
    ctx.lineTo(this.x+50,this.y+40);
    ctx.lineTo(this.x+40,this.y+50);
    ctx.lineTo(this.x+20,this.y+60);
    ctx.lineTo(this.x+10,this.y+55);
    ctx.lineTo(this.x+30,this.y+20);
    ctx.closePath();
    }
    ctx.stroke();
  };
  
  this.move = function() {
    this.x += this.vx;
    this.y += this.vy;

    this.boundingBox.x = this.x + 10;
    this.boundingBox.y = this.y + 20;

  };
  
}

