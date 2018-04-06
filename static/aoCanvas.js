/*
	By: aowolfie (Brandon Beckwith)
	References:
		For general brush information:
		http://perfectionkills.com/exploring-canvas-drawing-techniques/
*/


/* Point object for consistancy's sake */
function Point(x, y){ this.x = x; this.y = y; return this; }

/* Distance and angle helpers */
function distBetween(p1, p2) { return Math.hypot(p2.x - p1.x, p2.y - p1.y); }
function angBetween(p1, p2) { return Math.atan2(p2.x - p1.x, p2.y - p1.y); }

/* Random number generators */
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min;}
function getRandomDouble(min, max) { return (Math.random() * (max - min)) + min;}

/* Finds the mouse's current true position */
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return new Point(evt.clientX - rect.left, evt.clientY - rect.top);
}

/* Used to check if a value is between two values (Inclusive) */
function between(x, min, max) { return x >= min && x <= max; }

function colorToRGBA(color) {
    // Returns the color as an array of [r, g, b, a] -- all range from 0 - 255
    // Examples:
    // colorToRGBA('red')  # [255, 0, 0, 255]
    // colorToRGBA('#f00') # [255, 0, 0, 255]
    var cvs, ctx;
    console.log(color);
    cvs = document.createElement('canvas');
    cvs.height = 1;
    cvs.width = 1;
    ctx = cvs.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    return ctx.getImageData(0, 0, 1, 1).data;
}


