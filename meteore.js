var AstArray = [];
var NbAst = 2;
var tab = [];


class Asteroid {

    constructor(x, y, vx, vy, id) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.id = id;

        this.boundingBox = {
            x: x,
            y: y,
            width: 125,
            height: 105
        }
    }

    drawBoundingBox() {
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.x, this.y, this.boundingBox.width, this.boundingBox.height);
        ctx.restore();
    }

    draw() {
        this.drawBoundingBox();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;

        for (var i = 0; i < 1; i++) {

            if (this.id == 0) {
                ctx.beginPath();
                ctx.strokeStyle = "green";
                ctx.lineWidth = 3;
                ctx.lineJoin = 'round';
                ctx.lineTo(this.x + 40, this.y + 10);
                ctx.lineTo(this.x + 10, this.y + 50);
                ctx.lineTo(this.x + 20, this.y + 80);
                ctx.lineTo(this.x + 40, this.y + 100);
                ctx.lineTo(this.x + 100, this.y + 90);
                ctx.lineTo(this.x + 120, this.y + 50)
                ctx.lineTo(this.x + 90, this.y + 5);
                ctx.closePath();
            }
            if (this.id == 1) {
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.lineWidth = 3;
                ctx.lineJoin = 'round';
                ctx.lineTo(this.x + 120, this.y + 50);
                ctx.lineTo(this.x + 100, this.y + 90);
                ctx.lineTo(this.x + 40, this.y + 100);
                ctx.lineTo(this.x + 50, this.y + 90);
                ctx.lineTo(this.x + 60, this.y + 50);
                ctx.lineTo(this.x + 90, this.y + 5);
                ctx.closePath();
                ctx.stroke();
            }
            if (this.id == 2) {
                ctx.beginPath();
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 3;
                ctx.lineJoin = 'round';
                ctx.lineTo(this.x + 40, this.y + 10);
                ctx.lineTo(this.x + 10, this.y + 50);
                ctx.lineTo(this.x + 20, this.y + 80);
                ctx.lineTo(this.x + 40, this.y + 100);
                ctx.lineTo(this.x + 50, this.y + 90);
                ctx.lineTo(this.x + 60, this.y + 50)
                ctx.lineTo(this.x + 90, this.y + 5);
                ctx.closePath();
                ctx.stroke();
            }

            if (this.id == 3) {
                ctx.strokeStyle = "orange";
                ctx.lineWidth = 3;
                ctx.lineJoin = 'round';
                ctx.beginPath();
                ctx.lineTo(this.x + 40, this.y + 20);
                ctx.lineTo(this.x + 50, this.y + 40);
                ctx.lineTo(this.x + 40, this.y + 50);
                ctx.lineTo(this.x + 20, this.y + 60);
                ctx.lineTo(this.x + 10, this.y + 55);
                ctx.lineTo(this.x + 30, this.y + 20);
                ctx.closePath();
            }
        }
        ctx.stroke();
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }
}

// Change this number to get more meteores


function createMeteore(numberOfMeteore) {
    for (var i = 0; i < numberOfMeteore; i++) {

        // Create a meteore with random position and speed
        var meteore = new Asteroid(400,
            400,
            (2 * Math.random()) - 1,
            (2 * Math.random()) - 1,
            0, 0); // radius, change if ou like.

        // Add it to the array
        AstArray[i] = meteore;
    }

}

createMeteore(NbAst);

function collisionTestWithWalls(meteore) {
    if (meteore.x < 0) {
        meteore.x = width;
        //meteore.vx *= -1;
    }
    if (meteore.x > width) {
        meteore.x = 0;
        //meteore.vx *= -1;
    }
    if (meteore.y < 0) {
        meteore.y = height;
        //meteore.vy *= -1;
    }
    if (meteore.y > height) {
        meteore.y = 0;
        //meteore.vy *= -1;
    }
<<<<<<< HEAD
}
=======
}



function Meteore(x, y, vx, vy,id) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.id = id;
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
    	if(this.id == 0){
    		ctx.beginPath();
      		ctx.strokeStyle = "green";
      		ctx.lineWidth = 3;
      		ctx.lineJoin = 'round';
      		ctx.lineTo(this.x+40,this.y+10);
      		ctx.lineTo(this.x+10,this.y+50);
      		ctx.lineTo(this.x+20,this.y+80);
      		ctx.lineTo(this.x+40,this.y+100);
      		ctx.lineTo(this.x+100,this.y+90);
     		ctx.lineTo(this.x+120,this.y+50)
     		ctx.lineTo(this.x+90,this.y+5);
     		ctx.closePath();
    	}
    	if(this.id == 1){
    		 ctx.beginPath();
      		ctx.strokeStyle = "red";
      		ctx.lineWidth = 3;
     		ctx.lineJoin = 'round';
      		ctx.lineTo(this.x+120,this.y+50);
     		ctx.lineTo(this.x+100,this.y+90);
      		ctx.lineTo(this.x+40,this.y+100);
     		ctx.lineTo(this.x+50,this.y+90);
      		ctx.lineTo(this.x+60,this.y+50);
     		ctx.lineTo(this.x+90,this.y+5);
     		ctx.closePath();
     		ctx.stroke();
    	}
    	if(this.id == 2){
    		ctx.beginPath();
      		ctx.strokeStyle = "blue";
      		ctx.lineWidth = 3;
     		ctx.lineJoin = 'round';
     		ctx.lineTo(this.x+40,this.y+10);
     		ctx.lineTo(this.x+10,this.y+50);
     		ctx.lineTo(this.x+20,this.y+80);
     		ctx.lineTo(this.x+40,this.y+100);
     		ctx.lineTo(this.x+50,this.y+90);
    		ctx.lineTo(this.x+60,this.y+50)
     		ctx.lineTo(this.x+90,this.y+5);
     		ctx.closePath();
     		ctx.stroke();
      }
      
      if(this.id == 3){
        ctx.strokeStyle = "orange";
        ctx.lineWidth = 3;
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

  
      // permet d'arrondir les bords de l'astéroids pour la rendre plus homogène
   /* ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.lineTo(this.x+40,this.y+20);
    ctx.lineTo(this.x+50,this.y+40);
    ctx.lineTo(this.x+40,this.y+50);
    ctx.lineTo(this.x+20,this.y+60);
    ctx.lineTo(this.x+10,this.y+55);
    ctx.lineTo(this.x+30,this.y+20);
    ctx.closePath();*/
    }
    ctx.stroke();
  }

  
  this.move = function() {
    this.x += this.vx;
    this.y += this.vy;

    this.boundingBox.x = this.x + 10;
    this.boundingBox.y = this.y + 20;

  };
  
}

>>>>>>> TestClass
