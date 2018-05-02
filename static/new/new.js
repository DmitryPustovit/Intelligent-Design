function newButton(data){
  console.log(data);
  newImage(data[0], data[1]);
}

function newImage(width, height)
{
  createLayer();
  selectLayer(1);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  image.layers[image.selected].data = ctx.getImageData(0,0,image.width, image.height);
}
