function newImage(width, height, fill)
{
  this.image = {
    name : "",
    layers : [],
    selected : null,
    counter : 0,
    width: null,
    height: null
  };

  var ratio = window.devicePixelRatio;
  this.image.width = width;
  this.image.height = height;

  $('#sketch').empty();
  $('#sketch').css('width', width / ratio);
  $('#sketch').css('height', height / ratio);

  createLayer();
  selectLayer(1);

  if(fill){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  this.image.layers[image.selected].data = ctx.getImageData(0,0,image.width, image.height);
}