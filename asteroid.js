var canvas, ctx, width, height;
var Vaisseau1;
var mousepos = { x: 0, y: 0 };
var inputStates = {};
var incrementX = 0;
var incrementAngle = 0;


window.onload = init;

class Vaisseau {
  constructor(x, y, angle, vitesse, tempsMinEntreTirsEnMillisecondes) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.v = vitesse;
    this.bullets = [];
    // cadenceTir en millisecondes = temps min entre tirs
    this.delayMinBetweenBullets = tempsMinEntreTirsEnMillisecondes;

  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.rotate(Math.PI / -0.4455);
    ctx.translate(-25, -25); //pour tourner sur lui même


    ctx.beginPath();
    ctx.strokeStyle = "red";
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

    this.drawBullets(ctx);

  }

  drawBullets(ctx) {
    for (let i = 0; i < this.bullets.length; i++) {
      var b = this.bullets[i];
      setTimeout(() => {
  		delete this.bullets[i];
  		}, 1000);

      if(b != undefined) {
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

  move(mousepos) {
    // 2) On dÃ©place la balle 
    /*let dx = this.x - mousepos.x;
    let dy = this.y - mousepos.y;
    this.angle = Math.atan2(dy, dx);*/

    /* if (distance(this.x, this.y, mousepos.x, mousepos.y) >= 10) {
         //ball.v = 0;
         this.x -= this.v * Math.cos(this.angle);
         this.y -= this.v * Math.sin(this.angle);
     }*/

     Vaisseau1.x -= incrementX * Math.cos(Vaisseau1.angle);
     Vaisseau1.y -= incrementX * Math.sin(Vaisseau1.angle);
     Vaisseau1.angle += incrementAngle;

     //console.log(incrementX);

    /*document.onkeydown = function () {
      switch (window.event.keyCode) {
        case 37://gauche
          Vaisseau1.angle -= 0.08;
          break;
        case 38:
        
          break;
        case 39://droite
          Vaisseau1.angle += 0.08;

          break;
        case 40://bas

          break;
      }
    };*/

  }

  addBullet(time) {
    // si le temps écoulé depuis le dernier tir est > temps max alors on tire
    var tempEcoule = 0;

    if (this.lastBulletTime !== undefined) {
      tempEcoule = time - this.lastBulletTime;
      //console.log("temps écoulé = " + tempEcoule);
    }

    if ((this.lastBulletTime === undefined) || (tempEcoule > this.delayMinBetweenBullets)) {
      this.bullets.push(new Bullet(this));
      // on mémorise le dernier temps.
      this.lastBulletTime = time;
    }
  }

  removeBullet(bullet) {
    let position = this.bullets.indexOf(bullet);
    this.bullets.splice(position, 1);
  }
}

class Bullet {
  constructor(Vaisseau) {
    this.x = Vaisseau.x;
    this.y = Vaisseau.y;
    this.angle = Vaisseau.angle;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillRect(-25, 0, 10, 2);
    ctx.restore();
  }


  move(maxX, maxY) {
    this.x -= 10 * Math.cos(this.angle);
    this.y -= 10 * Math.sin(this.angle);
  }
}

function init() {
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  window.addEventListener('keydown', handleKeydown, false);
  window.addEventListener('keyup', handleKeyup, false);
  requestAnimationFrame(anime60fps);

  // dernier param = temps min entre tirs consecutifs. Mettre à 0 pour cadence max
  // 500 = 2 tirs max par seconde, 100 = 10 tirs/seconde
  Vaisseau1 = new Vaisseau(100, 100, 0, 2, 1);

  canvas.addEventListener('mousemove', function (evt) {
    mousepos = getMousePos(canvas, evt);
  }, false);

  window.addEventListener('click', function (evt) {
    // on passe le temps en parametres, en millisecondes
    Vaisseau1.addBullet(Date.now());

    // NOTE : si tu n'utilises pas inputStates.MOUSEDOWN
    // ici, mais juste l'évébement click au lieu de mousedown
    // tu ne pourras pas tirer plus vite, il te faudra
    // marteler le bouton.
    // compare en gardant space appuyé avec la cadence de
    // tir à zero.
  });

  window.addEventListener('keydown', function (event) {
    if (window.event.keyCode == 32) {
      inputStates.SPACE = true;
    }

  });

  window.addEventListener('keyup', function (event) {


    if (window.event.keyCode == 32) {
      inputStates.SPACE = false;
    }


  });

  //anime();
}

var keysCheck = [];


function handleKeydown(evt) {
  keysCheck[evt.keyCode] = true;
  if (evt.keyCode === 38) {
    //up key 
    incrementX = 5;
  } else if (evt.keyCode === 40) {
    // down key
    incrementX = -2;
  }

  else if (evt.keyCode === 37 ) {  	
  	if (keysCheck[37] && keysCheck[39]){
 		incrementAngle = 0; 		
 	}
    // left key
    else
    	incrementAngle =  -0.08;
 } 


  else if (evt.keyCode === 39) {  	
  	 if (keysCheck[37] && keysCheck[39]){
 		incrementAngle = 0; 		
 	}
    // right key
    else
    incrementAngle = 0.08;
	console.log(incrementAngle);
 }
 }

function handleKeyup(evt) {
	keysCheck[evt.keyCode] = false;
  if (evt.keyCode === 38) {
    //up key 
    incrementX = 1;
  } else if (evt.keyCode === 40) {
    // down key
    incrementX = 0;
  }

  else if (evt.keyCode === 37 && keysCheck[39] == false) {
    //left key 
   incrementAngle = 0;   
 } else if (evt.keyCode === 39 && keysCheck[37] == false) {
    // right key
    incrementAngle = 0;    
 }  
}

function anime60fps() {

  // 1) On efface l'Ã©cran
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  // 2) On dessine et on déplace le Vaisseau 1
  Vaisseau1.draw(ctx);
  Vaisseau1.move(mousepos);

  if (inputStates.SPACE == true) {
    Vaisseau1.addBullet(Date.now());
  }

  // On demande une nouvelle frame d'animation
  window.requestAnimationFrame(anime60fps);

}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}


function getMousePos(canvas, evt) {
  // get canvas position
  var obj = canvas;
  var top = 0;
  var left = 0;
  while (obj && obj.tagName != 'BODY') {
    top += obj.offsetTop;
    left += obj.offsetLeft;
    obj = obj.offsetParent;
  }

  // return relative mouse position
  var mouseX = evt.clientX - left + window.pageXOffset;
  var mouseY = evt.clientY - top + window.pageYOffset;
  return {
    x: mouseX,
    y: mouseY
  };
}

function changeCadenceTir(value) {
  Vaisseau1.delayMinBetweenBullets = value;
}


