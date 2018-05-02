var image = {
  name : "",
  layers : [],
  selected : null,
  counter : 0,
  width: null,
  height: null
};

function newImage(width, height)
{
  image.width = width;
  image.height = height;

  $('#sketch').css('width', width);
  $('#sketch').css('height', height);

  createLayer();
  selectLayer(1);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  image.layers[image.selected].data = ctx.getImageData(0,0,image.width, image.height);
}
