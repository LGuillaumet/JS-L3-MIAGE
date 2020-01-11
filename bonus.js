var shrek = new Image(10, 10);
shrek.src = "shrek.png";

//L'image pour la vie supplémentaire utilisable ultérieurement.
var coeur = new Image(10, 10);
coeur.src = "coeur.png";

var bitcoin = new Image(10, 10);
bitcoin.src = "bitcoin.png";

var mun = new Image(10, 10);
mun.src = "mun.png";

var shield = new Image(10, 10);
shield.src = "shield.png";

class Bonus1 {
    constructor(x, y, id) {
        //console.log("POS TEST:", x, y);
        this.x = x;
        this.y = y;
        this.id = id;
        this.boundingBox = {
            x: x - 10,
            y: y - 10,
            width: 20,
            height: 20
        }
    }

    drawBoundingBox(ctx) {
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
        ctx.restore();
    }

    draw() {
        if (afficher_bounding == true) {
            this.drawBoundingBox(ctx);
        }
        // LES POINTS POUR GRYFONDOR
        if (this.id == 0) {
            ctx.drawImage(bitcoin, this.x - 30, this.y - 30, 60, 50);
        }
        //BOUCLIER 
        if (this.id == 1) {
            ctx.drawImage(shield, this.x - 20, this.y - 20, 25, 25);
        }
        // LES MUNITIONS POUR TOUT CASSER
        if (this.id == 2) {
            ctx.drawImage(mun, this.x - 20, this.y - 20, 25, 25);
        }
        //EL SHREKOS
        if (this.id == 3) {
            ctx.drawImage(shrek, this.x - 20, this.y - 20, 30, 30);
        }
        ctx.fill();
        ctx.restore();
    }
}