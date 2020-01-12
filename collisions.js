// Test for collision between an object and a point
function rectangleCollide(targetA, targetB) {
    return rectsOverlap(targetA.x, targetA.y, targetA.width, targetA.height, targetB.x, targetB.y, targetB.width, targetB.height);
}

function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {

    if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
        return false; // No horizontal axis projection overlap
    if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
        return false; // No vertical axis projection overlap
    return true; // If previous tests failed, then both axis projections
    // overlap and the rectangles intersect
}

function randomBonus() {
    //console.log('salut');
    // Pour changer la chance d'apparition d'un bonus, changer le 22 par un multiple de 3 + 1 //
    var x = (Math.floor(Math.random() * 22));
    if (x <= 6) {
        numero = 0;
    }
    if (x >= 7 && x <= 13) {
        numero = 1;
    }
    if (x >= 14 && x <= 20) {
        numero = 2;
    }
    if (x == 21) {
        numero = 3;
    }
    //console.log(x);
    //console.log(numero);
}


function collisionTestVaisseauBonus(Vaisseau1, BonusArray) {

    for (let NbBonus = 0; NbBonus < BonusArray.length; NbBonus++) {
        bonus = BonusArray[NbBonus];
        //BonusArray.forEach((bonus , index) =>{
        if (rectangleCollide(Vaisseau1.boundingBox, bonus.boundingBox)) {
            if (bonus.id == 3) {
                shrekwhat.play();
            }
            else{
                priseBonus.play();
            }
            //if(bonus.id == 0){
            //console.log(bonus.id);

            if (bonus.id == 0) {
                if (gameover == false) {
                    score = score + 300;
                }
            } else if (bonus.id == 1) {
                bouclier = true;
            } else if (bonus.id == 2) {
                if(Vaisseau1.delayMinBetweenBullets>75){
                    changeCadenceTir(25); // A changer
                }
                else{
                    score = score + 200;
                }
            } else if (bonus.id == 3) {
                if (gameover == false) {
                    score = score + 1243;
                }
            }
            supprimerBonus(bonus);
            //}
        }
    }
    //})
}


function collisionTestAsteroidBullets(asteroid, bulletsArray) {
    // on teste si l'asteroide courante est en collision avec une balle
    bulletsArray.forEach((b, index) => {
        if (rectangleCollide(asteroid.boundingBox, b.boundingBox)) {
            // il y a collision
            // On casse l'asteroide, on change les vitesses de rotation des
            // morceaux résultants (2, 3 ou 4)
            //asteroid.casse();
            ctx.save();
         
            ctx.restore();
            supprimerAsteroid(asteroid);
            explosion.play();

            //PREMIERE DIVISION ------------------------------------------------------------------------------------------
            if (asteroid.id == 0) {
                if(swmode== true){
                createBasicExplosion(asteroid.x,asteroid.y,"#DC143C"); 
                }
                else if(swmode == false) {
                createBasicExplosion(asteroid.x,asteroid.y,"#008000");
                }
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
                //createBasicExplosion(asteroid.x,asteroid.y,"#FF0000");
                if(swmode== true){
                    createBasicExplosion(asteroid.x,asteroid.y,"#DC143C"); 
                    }
                    else if(swmode == false) {
                    createBasicExplosion(asteroid.x,asteroid.y,"#FF0000");
                    }
                // Create a meteore with random position and speed
                AstArray.push(new Meteore(asteroid.x,
                    asteroid.y,
                    (2 * Math.random()) - 1,
                    (2 * Math.random()) - 1,
                    asteroid.id + 2));
            }
            //Deuxieme DIVISION ------------------------------------------------------------------------------------------
            if (asteroid.id == 2) {
                //createBasicExplosion(asteroid.x,asteroid.y,"#0080ff");
                if(swmode== true){
                    createBasicExplosion(asteroid.x,asteroid.y,"#DC143C"); 
                    }
                    else if(swmode == false) {
                    createBasicExplosion(asteroid.x,asteroid.y,"#0080ff");
                    }
                AstArray.push(new Meteore(asteroid.x,
                    asteroid.y,
                    (2 * Math.random()) - 1,
                    (2 * Math.random()) - 1,
                    asteroid.id + 1));
            }
            if (asteroid.id ==3){
                if(swmode== true){
                    createBasicExplosion(asteroid.x,asteroid.y,"#DC143C"); 
                    }
                    else if(swmode == false) {
                    createBasicExplosion(asteroid.x,asteroid.y,"#FFA500");
                    }
                //createBasicExplosion(asteroid.x,asteroid.y,"#FFA500");

            }
            //console.log("COLLISION B/A")
            if (gameover == false) {
                score = score + 100;
            }
            // On supprime la balle de la liste
            Vaisseau1.removeBullet(b);
            if (Math.floor((Math.random() * 5)) == 0) {
                //une chance sur 5 d'avoir un bonus
                randomBonus();
                BonusArray.push(new Bonus1(asteroid.x, asteroid.y, numero));
                //var position = BonusArray.length + 1;
                //BonusArray[position] = bonus;
                //console.log("BONUS");
            }
            // break; // on sort de la boucle, il ne peut y avoir de collision avec plusieurs balles en meme temps
        }
    })
}

