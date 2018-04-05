function layerHander() {
	canvas = document.getElementById("layer" + arrayLayer.length);
	createLayer("layers",(arrayLayer.length+1), canvas.width, canvas.height)
	var newbutton = document.createElement('BUTTON');
	var t = document.createTextNode("layer" + (arrayLayer.length + 1));
	newbutton.appendChild(t);
	newbutton.onclick = function() {selectLayer(arrayLayer.length+1);};
	var div = document.getElementById("layersgroup");
	div.appendChild(newbutton);
	arrayLayer.push((arrayLayer.length+1));
}

function selectLayer(number) {
	canvas.getElementById("layer" + number);
	ctx = canvas.getContext('2d');
}
