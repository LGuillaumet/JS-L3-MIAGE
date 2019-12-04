

class Bonus1 {
	constructor(x, y) {
		console.log("POS TEST:", x, y);
		this.x = x;
	  	this.y = y;
	  	this.boundingBox = {
		    x,
		    y,
		    width: 20,
		    height: 20
	  	}
  	}

  	drawBoundingBox(ctx){
    	ctx.save();
    	ctx.strokeStyle = 'red';    	
    	ctx.strokeRect(this.boundingBox.x,this.boundingBox.y,this.boundingBox.width,this.boundingBox.height);
    	ctx.restore();
  	}
  	draw() {  		
    	this.drawBoundingBox(ctx);
    	ctx.save();
    	ctx.beginPath();
    	ctx.arc(this.x,this.y,10,0,2*Math.PI);
    	ctx.fillStyle= "yellow";
    	ctx.fill();
    	ctx.restore();
	}
}