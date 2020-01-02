var canvas, ctx, width, height;
var Vaisseau1;
var gameover = false;
var pos = {
    x: 0,
    y: 0
};
var inputStates = {};
var incrementX = 0;
var incrementAngle = 0;
var score = 0;
var BonusArray = [];
var bouclier = false;
var invincible = false;
var shoot;
var  playSpace = false;

var backgroundMusic = new Howl({
    src: ['SoundEffect/space_harrier_music_main_theme.mp3'],
    volume: 0.8
});
var shoot = new Howl({
    src: ['SoundEffect/shootArcade.wav'],
    volume: 0.5

});


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
    
  backgroundMusic.play();



    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;


    ctx.beginPath();


    ctx.font = '40pt Kremlin Pro Web';
    ctx.fillStyle = '#000000';




    for (i = 0; i < NbAst; i++) {
        tab.push(Math.trunc(Math.random() * 10));
        //console.log(tab[i]);
    }


    window.addEventListener('keydown', handleKeydown, false);
    window.addEventListener('keyup', handleKeyup, false);
    requestAnimationFrame(anime60fps);

    // dernier param = temps min entre tirs consecutifs. Mettre à 0 pour cadence max
    // 500 = 2 tirs max par seconde, 100 = 10 tirs/seconde
    
    Vaisseau1 = new Vaisseau(600, 400, 0, 2, 200, 3,this.clavier);

    canvas.addEventListener('mousemove', function(evt) {
        pos = getMousePos(canvas, evt);
    }, false);

    window.addEventListener('click', function(evt) {
        // on passe le temps en parametres, en millisecondes
        Vaisseau1.addBullet(Date.now());

        // NOTE : si tu n'utilises pas inputStates.MOUSEDOWN
        // ici, mais juste l'évébement click au lieu de mousedown
        // tu ne pourras pas tirer plus vite, il te faudra
        // marteler le bouton.
        // compare en gardant space appuyé avec la cadence de
        // tir à zero.
    });

    var map = {}; 
    onkeydown = onkeyup = function(e){
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == 'keydown';
        /* insert conditional here */
        if(map[32] || map[32] && map[e.keyCode] ){
            inputStates.SPACE = true;

            if(playSpace == true) return;
            
            playSpace = true;
            shoot.play();
            shoot.once('end', () => {
                playSpace = false;
            });
        }
    }
    
    
    
    /*window.addEventListener('keydown', function(event) {
        if (window.event.keyCode == 32) {

            inputStates.SPACE = true;

            if(playSpace == true) return;
            
            playSpace = true;
            shoot.play();
            shoot.once('end', () => {
                playSpace = false;
            });
            
        }

    });*/

    window.addEventListener('keyup', function(event) {

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
        startDoubleExplosion(Vaisseau1.x, Vaisseau1.y, Vaisseau1.angle);


    } else if (evt.keyCode === 37) {
        if (keysCheck[37] && keysCheck[39]) {
            incrementAngle = 0;
        }
        // left key
        else
            incrementAngle = -0.08;
        startDoubleExplosion(Vaisseau1.x, Vaisseau1.y, Vaisseau1.angle);
        //console.log(incrementAngle);
    } else if (evt.keyCode === 39) {
        if (keysCheck[37] && keysCheck[39]) {
            incrementAngle = 0;
        }
        // right key
        else
            incrementAngle = 0.08;
        startDoubleExplosion(Vaisseau1.x, Vaisseau1.y, Vaisseau1.angle);
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
        var boostcheck = true;
        //console.log(incrementX);
        incrementX += 1 * 2;

        setTimeout(boost, 200);
    } else {
        boostcheck = false;
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

function anime60fps(time) {
    // Get current direction ship is facing
    let radians = Vaisseau1.angle / Math.PI * 180;
    // 1) On efface l'Ã©cran
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // 2) On dessine et on déplace le Vaisseau 1
    Vaisseau1.draw(ctx);
    Vaisseau1.move(pos);

    if (inputStates.SPACE == true) {
      
        Vaisseau1.addBullet(Date.now());
      
        //console.log('Shoooooot');

    }

    // Pour chanque meteore

    for (var i = 0; i < AstArray.length; i++) {
        var meteores = AstArray[i];

        // 1) Oapn bouge les meteores
        meteores.move();

        // 2) collision test with walls
        collisionTestWithWalls(meteores);

        // collision test with bullets
        collisionTestAsteroidBullets(meteores, Vaisseau1.bullets);
        //collision tets  asteroid et vaisseau


        collisionTestAsteroidVaisseau(meteores, Vaisseau1);



        collisionTestAsteroidVaisseau(meteores, Vaisseau1);



        collisionTestVaisseauBonus(Vaisseau1, BonusArray);

        // 3) On dessine les meteores
        meteores.draw();




    }


    // number of ms since last frame draw
    delta = timer(time);

    // Move and draw particles
    updateAndDrawParticules(delta);

    // On demande une nouvelle frame d'animation
    window.requestAnimationFrame(anime60fps);

}

function supprimerBonus(bonus) {
    let posi = BonusArray.indexOf(bonus);
    BonusArray.splice(posi, 1);
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

/*
var starfield = (function() {
    // Variables - a quantity which during a calculation is assumed to vary or be capable of varying in value
    var stars = [],
        star_density = 25,
        velocity = {x:0, y: 0},
        star_colors = ["rgba(0,0,0,.5)", "#ffe9c4", "#d4fbff"],
        stars_bg = "rgba(0,0,0,.5)",
        frame,
        star_canvas,
        star_context,
        ctx.width,
        ctx.height; 
  
    function starGo() {

         
      // Draw all the stars, I decided stars come in units of 10 
      for (var i = 0; i < (star_density*10); i++) {
        var rad = Math.random() * 2;
        create_star(rad);
        // twice as many small stars as big
        var rad = Math.random();
        create_star(rad);
        create_star(rad);
      }
     
     
      
      // When you press keys stuff happens 
      document.addEventListener('keydown', function(e) {
        e = e || window.event;
        // We add to the existing velocity, this dampens the speed changes and makes changing directions more gradual just like flying a real spaceship... I imagine
        if (e.keyCode == 39) {
          velocity = {
            x: velocity.x -5, 
            y: velocity.y
          };
        }
        if (e.keyCode == 37) {
          velocity = {
            x: velocity.x +5, 
            y: velocity.y
          };
        }
        if (e.keyCode == 40) {
          velocity = {
            x: velocity.x, 
            y: velocity.y -5
          };
        }
        if (e.keyCode == 38) {
          velocity = {
            x: velocity.x,
            y: velocity.y +5
          };
        }
      }, false);
      

  
 
  
      function draw_star() {
        var s = stars.length;
        // for every star
        while(s--) {
          var star = stars[s];
          // update individual stars position
          star.update();
          // render the star to the canvas
          star.render(star_context);
        }
      }
  
  
      function create_star(rad) {
        // I don't really need a function for create_star, but reads better and easy to expand upon
        stars.push(new star(rad));
      }
  
    
    }
  
   
  
  
    var star = function(rad) {
      
      this.alpha    = Math.round((Math.random() * 100 - 70) + 70); // Random brightness
      this.radius = rad || Math.random() * 2; // Radius
      this.color    = star_colors[Math.round(Math.random() * star_colors.length)]; // Random color from array
  
      this.pos = {
        // Initial random position
        x: Math.random() * ctx.width,
        y: Math.random() * ctx.height
      };
  
  
    };
  
    star.prototype = {
  
      update: function() {
  
        // Depending on the radius the star will move at a differnt speed (slower where a greater perception of depth) 
        // Yes! 3 is a magic number :)
        this.pos.y += velocity.y === 0 ? velocity.y : (velocity.y / (3 - this.radius));
        this.pos.x += velocity.x === 0 ? velocity.x : (velocity.x / (3 - this.radius));
        
        // Keep the stars on the canvas
        if(this.pos.y > ctx.height){
          this.pos.y = 0;        
        } else if(this.pos.y < 0){
          this.pos.y = ctx.height;
        }
        // Keep the stars on the canvas in a different direction
        if(this.pos.x > ctx.width){
          this.pos.x = 0;        
        } else if(this.pos.x < 0){
          this.pos.x = ctx.width;        
        }
        // Dampen the velocity, ie slow down when you stop telling it to move
        velocity.x = velocity.x /1.00005;
        velocity.y = velocity.y /1.00005;
      },
  
      render: function(ctx) {
        // Draw the star at its current position
        var x = Math.round(this.pos.x),
            y = Math.round(this.pos.y);
  
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = this.alpha;      
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
  
    };
    
    return {
      // Always kick things off with a really cool function name!
      lets_roll: initialize
    };
    
  })();
  
  starfield.lets_roll();*/