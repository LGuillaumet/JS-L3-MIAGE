class BulletA {
    constructor(Alien,id) {
        this.x = Alien.x;
        this.y = Alien.y;
        this.angle = Alien.angleD;
        this.id = id;
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
        ctx.fillStyle = 'yellow';
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