function createLayer(divid, number, width, height) {
	var canvas = document.createElement('canvas');
        div = document.getElementById("layers"); 
        canvas.id     = ("layer"+number);
        canvas.width  = width
        canvas.height = height;
        canvas.style.zIndex   = number-1;
        canvas.style.position = "absolute";
        div.appendChild(canvas);
}