function collisionTestAsteroidVaisseau(asteroid, Vaisseau1) {

    if (rectangleCollide(asteroid.boundingBox, Vaisseau1.boundingBox)) {
        if (invincible == false) {
            invincible = true;
            setTimeout(() => {
                invincible = false;
            }, 1000);

            supprimerAsteroid(asteroid);
            explosion.play();



            if (asteroid.id == 0) {
                AstArray.push(new Meteore(asteroid.x,
                    asteroid.y,
                    (2 * Math.random()) - 1,
                    (2 * Math.random()) - 1,
                    1));


                // Create a meteore with random position and speed
                AstArray.push(new Meteore(asteroid.x,
                    asteroid.y,
                    (2 * Math.random()) - 1,
                    (2 * Math.random()) - 1,
                    2));

            }


            //Deuxieme DIVISION ------------------------------------------------------------------------------------------
            if (asteroid.id == 1) {

                // Create a meteore with random position and speed
                AstArray.push(new Meteore(asteroid.x,
                    asteroid.y,
                    (2 * Math.random()) - 1,
                    (2 * Math.random()) - 1,
                    3));

            }

            //Deuxieme DIVISION ------------------------------------------------------------------------------------------
            if (asteroid.id == 2) {
                AstArray.push(new Meteore(asteroid.x,
                    asteroid.y,
                    (2 * Math.random()) - 1,
                    (2 * Math.random()) - 1,
                    3));
            }
            //si on a un bouclier on perd pas de vie
            if (bouclier == false) {
                Vaisseau1.vie--;
                if(gameover == false){
                    let element = document.getElementById("myCanvas");
                    element.classList.add("shake");
                    setTimeout(function(){ element.classList.remove("shake"); }, 100);1
                    }
    
            }
            if (bouclier == true) {
                bouclier = false
                invincible = true;
                setTimeout(() => {
                    invincible = false;
                }, 1000);
            }
            if (gameover == false) {
                score = score + 100;
            }
            if (Vaisseau1.vie == 0) {
                //fin du jeu 
                gameover = true; /*-------------------------------------------POUR AFFICHER LE GAME OVER--------------*/
                document.getElementById("restart").style.display ='inline';
                explosion.mute(true);
                shoot.mute(true);
                priseBonus.mute(true);
                swmusic1.pause();
                swmusic2.pause();
                swmusic3.pause();
                backgroundMusic.pause();
                if( swmode == true){
                    weow.play();
                    weow.once('end', function () {
                        xwingexplose.play();
                        xwingexplose.once('end', function () {
                            gameoverVoice.play();
                        });
                    });
                }
                else{
                    gameoverSound.play();
                    gameoverSound.once('end', function () {
                    gameoverVoice.play();
                    });
                }
            }

            if (Math.floor((Math.random() * 5)) == 0) {
                //une chance sur 5 d'avoir un bonus 
                randomBonus();
                BonusArray.push(new Bonus1(asteroid.x, asteroid.y, numero));
                //var position = BonusArray.length + 1;
                //BonusArray[position] = bonus;
                //console.log("BONUS");

            }
            //console.log("COLLISION V/A")
        }
    }

}

