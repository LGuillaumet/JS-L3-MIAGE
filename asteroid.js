var canvas, ctx, width, height;
var Vaisseau1;
var lvl = 1;
var aliencheck = false;
var meteorecheck = false;
var mutestart = false;
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
var tempoION = 0;
var swmode = false;
var xsw = 0;
var menu = true;
var ion = false;
var clicked = false;
var shoot = new Howl({
    src: ['shoot.wav'],
    volume: 0.03
});
var explosion = new Howl({
    src: ['SoundEffect/explosion.wav'],
    volume: 0.3
});

var priseBonus = new Howl({
    src: ['SoundEffect/priseBonus.mp3'],
});

var tirAlien = new Howl({
    src: ['SoundEffect/tirAlien.mp3'],
    volume: 0.5
});

var gameoverSound = new Howl({
    src: ['SoundEffect/gameOver_music.wav']
});
var gameoverVoice = new Howl({
    src: ['SoundEffect/gameOver_voice.wav']
});

var backgroundMusic = new Howl({
    src: ['SoundEffect/space_harrier_music_main_theme.mp3']
});


var weow = new Howl({
    src: ['SoundEffect/weow.mp3'],
});

var xwingexplose = new Howl({
    src: ['SoundEffect/xwingexplose.mp3'],
});

var swstart = new Howl({
    src: ['SoundEffect/swstart.mp3'],
    volume: 0.7
});

var shrekwhat = new Howl({
    src: ['SoundEffect/shrekwhat.mp3'],
});

var start2 = new Howl({
    src: ['SoundEffect/start2.mp3'],
    volume: 0.5
});

var tieson = new Howl({
    src: ['SoundEffect/tieson.mp3'],
});

var swmusic1 = new Howl({
    src: ['SoundEffect/swmusic1.mp3'],
    volume: 0.8
});

var swmusic2 = new Howl({
    src: ['SoundEffect/swmusic2.mp3'],
    volume: 0.5
});

var swmusic3 = new Howl({
    src: ['SoundEffect/swmusic3.mp3'],
    volume: 0.7
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
    if (swmode == true) {
        document.getElementById("gauche").src="gaucheSW.png";
        document.getElementById("droite").src="droiteSW.png";
        document.getElementById("gauche").style.width = "24.7vw";
        document.getElementById("droite").style.width = "23vw"


        xsw = (Math.floor(Math.random() * 3));
        console.log(xsw);
        if (xsw == 0) {
            if(mutestart == false){
                swmusic1.play();
            }
        } else if (xsw == 1) {
            if(mutestart == false){
                swmusic2.play();
            }
        } else {
            if(mutestart == false){
                swmusic3.play();
            }
        }
    } else {
        if(mutestart == false){
            backgroundMusic.play();
        }
    }



    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    menu = false;



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
    Vaisseau1 = new Vaisseau(600, 400, 0, 2, 300, 3);

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
    invincible = true;
    setTimeout(() => {
    invincible = false;
    }, 1200);
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
        else {
            if (ion == true) {
                incrementAngle = 0.08;
            } else {
                incrementAngle = -0.08;
            }
        }
        startDoubleExplosion(Vaisseau1.x, Vaisseau1.y, Vaisseau1.angle);
        //console.log(incrementAngle);
    } else if (evt.keyCode === 39) {
        if (keysCheck[37] && keysCheck[39]) {
            incrementAngle = 0;
        }
        // right key
        else {
            if (ion == true) {
                incrementAngle = -0.08;
            } else {
                incrementAngle = 0.08;
            }
        }
        startDoubleExplosion(Vaisseau1.x, Vaisseau1.y, Vaisseau1.angle);
        //console.log(incrementAngle);
    }
}
var slowcheck=false;
var maxslow;
var boostcheck;
var maxboostcheck;
function slow() {
     slowcheck =true;

    if (incrementX > 0) {
        //console.log(Vaisseau1.getAngle());
        Vaisseau1.setAngle(Vaisseau1.getAngle())
        //console.log(incrementX);
        incrementX -= 0.5;
        setTimeout(slow, 100);
    } else {
        slowcheck =false;
        maxslow= true;
        incrementX = 0;
    }
}


