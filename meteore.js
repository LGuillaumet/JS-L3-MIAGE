
var AstArray = [];
var NbAst = 2;
var cunrrentNB = NbAst;
var tab = [];

var etoilenoire = new Image(110, 95);
etoilenoire.src = "deathstar.png";

var tie = new Image(50, 50);
tie.src = "tie.png";

var destroyer = new Image(100, 100);
destroyer.src = "destroyer.png";
destroyer.style.transform = 'rotate(180deg)';


// Change this number to get more meteores

createMeteore(NbAst);
function createMeteore(numberOfMeteore) {
  for (var i = 0; i < numberOfMeteore; i++) {

    // Create a meteore with random position and speed
    var meteore = new Meteore((Math.random() * 1200),
      (Math.random() * 800),
      (2 * Math.random()) - 1,
      (2 * Math.random()) - 1,
      0); // radius, change if ou like.

    // Add it to the array
    AstArray[i] = meteore;
  }

}



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
}



function Meteore(x, y, vx, vy, id) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.id = id;
  this.rayon = 20;
  if (this.id == 0) {
    this.boundingBox = {
      x: x,
      y: y,
      width: 110,
      height: 95
    }
  }
  if (this.id == 1) {
    this.boundingBox = {
      x: x,
      y: y,
      width: 80,
      height: 95
    }
  }
  if (this.id == 2) {
    this.boundingBox = {
      x: x,
      y: y,
      width: 80,
      height: 95
    }
  }
  if (this.id == 3) {
    this.vx = (Math.random() * 10) - 5;  // returns a random integer from -5 to 5;
    this.vy = (Math.random() * 10) - 5;
    this.boundingBox = {
      x: x,
      y: y,
      width: 40,
      height: 40
    }
  }


  this.drawBoundingBox = function (ctx) {
    ctx.save();
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
    ctx.restore();
  }

  //Fonction de dessin

  this.draw = function () {
    if (afficher_bounding == true) {
      this.drawBoundingBox(ctx);
    }
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    for (var i = 0; i < 1; i++) {
      if (this.id == 0) {
        if (swmode == true) {
          ctx.drawImage(etoilenoire, this.x + 10, this.y + 5, 110, 95);
        } else {
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
      }
      if (this.id == 1) {
        if (swmode == true) {
          ctx.save();
          ctx.translate(this.boundingBox.x+87, this.boundingBox.y+30);
          ctx.rotate(22.5*Math.PI);
          ctx.translate(-this.boundingBox.x, -this.boundingBox.y);
          ctx.drawImage(destroyer, this.x + 10, this.y + 5, 110, 95);
          ctx.restore();
        } else {
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
      }

      if (this.id == 2) {
        if (swmode == true) {
          ctx.save();
          ctx.translate(this.boundingBox.x+87, this.boundingBox.y);
          ctx.rotate(22.5*Math.PI);
          ctx.translate(-this.boundingBox.x, -this.boundingBox.y);
          ctx.drawImage(destroyer, this.x + 10, this.y + 5, 110, 95);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.strokeStyle = "#0080ff";
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
      }

      if (this.id == 3) {
        if (swmode == true) {
          ctx.drawImage(tie, this.x + 5, this.y + 15, 50, 50);
        } else {
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

    }
    ctx.stroke();
  }


  this.move = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.id == 0) {
      this.boundingBox.x = this.x + 10;
      this.boundingBox.y = this.y + 5;
    }
    if (this.id == 1) {
      this.boundingBox.x = this.x + 40;
      this.boundingBox.y = this.y + 5;
    }
    if (this.id == 2) {
      this.boundingBox.x = this.x + 10;
      this.boundingBox.y = this.y + 5;
    }
    if (this.id == 3) {
      this.boundingBox.x = this.x + 10;
      this.boundingBox.y = this.y + 20;
    }
  };

}
