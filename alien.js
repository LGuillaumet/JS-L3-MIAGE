var AlienArray =[];

function Alien(x, y, angleD, anglex, angley, vx, vy,amplitude) {
  this.x = x;
  this.y = y;
  this.angleD = angleD;
  this.anglex = anglex;
  this.angley = angley;
  this.vx = vx;
  this.vy = vy;
  this.amplitude = amplitude;
  this.bulletsA = [];
  this.boundingBox = {
  	x:x,
  	y:y,
  	wifth: 110,
  	height: 95
  }

  this.drawBoundingBox = function(ctx) {
    ctx.save();
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.boundingBox.x, this.boundingBox.y,    this.boundingBox.width, this.boundingBox.height);
    ctx.restore();
  }


  this.draw = function() {
    this.drawBoundingBox(ctx);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angleD);
    ctx.rotate(Math.PI / -0.4455);
    ctx.translate(-25, -25);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, 0); // pick up "pen," reposition at 500 (horiz), 0 (vert)0
    ctx.lineTo(70, 25); // draw straight down by 200px (200 + 200)
    ctx.lineTo(25, 25); // draw up toward left (100 less than 300, so left)
    ctx.lineTo(25, 70);
    ctx.closePath(); // connect end to start
    ctx.stroke(); // outline the shape that's been described
    ctx.fill();
    ctx.restore();
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
 
  this.move = function(){
  	this.anglex += this.vx;
  	this.angley += this.vy;
    let d1x = this.x - Vaisseau1.x;
    let d1y = this.y - Vaisseau1.y;
    this.angleD = Math.atan2(d1y, d1x);
  	this.x = width/2 + Math.sin(radians(this.anglex / 5)) * width/3;
  	this.y = height/2 + Math.sin(radians(this.angley)) * this.amplitude;
  }

  this.drawBulletsA = function(){
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

this.addBulletA = function() {
        console.log("tir alien");
        this.bulletsA.push(new BulletA(this));
    }

this.removeBulletA = function(bulletA) {
        let position = this.bulletsA.indexOf(bulletA);
        this.bulletsA.splice(position, 1);
    }

}

createAlien(1);

function createAlien(numberOfAlien){
	console.log("alien");
	for(var k=0; k < numberOfAlien; k++){
		var alien = new Alien((Math.random()*1200),
                         	(Math.random()*800),
                          0,
                          (2*Math.random())-1,
                         	(2*Math.random())-1,
                        	(Math.random()*3),
                         	(Math.random()*3),
                         	(Math.random()*400));
      
		AlienArray[k] = alien;
	}
}


function radians(degrees) {
    var TAU = 2 * Math.PI;
    return degrees * TAU / 360;
}