function boost() {
    boostcheck = true;
    if (incrementX < 4 && slowcheck ==false) {
        //console.log(incrementX);
        incrementX += 1 * 1.5;
        setTimeout(boost, 100);
    } else if(maxslow == true) {
        maxboostcheck = true;
        incrementX = 5;
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
    //console.log(ion);

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



    for (var i = 0; i < AlienArray.length; i++) {
        tempo++;
        tempoION++;
        var aliens = AlienArray[i];
        aliens.move();
        aliens.draw();

        if (gameover == false) {
            if (tempo >= 100) {
                if (aliens.id == 0) {
                    aliens.addBulletA();
                    tempo = 0;
                if (swmode == true) {
                    tirAlien.play();
                }
                else {
                    shoot.play();
                    }
                }
            }
            if (tempoION >= 50){
                if (aliens.id == 1) {
                    aliens.addBulletA2();
                    tempoION = 0;
                    if (swmode == true) {
                        tirAlien.play();
                    } 
                    else {
                        shoot.play();
                    }
                }
            }
        }
    

        collisionTestBulletAVaisseau(aliens.bulletsA, Vaisseau1);

        collisionTestBulletAlien(aliens, Vaisseau1.bullets);

        collisionTestAlienVaisseau(aliens, Vaisseau1);

        // tempo est le temps entre chaque tir de l'alien

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
    if (gameover == false) {
        drawsurchaud(ctx);
    }
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
    if (menu == false) {
        if (swmode == true) {
            if (xsw == 0) {
                swmusic1.pause();
                backgroundMusic.pause();
            } else if (xsw == 1) {
                swmusic2.pause();
                backgroundMusic.pause();
            } else {
                swmusic3.pause();
                backgroundMusic.pause();
            }
        } else {
            backgroundMusic.pause();
            swmusic3.pause();
            swmusic2.pause();
            swmusic1.pause();
        }
    }
    mutestart = true;
    explosion.mute(true);
    gameoverSound.mute(true);
    gameoverVoice.mute(true);
    shoot.mute(true);
    priseBonus.mute(true);
    tirAlien.mute(true);
    xwingexplose.mute(true);
    weow.mute(true);
    swstart.mute(true);
    shrekwhat.mute(true);
    start2.mute(true);
    tieson.mute(true);
}

function setvolume() {
    if (menu == false) {
        if (swmode == true) {
            if (xsw == 0) {
                swmusic1.play();
            } else if (xsw == 1) {
                swmusic2.play();
            } else {
                swmusic3.play();
            }
        } else {
            backgroundMusic.play();
        }
    }
    explosion.mute(false);
    gameoverSound.mute(false);
    gameoverVoice.mute(false);
    shoot.mute(false);
    priseBonus.mute(false);
    tirAlien.mute(false);
    xwingexplose.mute(false);
    weow.mute(false);
    swstart.mute(false);
    shrekwhat.mute(false);
    start2.mute(false);
    tieson.mute(false);
}

function setModeT() {
    if (swmode == false) {
        start2.stop();
        swstart.play();
    }
    swmode = true;
    clicked = true;
}

function setModeF() {
    if (swmode == true) {
        swstart.stop();
        start2.play();
    }
    if (clicked == false) {
        start2.play();
        clicked = true;
    }
    swmode = false;
}


function niveauSuivant() {

    if (meteorecheck == true && aliencheck == true) {
        lvl += 1;
        NbAst = NbAst + 1;
        /* Niveau petit metores --------------------------------*/
        if (lvl == 3) {
            if (swmode == true) {
                document.getElementById("myCanvas").style.backgroundImage = "url('tatoine.jpg')";
                tieson.play();
                setTimeout(function () {
                    tieson.play();
                }, 1000);
                setTimeout(function () {
                    tieson.play();
                }, 2000);
            }
            for (var i = 0; i < 10; i++) {

                // Create a meteore with random position and speed
                var meteore = new Meteore((Math.random() * 1200),
                    (Math.random() * 800),
                    (2 * Math.random()) - 1,
                    (2 * Math.random()) - 1,
                    3); // radius, change if ou like.
                // Add it to the array
                AstArray[i] = meteore;
            }
            cunrrentNB = 5;
        }
        /* FIN Niveau petit metores --------------------------------*/
        else if (lvl == 4) {
            NBAlien = 1;
            currentNBAlien = NBAlien;
            createAlien(NBAlien);
            cunrrentNB = 0;
            if (swmode == true) {
                document.getElementById("myCanvas").style.backgroundImage = "url('backgroundsw.jpg')";
            }
        } else if (lvl == 2) {
            NBAlien = 1;
            cunrrentNB = NbAst;
            createMeteore(NbAst);
            currentNBAlien = NBAlien;
            createAlienION(NBAlien);
            if (swmode == true) {
                document.getElementById("myCanvas").style.backgroundImage = "url('swWP.png')";
            }
        } else {
            createMeteore(NbAst);
            cunrrentNB = NbAst;
        }

    } else return 0;
}