var AlienArray = [];
var NBAlien = 0;
var currentNBAlien = NBAlien;
var alienIMG = new Image(10, 10);
alienIMG.src = "Alien.png";

var alienIONIMG = new Image(10, 10);
alienIONIMG.src = "AlienION.png";


function Alien(x, y, angleD, anglex, angley, vx, vy, amplitude, id) {
  this.x = x;
  this.y = y;
  this.angleD = angleD;
  this.anglex = anglex;
  this.angley = angley;
  this.vx = vx;
  this.vy = vy;
  this.amplitude = amplitude;
  this.id = id;
  this.bulletsA = [];
  this.boundingBox = {
    x: x,
    y: y,
    width: 50,
    height: 50
  }

  this.drawBoundingBox = function (ctx) {
    ctx.save();
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
    ctx.restore();
  }


  this.draw = function () {
    if (afficher_bounding == true) {
      this.drawBoundingBox(ctx);
    }

    if(swmode == true){
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleD);       
      ctx.translate(-30, -30);
      if(this.id == 0){
        ctx.drawImage(alienIMG, 0, 0, 60, 60);
      }
      if(this.id == 1){
        ctx.drawImage(alienIONIMG, 0, 0, 60, 60);
      }
      ctx.restore();
    }
    if(swmode == false){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angleD);
    ctx.rotate(Math.PI / -0.4455);
    ctx.translate(-25, -25);
    ctx.beginPath();
    if (this.id == 0) {
      ctx.strokeStyle = "white";
    }
    if (this.id == 1) {
      ctx.strokeStyle = "#27c9ff";
    }
    ctx.moveTo(0, 0); // pick up "pen," reposition at 500 (horiz), 0 (vert)0
    ctx.lineTo(70, 25); // draw straight down by 200px (200 + 200)
    ctx.lineTo(25, 25); // draw up toward left (100 less than 300, so left)
    ctx.lineTo(25, 70);
    ctx.closePath(); // connect end to start
    ctx.stroke(); // outline the shape that's been described
    ctx.fill();
    ctx.restore();
  }
    if (this.x < 0)
      this.x = width;
    if (this.y < 0)
      this.y = height;
    if (this.x > width)
      this.x = 0;
    if (this.y > height)
      this.y = 0;
    this.drawBulletsA(ctx);
  }

  this.move = function () {
    this.anglex += this.vx;
    this.angley += this.vy;
    let d1x = this.x - Vaisseau1.x;
    let d1y = this.y - Vaisseau1.y;
    this.angleD = Math.atan2(d1y, d1x);
    this.x = width / 2 + Math.sin(radians(this.anglex / 5)) * width / 3;
    this.y = height / 2 + Math.sin(radians(this.angley)) * this.amplitude;
    this.boundingBox.x = this.x - 25;
    this.boundingBox.y = this.y - 25;

  }

  this.drawBulletsA = function () {
    for (let i = 0; i < this.bulletsA.length; i++) {
      var b = this.bulletsA[i];
      setTimeout(() => {
        delete this.bulletsA[i];
      }, 1000);

      if (b != undefined) {
        b.draw(ctx);
        b.move();
        if (b.x < 0)
          b.x = width;
        if (b.y < 0)
          b.y = height;
        if (b.x > width)
          b.x = 0;
        if (b.y > height)
          b.y = 0;

      }
    }
  }

  this.addBulletA = function () {
    //console.log("tir alien");
    this.bulletsA.push(new BulletA(this, 0));
  }

  this.addBulletA2 = function () {
    //console.log("tir alien");
    this.bulletsA.push(new BulletA(this, 1));
  }

  this.removeBulletA = function (bulletA) {
    let position = this.bulletsA.indexOf(bulletA);
    this.bulletsA.splice(position, 1);
  }

}



function createAlien(numberOfAlien) {
  //console.log("alien");
  for (var k = 0; k < numberOfAlien; k++) {
    var alien = new Alien((Math.random() * 1200),
      (Math.random() * 800),
      0,
      (2 * Math.random()) - 1,
      (2 * Math.random()) - 1,
      (Math.random() * 3),
      (Math.random() * 3),
      (Math.random() * 400), 0);

    AlienArray[k] = alien;
  }
}

function createAlienION(numberOfAlien) {
  //console.log("alien");
  for (var k = 0; k < numberOfAlien; k++) {
    var alien = new Alien((Math.random() * 1200),
      (Math.random() * 800),
      0,
      (2 * Math.random()) - 1,
      (2 * Math.random()) - 1,
      (Math.random() * 3),
      (Math.random() * 3),
      (Math.random() * 400), 1);

    AlienArray[k] = alien;
  }
}


function radians(degrees) {
  var TAU = 2 * Math.PI;
  return degrees * TAU / 360;
}