/* Used to create a brush object
	canvas: The canvas the brush will be assigned to
	bData: The brushes data that is in the following form
	{
		"name": "Pencil",
		"textures": [
			"brush1.png"	//An array of texture urls, picked in order
		],
		"mtRand": true,		//Randomly select brush textures
		"minRotation": 0,	//The minimum rotation to make each update
		"maxRotation": 0,	//The maximum rotation to make each update
		"step": 4,		 	//The number of pixels skipped when the brush is moved quickly
		"yOffset": 16,	 	//The x image offset
		"xOffset": 16,		//The y image offset
		"minScale": 1.0,	//The minimum the brush can randomly be scaled by
		"maxScale": 1.0,	//The maximum the brush can randomly be scaled by
		"minOpacity": 1.0,	//The minimum opacity the brush can have randomly applied
		"maxOpacity": 1.0,	//The maximum opacity the brush can have randomly applied
	}
*/
function Brush(canvas, bData){
	/* The brush's properties */
	this.bData = bData;

	/* The current state of the brush */
	this.drawing = false;
	this.cT = 0;
	this.lastPoint = new Point(0,0);
	this.lastAngle = 0;

	/* Extra properties */
	this.opacity = 1;
	this.scale = 1;

	/* Canvas information */
	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	/* Texture array */
	this.textures = {};

	/* Load all associated brush textures */
	for (var i=0; i < this.bData.textures.length; i++) {
		this.textures[i] = new Image();
		this.textures[i].src = this.bData.textures[i];
		this.textures[i].crossOrigin = "anonymous"
	}

	/* Assign the current brush texture */
	this.image = new Image();
	this.image.crossOrigin = "anonymous"
	this.image.src = this.bData.textures[0];

	/* Cycle through the brush textures */
	this.cycleTexture = function(){

		/* Randomly if needed, else iteratively */
		if (this.bData.mtRand){
			this.cT = (this.cT + 1) % this.bData.textures.length;
		} else {
			this.cT = getRandomInt(0, this.bData.textures.length - 1);
		}

		/* Update the current texture */
		this.image = this.textures[this.cT];
	}

	/* When the mouse is pushed down, enable drawing */
	this.mouseDown = function(e) {
		this.drawing = true;
		this.lastPoint = getMousePos(this.canvas, e);
	}

	/*
		Updates the canvas when the mouse moves
	*/
	this.mouseMove = function(e) {

		/* If we aren't drawing ignore mouse movements*/
		if (!this.drawing) return;

		/* Get some initial values*/
		var cP = getMousePos(this.canvas, e);
		var dist = distBetween(this.lastPoint, cP);
		var ang = angBetween(this.lastPoint, cP);

		/*	For iterate through all spaces between where the mouse
			last was and where it is currently*/
		for (var i = 0; i < dist; i += this.bData.step){
			/* Calculate the x and y point where the drawing should take place*/
			x = (this.lastPoint.x + (Math.sin(ang) * i) - this.bData.xOffset) * this.scale;
			y = (this.lastPoint.y + (Math.cos(ang) * i) - this.bData.yOffset) * this.scale;

			/* Save the state of the context */
			this.context.save();

			/* It's easier to transform the canvas than it is the image */
    		this.context.translate(x, y);

    		/* Apply the random scaling */
    		scale = getRandomDouble(this.bData.minScale, this.bData.maxScale) * this.scale;
    		this.context.scale(scale, scale);

    		/* If a rotation is needed, apply it */
			if (this.bData.minRotation != 0 || this.bData.maxRotation != 0 ){
				this.lastAngle = Math.abs((getRandomInt(this.bData.minRotation, this.bData.maxRotation) + this.lastAngle) % 360);
    			this.context.rotate(Math.PI / 180 * this.lastAngle);
    		}

    		/* If opacity changes are needed, apply them */
    		if (this.bData.minOpacity != 0 || this.bData.maxOpacity != 0 ){
    			var op = this.context.globalAlpha;
    			this.context.globalAlpha = getRandomDouble(this.bData.minOpacity, this.bData.maxOpacity) * op * this.opacity;
    		}

    		/* Draw the image to the canvas */
    		this.context.drawImage(this.image, 0, 0);

    		/* Restore the canvas back to it's orignal configuration */
    		this.context.restore();

    		/* Cycle the texture used */
    		this.cycleTexture();
		}

		/* Set this point as the last point */
		this.lastPoint = cP;
	}

	/*
		Used to stop the drawing when the mouse is lifted
	*/
	this.mouseUp = function(e){
		this.drawing = false;
	}

	/*
		Assigns the brush to the canvas, returns true on success
	*/
	this.assign = function(e){
		if (!this.image.complete) return false;
		var that = this;
		console.log("Assigning brush:" + this.bData.name);
		this.canvas.onmousedown = function(e) { that.mouseDown(e) };
		this.canvas.onmousemove = function(e) { that.mouseMove(e) };
		this.canvas.onmouseup = function(e) { that.mouseUp(e) };
		return true;
	}

	/* Set the brush's opacity */
	this.setOpacity = function(opacity) { this.opacity = opacity; }

	/* Get the brush's opacity */
	this.getOpacity = function() { return this.opacity; }

	/* Set the brushe's scale */
	this.setScale = function(scale) { this.scale = scale; }

	/* Get the brush's scale */
	this.getScale = function(scale) { return this.scale; }


	/* Set's the brush's reg, green and blue channels */
	this.setRGB = function(r, g, b){
		return this.setRGBA(r, g, b, 1);
	}

	/* Set's the brush's red, green, blue and alpha channels */
	this.setRGBA = function(r, g, b, a){
		if (!(between(r, 0, 255) && between(g, 0, 255) && between(b, 0, 255) && between(a, 0, 1))) { return false; }
		this.color = {r, g, b, a};
		if (!this.image.complete) return false;
		this.applyColor();
		return true;
	}

	/* Reassign's the brush's canvas */
	this.setCanvas = function(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	}

	/*
		Sets and applies the color
	*/
	this.setColor = function(color){
		this.color = colorToRGBA(color);;
		if (!this.image.complete) return false;
		this.applyColor();
		return true;
	}

	/*
		Applies the color to all the loaded textures
	*/
	this.applyColor = function(){

		/* Iterate through all the brush textures*/
		for (var u=0; u < this.bData.textures.length; u++){

			/* Create a ghost canvas, using the current texture as template */
			var c = document.createElement('canvas');
    		c.width = this.textures[u].width;
    		c.height = this.textures[u].height;

  			/* Get the ghost canvas's context */
    		var ctx = c.getContext('2d');

    		/* Fill the ghost canvas with a brush texture */
    		ctx.drawImage(this.textures[u], 0, 0);

    		/* Get the image data for the ghost canvas */
    		var imgData = ctx.getImageData(0, 0, c.width, c.height);

    		/* Iterate through the ghost canvas's data,
    			the array follows the following pattern:
    				r, g, b, a, r, g, b, a
    		*/
			for (var i=0;i<imgData.data.length;i+=4) {
				/* If the pixel is not transparent, apply the color */
   				if (imgData.data[i+3] > 0){
   					imgData.data[i] = this.color[0];
   					imgData.data[i+1] = this.color[1];
   					imgData.data[i+2] = this.color[2];
   				}
    		}

    		/* Add the updated image data back to the ghost canvas */
    		ctx.putImageData(imgData,0,0);

    		/* Update the texture array */

    		this.textures[u].src = c.toDataURL();

    		/* If the texture is currently in use, update that texture too */
    		if (this.cT == u){
    			this.image = this.textures[u];
    		}
    	}
	}

	return this;
}
