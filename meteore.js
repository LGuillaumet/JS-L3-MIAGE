var canvas, ctx, width, height;
var AstArray = [];
var NbAst = 1;
var tab = [];

function init() {
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  
  for (i=0;i<NbAst;i++){
    tab.push( Math.trunc(Math.random()*10) );
    console.log(tab[i]);
  }
  
  requestAnimationFrame(mainLoop);
}

  // Change this number to get more balls

  createBalls(NbAst);
function createBalls(numberOfBalls) {
  for(var i=0; i < numberOfBalls; i++) {
    
    // Create a ball with random position and speed
    var ball =  new Ball(1,
                          1,
                          (2*Math.random())-1,
                          (2*Math.random())-1); // radius, change if ou like.
    
    // Add it to the array
    AstArray[i] = ball;
  }
  
}                                

function mainLoop() {
    // vasClear the can
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // For each ball in the array
    for(var i=0; i < AstArray.length; i++) {
      var balle = AstArray[i];
      
      // 1) Move the ball
      balle.move();   
  
      // 2) collision test with walls
      collisionTestWithWalls(balle);
  
      // 3) draw the ball
      balle.draw();
  }
  
  collisionTestBetweenBalls();
  
    // Ask for new animation frame
     window.requestAnimationFrame(mainLoop);
}
 
function collisionTestWithWalls(ball) {
    if (ball.x < ball.rayon) {
        ball.x = ball.rayon;
        ball.vx *= -1;
    } 
    if (ball.x > width - (ball.rayon)) {
        ball.x = width - (ball.rayon);
        ball.vx *= -1;
    }     
    if (ball.y < ball.rayon) {
        ball.y = ball.rayon;
        ball.vy *= -1;
    }     
    if (ball.y > height - (ball.rayon)) {
        ball.y = height - (ball.rayon);
        ball.vy *= -1;
    }
}

// Cette collision ne fonctionne pas
function collisionTestBetweenBalls() {  
  var balls = AstArray;
  
  for (var i = 0; i < AstArray.length; i++) {
        for (var j = i + 1; j < AstArray.length; j++) {
            var dx = balls[j].x - balls[i].x;
            var dy = balls[j].y - balls[i].y;
          
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (balls[j].rayon + balls[i].rayon)) {
                // balls have contact so push back...
                var normalX = dx / dist;
                var normalY = dy / dist;
                var middleX = (balls[i].x + balls[j].x) / 2;
                var middleY = (balls[i].y + balls[j].y) / 2;
              
                balls[i].x = middleX - normalX * balls[i].rayon;
                balls[i].y = middleY - normalY * balls[i].rayon;
                balls[j].x = middleX + normalX * balls[j].rayon;
                balls[j].y = middleY + normalY * balls[j].rayon;
              
                var dVector = (balls[i].vx - balls[j].vx) * normalX;
                dVector += (balls[i].vy - balls[j].vy) * normalY;
                var dvx = dVector * normalX;
                var dvy = dVector * normalY;
              
                balls[i].vx -= dvx;
                balls[i].vy -= dvy;
                balls[j].vx += dvx;
                balls[j].vy += dvy;
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
  
  //Fonction de dessin
  this.draw = function() {
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
  };
  
}

