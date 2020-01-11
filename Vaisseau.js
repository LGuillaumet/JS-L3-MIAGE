var bangle = 0;

afficher_bounding = false;

var xwing = new Image(10, 10);
xwing.src = "xwing.png";

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
        ctx.clearRect(0, 0, ctx.width, ctx.height);



        // draw the circle
        ctx.beginPath();

        var radius = 35 + 10 * Math.abs(Math.cos(bangle));
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
        ctx.closePath();

        // color in the circle
        ctx.strokeStyle = 'blue';
        ctx.stroke();

        bangle += Math.PI / 64;

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
            if (swmode == true) {
                document.getElementById("myCanvas").style.backgroundImage = "url('starwarsGameOver.png')";
            }
            ctx.font = '48px serif';
            ctx.fillStyle = "white";
            ctx.textAlign = 'center';
            ctx.fillText("GAME OVER", (canvas.width / 2), (canvas.height / 2));
            ctx.fillText(score + "pts", (canvas.width / 2), ((canvas.height / 2) + 50));
            ctx.restore();
        }

        if (gameover != true) {
            if (BonusArray.length != 0) {
                BonusArray.forEach(e => {
                    e.draw();
                })
            }
            ctx.save();
            ctx.fillStyle = "white";
            ctx.fillText("Vie: " + Vaisseau1.vie, 10, 50);
            ctx.fillText("Score: " + score, 10, 100);
            ctx.fillText("Niveau: " + (NbAst - 1), 10, 150);
            ctx.restore();
            ctx.save();
            if (afficher_bounding == true) {
                this.drawBoundingBox(ctx);
            }
            if (bouclier == true) {
                this.drawBouclier(ctx);
                //console.log("apparitionBouclier");
            }

            if (swmode == true) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(Vaisseau1.angle);
                //ctx.rotate(Math.PI / -0.4455);
                ctx.translate(-30, -30);
                ctx.drawImage(xwing, 0, 0, 60, 60);
                ctx.restore();

            }


            if (swmode == false) {
                ctx.translate(this.x, this.y);
                ctx.rotate(Vaisseau1.angle);
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
            }

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