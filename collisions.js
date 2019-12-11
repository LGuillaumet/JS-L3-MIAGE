// Test for collision between an object and a point
function rectangleCollide(targetA, targetB) {
    //console.log(targetB);
    return !(targetB.x > (targetA.x + targetA.width) ||
        (targetB.x + targetB.width) < targetA.x ||
        targetB.y > (targetA.x + targetA.height) ||
        (targetB.y + targetB.height) < targetA.y);
}


function collisionTestVaisseauBonus(Vaisseau1, BonusArray) {
    for (let NbBonus = 0; NbBonus < BonusArray.length; NbBonus++) {
        bonus = BonusArray[NbBonus];
        //BonusArray.forEach((bonus , index) =>{
        //console.log(Vaisseau1.boundingBox.x);
        if (rectangleCollide(Vaisseau1.boundingBox, bonus.boundingBox)) {
            //if(bonus.id == 0){
            //console.log(bonus.id);
            if (bonus.id == 0) {
                changeCadenceTir(25);
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

        console.log(rectangleCollide(asteroid.boundingBox, b.boundingBox))

        if (rectangleCollide(asteroid.boundingBox, b.boundingBox)) {
            // il y a collision

            // On casse l'asteroide, on change les vitesses de rotation des
            // morceaux résultants (2, 3 ou 4)
            //asteroid.casse();
            console.log(asteroid);
            supprimerAsteroid(asteroid);
            console.log(asteroid)

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
    AstArray.forEach((a, index) => {
        if (a instanceof Asteroid && rectangleCollide(a.boundingBox, Vaisseau1.boundingBox)) {
            if (bouclier == false) {
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