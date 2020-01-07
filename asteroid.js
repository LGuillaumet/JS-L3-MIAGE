var canvas, ctx, width, height;
var Vaisseau1;
var lvl = 1;
var lvlcheck = false;
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
var invincible = false;
var surchauffage = false;
var surchauffe = 0;
var tempo = 0;
var shoot = new Howl({
    src: ['shoot.wav'],
    volume: 0.10
});
var explosion = new Howl({
    src: ['SoundEffect/explosion.wav'],
    volume: 0.5
});

var gameoverSound = new Howl({
    src: ['SoundEffect/gameOver_music.wav']
});
var gameoverVoice = new Howl({
    src: ['SoundEffect/gameOver_voice.wav']
});
var backgroundMusic = new Audio('SoundEffect/space_harrier_music_main_theme.mp3');




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
    Vaisseau1 = new Vaisseau(600, 400, 0, 2, 200, 3);

    canvas.addEventListener('mousemove', function (evt) {
        mousepos = getMousePos(canvas, evt);
    }, false);

    //window.addEventListener('click', function(evt) {
    // on passe le temps en parametres, en millisecondes
    //Vaisseau1.addBullet(Date.now());

    // NOTE : si tu n'utilises pas inputStates.MOUSEDOWN
    // ici, mais juste l'évébement click au lieu de mousedown
    // tu ne pourras pas tirer plus vite, il te faudra
    // marteler le bouton.
    // compare en gardant space appuyé avec la cadence de
    // tir à zero.
    //  });

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

    //on draw le background
    sf.draw();


    // 2) On dessine et on déplace le Vaisseau 1
    Vaisseau1.draw(ctx);
    Vaisseau1.move(mousepos);

    if (inputStates.SPACE == true) {
        if (surchauffage == false) {
            if (surchauffe < 200) {
                Vaisseau1.addBullet(Date.now());
                surchauffe = surchauffe + 2;
                shoot.play();
            }
            //console.log('Shoooooot');
        }

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


        collisionTestVaisseauBonus(Vaisseau1, BonusArray);

        // 3) On dessine les meteores
        meteores.draw();





    }
    tempo++;

    for (var i = 0; i < AlienArray.length; i++) {
        var aliens = AlienArray[i];
        aliens.move();
        aliens.draw();

        //collisionTestAlienVaisseau():

        //collisionTestBulletAVaisseau();

        collisionTestBulletAlien(aliens, Vaisseau1.bullets);
        collisionTestAlienVaisseau(aliens, Vaisseau1);

        // tempo est le temps entre chaque tir de l'alien
        if (gameover == false) {
            if (tempo == 100) {
                aliens.addBulletA();
                tempo = 0;
            }
        }
    }

    // number of ms since last frame draw
    delta = timer(time);

    // Move and draw particles
    updateAndDrawParticules(delta);

    // On demande une nouvelle frame d'animation
    window.requestAnimationFrame(anime60fps);
    if (surchauffe > 0) {
        surchauffe = surchauffe - 1;
    }
    surchaud();
    drawsurchaud(ctx);
    //console.log(surchauffe);


    
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

function surchaud() {
    if (surchauffe >= 200) {
        //console.log(surchauffage);
        surchauffage = true;
        setTimeout(() => {
            surchauffage = false;
        }, 3350);
    }
}

function drawsurchaud(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "grey";
    ctx.fillRect(20, 750, 200, 10);
    ctx.stroke();
    ctx.beginPath();
    if (surchauffage == true) {
        ctx.fillStyle = "red";
        //console.log("test");
    } else {
        if (surchauffe > 150) {
            ctx.fillStyle = 'orange';
        } else {
            ctx.fillStyle = '#00FF00';
        }
    }
    ctx.fillRect(20, 750, surchauffe, 10);
    ctx.stroke();
    ctx.restore();
}

function setvolume0() {
    backgroundMusic.pause();
    explosion.mute(true);
    gameoverSound.mute(true);
    gameoverVoice.mute(true);
    shoot.mute(true);
}

function setvolume() {
    backgroundMusic.play();
    explosion.mute(false);
    gameoverSound.mute(false);
    gameoverVoice.mute(false);
    shoot.mute(false);


}