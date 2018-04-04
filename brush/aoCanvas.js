//By: aowolfie (Brandon Beckwith)
function distBetween(p1, p2) { return Math.hypot(p2.x - p1.x, p2.y - p1.y); }
function angBetween(p1, p2) { return Math.atan2(p2.x - p1.x, p2.y - p1.y); }
function Point(x, y){ this.x = x; this.y = y; return this; }
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min;}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return new Point(evt.clientX - rect.left, evt.clientY - rect.top);
}

function colorToRGBA(color) {
    // Returns the color as an array of [r, g, b, a] -- all range from 0 - 255
    // color must be a valid canvas fillStyle. This will cover most anything
    // you'd want to use.
    // Examples:
    // colorToRGBA('red')  # [255, 0, 0, 255]
    // colorToRGBA('#f00') # [255, 0, 0, 255]
    var cvs, ctx;
    cvs = document.createElement('canvas');
    cvs.height = 1;
    cvs.width = 1;
    ctx = cvs.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    return ctx.getImageData(0, 0, 1, 1).data;
}

function Brush(canvas, bData){
	console.log(bData);
	this.drawing = false;
	this.cT = 0;
	this.lastPoint;
	this.bData = bData;
	this.image = new Image();
	this.rotation = this.bData.iniRotation;
	this.image.src = this.bData.textures[0];
	console.log(this.image);
	this.canvas = canvas;
	this.context = canvas.getContext('2d');
	this.context.drawImage(this.image, 10, 10);

	this.cycleTexture = function(){
		if (this.bData.mtRand){
			this.cT = (this.cT + 1) % this.bData.textures.length;
		} else {
			this.cT = getRandomInt(0, this.bData.textures.length - 1);
		}
		this.image.src = this.bData.textures[this.cT];
		this.applyColor();
	}

	this.mouseDown = function(e) {
		this.drawing = true;
		this.lastPoint = getMousePos(this.canvas, e);
	}

	this.mouseMove = function(e) {
		if (!this.drawing) return; 

		var cP = getMousePos(this.canvas, e);
		var dist = distBetween(this.lastPoint, cP);
		var ang = angBetween(this.lastPoint, cP);

		for (var i = 0; i < dist; i++){
			x = this.lastPoint.x + (Math.sin(ang) * i) - this.bData.xOffset;
			y = this.lastPoint.y + (Math.cos(ang) * i) - this.bData.yOffset;
			if (this.bData.ranRotation){
				this.context.save();
    			this.context.translate(x, y);
    			this.context.scale(0.5, 0.5);
    			this.context.rotate(Math.PI * 180 / getRandomInt(this.bData.minRotation, this.bData.maxRotation));
    			this.context.drawImage(this.image, 0, 0);
    			this.context.restore();
    		} else {
    			this.context.drawImage(this.image, x, y);
    		}
    		this.cycleTexture();
		}

		this.lastPoint = cP;
	}

	this.mouseUp = function(e){
		this.drawing = false;
	}

	this.assign = function(e){
		var that = this;
		this.canvas.onmousedown = function(e) { that.mouseDown(e) };
		this.canvas.onmousemove = function(e) { that.mouseMove(e) };
		this.canvas.onmouseup = function(e) { that.mouseUp(e) };
	}

	this.setColor = function(color){
		this.color = colorToRGBA(color);;
		this.applyColor();
	}

	this.applyColor = function(){
		var c = document.createElement('canvas');
    	c.width = this.image.width;
    	c.height = this.image.height;
    	var ctx = c.getContext('2d');
    	ctx.drawImage(this.image, 0, 0);
    	var imgData = ctx.getImageData(0, 0, c.width, c.height);
		for (var i=0;i<imgData.data.length;i+=4)
   		{
   			if (imgData.data[i+3] > 0){
   				imgData.data[i] = this.color[0];
   				imgData.data[i+1] = this.color[1];
   				imgData.data[i+2] = this.color[2];
   			}
    	}
    	ctx.putImageData(imgData,0,0);
    	this.image.src = c.toDataURL();
	}

	return this;
}