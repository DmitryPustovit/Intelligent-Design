function mergeLayers(top, bottom){
	var ctx = bottom.getContext('2d');
	ctx.setOpacity(top.getOpacity, bottom);
	ctx.drawImage(top, 0, 0);
	ctx.setOpacity(1, bottom);
}