function collisionTestBulletAVaisseau(bulletsAArray, Vaisseau1) {
    bulletsAArray.forEach((b, index) => {
        if (rectangleCollide(b.boundingBox, Vaisseau1.boundingBox)) {
            if (invincible == false) {

                explosion.play();
                //aliens.removeBulletA(b);

                if (bouclier == false) {
                    if(b.id == 0){
                        Vaisseau1.vie--;
                        if(gameover == false){
                            let element = document.getElementById("myCanvas");
                            element.classList.add("shake");
                            setTimeout(function(){ element.classList.remove("shake"); }, 100);1
                            }
            
                        invincible = true;
                        setTimeout(() => {
                        invincible = false;
                        }, 1000);
                    }
                    if(b.id == 1){
                        ion = true
                        setTimeout(() => {
                        ion = false;
                        }, 3000);
                    }
                }

                if (bouclier == true) {
                    bouclier = false
                    invincible = true;
                    setTimeout(() => {
                        invincible = false;
                    }, 1000);
                }

                if (Vaisseau1.vie == 0) {
                    //fin du jeu 
                    gameover = true; /*-------------------------------------------POUR AFFICHER LE GAME OVER--------------*/
                    
                    document.getElementById("restart").style.display ='inline';
                    explosion.mute(true);
                    shoot.mute(true);
                    swmusic1.pause();
                    priseBonus.mute(true);
                    swmusic2.pause();
                    swmusic3.pause();
                    backgroundMusic.pause();
                if( swmode == true){
                    weow.play();
                    weow.once('end', function () {
                        xwingexplose.play();
                        xwingexplose.once('end', function () {
                            gameoverVoice.play();
                        });
                    });
                }
                else{
                    gameoverSound.play();
                    gameoverSound.once('end', function () {
                    gameoverVoice.play();
                    });
                }
                }
            }
        }
    })
}

function collisionTestBulletAlien(aliens, bulletsArray) {
    bulletsArray.forEach((b, index) => {
        if (rectangleCollide(aliens.boundingBox, b.boundingBox)) {
            if(aliens.id==1){
                createBasicExplosion(aliens.x,aliens.y,"#27c9ff"); 

            }
            else{
                createBasicExplosion(aliens.x,aliens.y,"#DC143C"); 
            }
            supprimerAliens(aliens);
            explosion.play();
            Vaisseau1.removeBullet(b);
            if (gameover == false) {
                score = score + 2000;
            }
        }
    })

}

function collisionTestAlienVaisseau(aliens, Vaisseau1) {
    if (rectangleCollide(aliens.boundingBox, Vaisseau1.boundingBox)) {
        if (invincible == false) {
            invincible = true;
            setTimeout(() => {
                invincible = false;
            }, 1000);

            supprimerAliens(aliens);
            explosion.play();

            if (bouclier == false) {
                Vaisseau1.vie--;
                if(gameover == false){
                let element = document.getElementById("myCanvas");
                element.classList.add("shake");
                setTimeout(function(){ element.classList.remove("shake"); }, 100);1
                }

            }

            if (bouclier == true) {
                bouclier = false
                invincible = true;
                setTimeout(() => {
                    invincible = false;
                }, 1000);
            }

            if (gameover == false) {
                score = score + 2000;
            }

            if (Vaisseau1.vie == 0) {
                //fin du jeu 
                gameover = true; /*-------------------------------------------POUR AFFICHER LE GAME OVER--------------*/
                document.getElementById("restart").style.display ='inline';
                explosion.mute(true);
                shoot.mute(true);
                swmusic1.pause();
                swmusic2.pause();
                swmusic3.pause();
                priseBonus.mute(true);
                backgroundMusic.pause();
                if( swmode == true){
                    weow.play();
                    weow.once('end', function () {
                        xwingexplose.play();
                        xwingexplose.once('end', function () {
                            gameoverVoice.play();
                        });
                    });
                }
                else{
                gameoverSound.play();
                gameoverSound.once('end', function () {
                gameoverVoice.play();
                });
                }
            }
        }
    }
}


function supprimerAliens(al) {
    let pos = AstArray.indexOf(al);
    AlienArray.splice(pos, 1);
    currentNBAlien = currentNBAlien - 1;
    if (cunrrentNB == 0) {
        meteorecheck = true;//dans le cas où le niveau n'a pas de meteores
    }
    else{
        meteorecheck = false;
    }
    if(currentNBAlien == 0){
        aliencheck = true;
    }
    else{
        aliencheck = false; 
    }
    niveauSuivant();
}

function supprimerAsteroid(a) {
    let pos = AstArray.indexOf(a);
    AstArray.splice(pos, 1);

    if (a.id == 3) {
        cunrrentNB = cunrrentNB - 0.5;
        //console.log(cunrrentNB);
    }

    if (cunrrentNB == 0) {
        meteorecheck = true;
    }
    else{
        meteorecheck = false;
    }
    if(currentNBAlien == 0){//dans le cas où le niveau n'a pas d'alien
        aliencheck = true;
    }
    else{
        aliencheck = false; 
    }
    niveauSuivant();
}


