function setOpacity(opacity, canvas) {
	var hidden_canvas = document.createElement("canvas");
   	hidden_canvas.width = canvas.width;
   	hidden_canvas.height = canvas.height;
    	var hidden_ctx = hidden_canvas.getContext("2d");  


	hidden_context.drawImage(canvas, 0, 0);
	

	var ctx = canvas.getContext("2d");
	ctx.globalAlpha=opacity;
	ctx.drawImage(hidden_canvas, 0, 0);
}

