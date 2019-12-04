

class Bonus1 {
	constructor(x, y,id) {
		//console.log("POS TEST:", x, y);
		this.x = x;
	  	this.y = y;
	  	this.id = id;
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
      if(this.id == 0){
    	 ctx.fillStyle = "yellow";
      } 
      if(this.id == 1){
        ctx.fillStyle = "blue";
      }
      if(this.id == 2){
        ctx.fillStyle = "green";
      }
    	ctx.fill();
    	ctx.restore();
	}
}
