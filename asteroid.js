var canvas, ctx, width, height;
var Vaisseau1;
var gameover = false;
var mousepos = {
  x: 0,
  y: 0
};
var inputStates = {};
var incrementX = 0;
var incrementAngle = 0;
var score = 0;
var BonusArray = [];
var bouclier = false;
var shoot = new Howl({
  src: ['Gun4.wav']
});



window.onload = init;

class Vaisseau {
  constructor(x, y, angle, vitesse, tempsMinEntreTirsEnMillisecondes, vie) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.v = vitesse;
    this.bullets = [];
    this.vie = vie;
    // cadenceTir en millisecondes = temps min entre tirs
    this.delayMinBetweenBullets = tempsMinEntreTirsEnMillisecondes;
    this.boundingBox = {
      x: this.x,
      y: this.y,
      width: 50,
      height: 50
    }
  }

  drawBoundingBox(ctx) {
    ctx.save();
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
    ctx.restore();
  }

  drawBouclier(ctx) {
    ctx.save();
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }

  draw(ctx) {
    if (gameover == true) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      for (var i = AstArray.length - 1; i > 0; i--) {
        var v = AstArray[i];
        for (var j = 1; j < arguments.length; j++) {
          if (v == arguments[j]) {
            AstArray.splice(i, 1);
          }
        }
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '48px serif';
      ctx.textAlign = 'center';
      ctx.fillText("GAMEOVER", (canvas.width / 2), (canvas.height / 2));
      ctx.restore
    }

    if (gameover != true) {
      if (BonusArray.length != 0) {
        BonusArray.forEach(e => {
          e.draw();
        })
      }
      ctx.save();
      ctx.fillText("Vie: " + Vaisseau1.vie, 10, 50);
      ctx.fillText("Score: " + score, 10, 100);
      this.drawBoundingBox(ctx);
      if (bouclier == true) {
        this.drawBouclier(ctx);
        console.log("apparitionBouclier");
      }
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

  }

  drawBullets(ctx) {
    for (let i = 0; i < this.bullets.length; i++) {
      var b = this.bullets[i];
      setTimeout(() => {
        delete this.bullets[i];
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

  move() {


    this.x -= incrementX * Math.cos(this.angle);
    this.y -= incrementX * Math.sin(this.angle);
    this.angle += incrementAngle;

    this.boundingBox.x = this.x - 25;
    this.boundingBox.y = this.y - 25;

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

  getAngle() {
    return this.angle;
  }

  setAngle(value) {
    return this.angle = value;
  }
}

class Bullet {
  constructor(Vaisseau) {
    this.x = Vaisseau.x;
    this.y = Vaisseau.y;
    this.angle = Vaisseau.angle;
    this.boundingBox = {
      x: this.x,
      y: this.y,
      width: 10,
      height: 2
    }
  }

  drawBoundingBox(ctx) {
    ctx.save();
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
    ctx.restore();
  }
  draw(ctx) {
    this.drawBoundingBox(ctx);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillRect(-25, 0, 10, 2);
    ctx.restore();
  }


  move() {
    this.x -= 10 * Math.cos(this.angle);
    this.y -= 10 * Math.sin(this.angle);

    this.boundingBox.x = this.x;
    this.boundingBox.y = this.y;
  }
}

//Function to get the mouse position
function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect) {
  return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}
//The rectangle should have x,y,width,height properties


function init() {
  var backgroundMusic = new Audio('SoundEffect/space_harrier_music_main_theme.mp3');
  var promise = backgroundMusic.play();

  if (promise !== undefined) {
    promise.then(_ => {
      // Autoplay started!
    }).catch(error => {
      // Autoplay was prevented.
      // Show a "Play" button so that user can start playback.
    });
  }



  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;


  ctx.beginPath();
  ctx.rect(250, 350, 200, 100);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillStyle = 'rgba(225,225,225,0.5)';
  ctx.fillRect(25, 72, 32, 32);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000000';
  ctx.stroke();
  ctx.closePath();
  ctx.font = '40pt Kremlin Pro Web';
  ctx.fillStyle = '#000000';
  ctx.fillText('Start', 345, 415);



  for (i = 0; i < NbAst; i++) {
    tab.push(Math.trunc(Math.random() * 10));
    //console.log(tab[i]);
  }


  window.addEventListener('keydown', handleKeydown, false);
  window.addEventListener('keyup', handleKeyup, false);
  requestAnimationFrame(anime60fps);

  // dernier param = temps min entre tirs consecutifs. Mettre à 0 pour cadence max
  // 500 = 2 tirs max par seconde, 100 = 10 tirs/seconde
  Vaisseau1 = new Vaisseau(600, 400, 0, 2, 200, 3);

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
    boost();
  } else if (evt.keyCode === 37) {
    if (keysCheck[37] && keysCheck[39]) {
      incrementAngle = 0;
    }
    // left key
    else
      incrementAngle = -0.08;
    //console.log(incrementAngle);
  } else if (evt.keyCode === 39) {
    if (keysCheck[37] && keysCheck[39]) {
      incrementAngle = 0;
    }
    // right key
    else
      incrementAngle = 0.08;
    //console.log(incrementAngle);
  }
}

function slow() {
  if (incrementX > 0) {
    //console.log(Vaisseau1.getAngle());
    Vaisseau1.setAngle(Vaisseau1.getAngle())
    //console.log(incrementX);
    incrementX -= 0.5;
    setTimeout(slow, 150);
  } else {
    incrementX = 0;
  }
}


function boost() {
  if (incrementX < 5) {
    //console.log(incrementX);
    incrementX += 1 * 2;
    setTimeout(boost, 200);
  } else {
    incrementX = 6;
  }
}


function handleKeyup(evt) {
  keysCheck[evt.keyCode] = false;
  if (evt.keyCode === 38) {
    //up key 

    slow();
  } else if (evt.keyCode === 37 && keysCheck[39] == false || evt.keyCode === 37) {
    //left key 
    incrementAngle = 0;
  } else if (evt.keyCode === 39 && keysCheck[37] == false || evt.keyCode === 39) {
    // right key
    incrementAngle = 0;
  }
}

function anime60fps() {
  // Get current direction ship is facing
  let radians = Vaisseau1.angle / Math.PI * 180;
  // 1) On efface l'Ã©cran
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  // 2) On dessine et on déplace le Vaisseau 1
  Vaisseau1.draw(ctx);
  Vaisseau1.move(mousepos);

  if (inputStates.SPACE == true) {
    Vaisseau1.addBullet(Date.now());
    shoot.play();
    //console.log('Shoooooot');

  }

  // Pour chanque meteore

  for (var i = 0; i < AstArray.length; i++) {
    var meteores = AstArray[i];

    // 1) On bouge les meteores
    meteores.move();

    // 2) collision test with walls
    collisionTestWithWalls(meteores);

    // collision test with bullets
    collisionTestAsteroidBullets(meteores, Vaisseau1.bullets);
    //collision tets  asteroid et vaisseau
    collisionTestAsteroidVaisseau(meteores, Vaisseau1);

    collisionTestVaisseauBonus(Vaisseau1, BonusArray);

    // 3) On dessine les meteores
    meteores.draw();

  }

  // On demande une nouvelle frame d'animation
  window.requestAnimationFrame(anime60fps);

}

function supprimerAsteroid(a) {
  let pos = AstArray.indexOf(a);
  AstArray.splice(pos, 1);
}

// Test for collision between an object and a point
function rectangleCollide(targetA, targetB) {
  return !(targetB.x > (targetA.x + targetA.width) ||
    (targetB.x + targetB.width) < targetA.x ||
    targetB.y > (targetA.x + targetA.height) ||
    (targetB.y + targetB.height) < targetA.y);
}

function collisionTestAsteroidVaisseau(asteroid, Vaisseau1) {

  AstArray.forEach((a, index) => {
    if (rectangleCollide(a.boundingBox, Vaisseau1.boundingBox)) {
      if (bouclier == false) {
        console.log(a.boundingBox)
        console.log(Vaisseau1.boundingBox)
        console.log(Vaisseau1.vie)
        for (var i = 0; i < AstArray.length; i++) {
          // Create a meteore with random position and speed
          var meteore = new Meteore(a.x,
            a.y,
            (2 * Math.random()) - 1,
            (2 * Math.random()) - 1,
            1); // radius, change if ou like.
          AstArray[i] = meteore;
        }
        for (var i = 0; i < AstArray.length; i++) {
          // Create a meteore with random position and speed
          var meteore = new Meteore(a.x,
            a.y,
            (2 * Math.random()) - 1,
            (2 * Math.random()) - 1,
            2); // radius, change if ou like.
          AstArray[i] = meteore;
        }
        supprimerAsteroid(a);

        Vaisseau1.vie--;
        incrementX = 0;
        Vaisseau1.x = 600;
        Vaisseau1.y = 400;
        score = score + 100;
        if (Vaisseau1.vie == 0) {
          //fin du jeu 
          gameover = true; /*-------------------------------------------POUR AFFICHER LE GAME OVER--------------*/
        }
        if (Math.floor((Math.random() * 5)) == 0) {
          //une chance sur 5 d'avoir un bonus 
          BonusArray.push(new Bonus1(asteroid.x, asteroid.y, (Math.floor(Math.random() * 3))));
        }
        //var position = BonusArray.length + 1;
        //BonusArray[position] = bonus;
        //console.log("BONUS");

      } else {
        bouclier = false;
        supprimerAsteroid(a);
        console.log(bouclier);
      }
      //console.log("COLLISION V/A")
    }
  })
}

function collisionTestAsteroidBullets(asteroid, bulletsArray) {
  // on teste si l'asteroide courante est en collision avec une balle
  bulletsArray.forEach((b, index) => {
    if (rectangleCollide(asteroid.boundingBox, b.boundingBox)) {
      // il y a collision

      // On casse l'asteroide, on change les vitesses de rotation des
      // morceaux résultants (2, 3 ou 4)
      //asteroid.casse();

      supprimerAsteroid(asteroid);

      //PREMIERE DIVISION ------------------------------------------------------------------------------------------
      if (asteroid.id == 0) {
        AstArray.push(new Meteore(asteroid.x,
          asteroid.y,
          (2 * Math.random()) - 1,
          (2 * Math.random()) - 1,
          asteroid.id + 1));


        // Create a meteore with random position and speed
        AstArray.push(new Meteore(asteroid.x,
          asteroid.y,
          (2 * Math.random()) - 1,
          (2 * Math.random()) - 1,
          asteroid.id + 2));

      }


      //Deuxieme DIVISION ------------------------------------------------------------------------------------------
      if (asteroid.id == 1) {

        // Create a meteore with random position and speed
        AstArray.push(new Meteore(asteroid.x,
          asteroid.y,
          (2 * Math.random()) - 1,
          (2 * Math.random()) - 1,
          asteroid.id + 2));

      }

      //Deuxieme DIVISION ------------------------------------------------------------------------------------------
      if (asteroid.id == 2) {
        AstArray.push(new Meteore(asteroid.x,
          asteroid.y,
          (2 * Math.random()) - 1,
          (2 * Math.random()) - 1,
          asteroid.id + 1));

      }

      console.log("COLLISION B/A")
      score = score + 100;
      // On supprime la balle de la liste
      Vaisseau1.removeBullet(b);
      if (Math.floor((Math.random() * 1)) == 0) {
        //une chance sur 5 d'avoir un bonus
        BonusArray.push(new Bonus1(asteroid.x, asteroid.y, (Math.floor(Math.random() * 3))));
        //var position = BonusArray.length + 1;
        //BonusArray[position] = bonus;
        //console.log("BONUS");
      }
      // break; // on sort de la boucle, il ne peut y avoir de collision avec plusieurs balles en meme temps
    }
  })
}

function supprimerBonus(bonus) {
  let posi = BonusArray.indexOf(bonus);
  BonusArray.splice(posi, 1);
}

function collisionTestVaisseauBonus(Vaisseau1, BonusArray) {

  for (let NbBonus = 0; NbBonus < BonusArray.length; NbBonus++) {
    bonus = BonusArray[NbBonus];
    //BonusArray.forEach((bonus , index) =>{
    if (rectangleCollide(Vaisseau1.boundingBox, bonus.boundingBox)) {
      //if(bonus.id == 0){
      console.log(bonus.id);
      if (bonus.id == 0) {
        changeCadenceTir(25);
      } else if (bonus.id == 1) {
        bouclier = true;
        console.log(bouclier);
        //draw bouclier a faire 
      } else if (bonus.id == 2) {
        changeCadenceTir(25); // A changer
      }
      supprimerBonus(bonus);


      //}
    }
  }
  //})
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
  Vaisseau1.delayMinBetweenBullets -= value;
}

function getGameOver() {
  return gameover;
}