	function selection() {
		this.canvas = document.getElementById("layer1");
		this.firstpoint;
		this.lastpoint;
		this.drawing = false;
		
		var that = this;
		this.canvas.onmousedown = function(e) { that.mouseDown(e) };
		this.canvas.onmousemove = function(e) { that.mouseMove(e) };
		this.canvas.onmouseup = function(e) { that.mouseUp(e) };
		
		this.mouseDown = function(e) {
			this.drawing = true;
			this.firstpoint = getMousePos(this.canvas, e);
		}

		this.mouseMove = function(e) {
			if (!this.drawing) return; 

			lastpoint = getMousePos(this.canvas, e);
		}

		this.mouseUp = function(e){
			this.drawing = false;
			selectiontool(layers, this.firstpoint, this.lastpoint, this.canvas);
		}
	}

	function selectiontool(layers, first, last, parentcanvas) {
		var canvas = document.createElement('canvas');
       		div = document.getElementById("layers"); 
       		canvas.id     = ("layerof"+parentcanvas.id);
        	canvas.width  = Math.abs(first.x - last.x);
        	canvas.height = Math.abs(first.y - last.y);
        	canvas.style.zIndex   = 8;
        	canvas.style.position = "absolute";
		canvas.style.left = (Math.min(first.x, last.x) + "px");
		canvas.style.top = (Math.min(first.y, last.y)+ "px");
		canvas.style.border = "1px solid #000000";
		//	layers.splice(layers.findIndex(parentcavas.id)+1, canvas);
        	div.appendChild(canvas);
	}
