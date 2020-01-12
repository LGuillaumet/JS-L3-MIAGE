var particles = [];

function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}

function removeFromArray(array, object) {
  var idx = array.indexOf(object);
  if (idx !== -1) {
    array.splice(idx, 1);
  }
  return array;
}

/*
 * A single explosion particle
 */
function Particle() {
  this.scale = 1.0;
  this.x = 25;
  this.y = 25;
  this.radius = 20;
  this.color = "#000";
  this.velocityX = 0;
  this.velocityY = 0;
  this.scaleSpeed = 0.8;
  this.idP = 0;


  this.update = function (ms) {
    // shrinking

    this.scale -= this.scaleSpeed * ms / 1000.0;
    
    if (this.scale <= 0) {
      // particle is dead, remove it
      removeFromArray(particles, this);

    }

    // moving away from explosion center
    this.x += this.velocityX * ms / 1000.0;
    this.y += this.velocityY * ms / 1000.0;

    // and then later come downwards when our
    // gravity is added to it. We should add parameters 
    // for the values that fake the gravity

  };

  this.draw = function (ctx, angle,idP) {
    // translating the 2D context to the particle coordinates
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(angle);
    ctx.rotate(Math.PI / -0.4455);
    ctx.translate(25, 25); //pour tourner sur lui même

    // drawing a filled circle in the particle's local space
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    //ctx.closePath();

    /*ctx.fillStyle = this.color;
    ctx.fill();*/
     if(this.idP==0){
      ctx.strokeStyle = this.color
      ctx.stroke();
    }
    if(this.idP==1){
    ctx.fillStyle = this.color;
    ctx.fill();
    }


    ctx.restore();
  }
}

/*
 * Basic Explosion, all particles move and shrink at the same speed.
 * 
 * Parameter : explosion center
 */
function createBasicExplosion(x, y, color) {
  this.idP = 1;
  // creating 4 particles that scatter at 0, 90, 180 and 270 degrees
  for (var angleParticle = 0; angleParticle < 360; angleParticle += 25) {


    var particle = new Particle();

    // particle will start at explosion center
    particle.x = x;
    particle.y = y;

    particle.color = color;

    var speed = 50.0;

    // velocity is rotated by "angleParticle"
    particle.velocityX = speed * Math.cos(angleParticle * Math.PI / 180.0);
    particle.velocityY = speed * Math.sin(angleParticle * Math.PI / 180.0);

    // adding the newly created particle to the "particles" array
    particles.push(particle);
  }
}

/*
 * Advanced Explosion effect
 * Each particle has a different size, move speed and scale speed.
 * 
 * Parameters:
 * 	x, y - explosion center
 * 	color - particles' color
 */
function createExplosion(x, y, color, vAngle) {
  this.idP = 0;
  var minSize = 10;
  var maxSize = 15;
  var count = 1;
  var minSpeed = 60.0;
  var maxSpeed = 200.0;
  var minScaleSpeed = 1.0;
  var maxScaleSpeed = 6.0;

  for (var vAngle = 0; vAngle < count; vAngle += 1) {
    var particle = new Particle();
    particle.idP = 1;
    particle.x = x;
    particle.y = y;

    // size of particle
    particle.radius = randomFloat(minSize, maxSize);

    particle.color = color;

    // life time, the higher the value the faster particle 
    // will die
    particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);

    // use gravity
    particle.useGravity = false;

    var speed = randomFloat(minSpeed, maxSpeed);

    particle.velocityX = speed * Math.cos(vAngle * Math.PI / 360.0);
    particle.velocityY = speed * Math.sin(vAngle * Math.PI / 360.0);

    particles.push(particle);
  }

}

// Delta = time between two consecutive frames,
// for time-based animation
function updateAndDrawParticules(delta) {
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];

    particle.update(delta);
    if (particle.idP == 1) {
      particle.draw(ctx, Vaisseau1.angle);

    } else {
      particle.draw(ctx);
    }
  }
}

//------------- ANIMATION PART -------------------------
var delta, oldTime = 0;

function timer(currentTime) {
  var delta = currentTime - oldTime;
  oldTime = currentTime;
  return delta;

}



function getMousePos(canvas, evt) {
  // necessary to take into account CSS boudaries
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}


function startDoubleExplosion(x, y, vAngle) {
  createExplosion(x, y, "#FFA318", vAngle);
  createExplosion(x, y, "#525252", vAngle);
  // On peut multiplier la densité en générant plusieurs 
  // explositons de couleurs différentes...

  //createExplosion(x, y, "green");
  //sound.play('blast');

}
// SOUND WITH HOWLER JS
/*
var sound = new Howl({
urls: ['http://goldfirestudios.com/proj/howlerjs/sounds.mp3', 'http://goldfirestudios.com/proj/howlerjs/sounds.ogg'],
sprite: {
blast: [0, 2000],
laser: [3000, 700],
winner: [5000, 9000]
}, 
onload: function() { console.log("Sound loaded");}
});*/