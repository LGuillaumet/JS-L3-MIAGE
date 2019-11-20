
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

// Cette collision ne fonctionne pas
function collisionTestBetweenBalls() {  
  var meteores = AstArray;
  
  for (var i = 0; i < AstArray.length; i++) {
        for (var j = i + 1; j < AstArray.length; j++) {
            var dx = meteores[j].x - meteores[i].x;
            var dy = meteores[j].y - meteores[i].y;
          
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (meteores[j].rayon + meteores[i].rayon)) {
                // meteores have contact so push back...
                var normalX = dx / dist;
                var normalY = dy / dist;
                var middleX = (meteores[i].x + meteores[j].x) / 2;
                var middleY = (meteores[i].y + meteores[j].y) / 2;
              
                meteores[i].x = middleX - normalX * meteores[i].rayon;
                meteores[i].y = middleY - normalY * meteores[i].rayon;
                meteores[j].x = middleX + normalX * meteores[j].rayon;
                meteores[j].y = middleY + normalY * meteores[j].rayon;
              
                var dVector = (meteores[i].vx - meteores[j].vx) * normalX;
                dVector += (meteores[i].vy - meteores[j].vy) * normalY;
                var dvx = dVector * normalX;
                var dvy = dVector * normalY;
              
                meteores[i].vx -= dvx;
                meteores[i].vy -= dvy;
                meteores[j].vx += dvx;
                meteores[j].vy += dvy;
            }
        }
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
    width: 50,
    height: 50
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

    this.boundingBox.x = this.x;
    this.boundingBox.y = this.y;

  };
  
}

