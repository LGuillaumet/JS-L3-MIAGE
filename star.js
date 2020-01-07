
function Star(x, y, r, b, c) {
    //
    this.x = x;
    this.y = y;
    this.radius = r;
    this.brightness = b;
    this.fillStyle = c;
    //
    this.arcRad = Math.PI * 2;

    this.draw = function () {
        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = this.brightness;
        ctx.fillStyle = this.fillStyle;
        ctx.arc(this.x, this.y, this.radius, 0, this.arcRad, true);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
};



function StarField(canvas, numStars, colours, twinkleSpeed) {
    this.context = canvas.getContext('2d'),
    this.w = canvas.width,
    this.h = canvas.height,
    this.numStars = numStars,
    this.stars = [],
    this.colours = colours,
    this.numColours = colours.length,
    this.count = 0,
    this.alter = twinkleSpeed;

    this.draw = function () {
        ctx.save();
        this.alterBrightness();
        ctx.clearRect(0, 0, this.w, this.h);
        for (var i = 0; i < this.numStars; i++) {
            var s = this.stars[i];
            s.draw(ctx);
        }
        ctx.restore();
    }

    this.create = function () {

        //
        for (var i = 0; i < this.numStars; i++) {
            //
            var x = Math.random() * this.w | 0,
                y = Math.random() * this.h | 0,
                r = Math.round((Math.random()) * 100) * 0.01,
                b = this.randomBetween(80, 100) * 0.01,
                c = this.colours[this.randomBetween(0, this.numColours)];
            //
            var s = new Star(x, y, r, b, c);
            this.stars.push(s);
            //s.draw(ctx);
        }

    }

    this.randomBetween = function (min, max) {
        return Math.round((Math.random() * max - min) + min);
    }

    this.shuffle = function (array) {
        var counter = array.length,
            temp, index;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    this.alterBrightness = function () {
        for (var i = this.count; i < this.alter; i++) {
            var s = this.stars[i];
            s.brightness = this.randomBetween(80, 100) * 0.01;
        }
        //
        this.count += this.alter;
        if (this.count >= this.numStars) {
            this.count = 0;
            this.shuffle(this.stars);
        }
    }

};

var sf = new StarField(document.getElementById("myCanvas"), 600, ["#f8f7ff", "#9bb0ff", "#ffcc6f", "#cad7ff"], 20);
    sf.create();
