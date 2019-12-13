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




function collisionTestVaisseauBonus(Vaisseau1, BonusArray) {

    for (let NbBonus = 0; NbBonus < BonusArray.length; NbBonus++) {
        bonus = BonusArray[NbBonus];
        //BonusArray.forEach((bonus , index) =>{
        if (rectangleCollide(Vaisseau1.boundingBox, bonus.boundingBox)) {
            //if(bonus.id == 0){
            //console.log(bonus.id);
            if (bonus.id == 0) {
                score = score + 500;
            } else if (bonus.id == 1) {
                bouclier = true;
                //console.log(bouclier);
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

function collisionTestAsteroidVaisseau(asteroid, Vaisseau1) {
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    if (rectangleCollide(asteroid.boundingBox, Vaisseau1.boundingBox)) {
        if (invincible == false) {
            invincible = true;
            setTimeout(() => {
                invincible = false;
            }, 1000);

            supprimerAsteroid(asteroid);


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
            }
            if (bouclier == true) {
                bouclier = false
                invincible = true;
                setTimeout(() => {
                    invincible = false;
                }, 1000);
            }
            score = score + 100;
            if (Vaisseau1.vie == 0) {
                //fin du jeu 
                //gameover = true; /*-------------------------------------------POUR AFFICHER LE GAME OVER--------------*/
            }
            if (Math.floor((Math.random() * 5)) == 0) {
                //une chance sur 5 d'avoir un bonus 
                BonusArray.push(new Bonus1(asteroid.x, asteroid.y, (Math.floor(Math.random() * 3))));

                //var position = BonusArray.length + 1;
                //BonusArray[position] = bonus;
                //console.log("BONUS");

            }
            //console.log("COLLISION V/A")
        }
    }

}

function supprimerAsteroid(a) {
    let pos = AstArray.indexOf(a);
    AstArray.splice(pos, 1);
}