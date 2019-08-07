var image;

function newImage(width, height, fill)
{
  image = {
    name : "",
    layers : [],
    selected : null,
    counter : 0,
    width: null,
    height: null
  };

  var ratio = window.devicePixelRatio;
  image.width = width;
  image.height = height;

  $('#sketch').empty();
  $('#sketch').css('width', width / ratio);
  $('#sketch').css('height', height / ratio);
  $('#sketchScroll').css('width', $('#sketch').width() * 1.1);
	$('#sketchScroll').css('height', $('#sketch').height() * 1.1);

  createLayer();
  selectLayer(1);

  if(fill){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  image.layers[image.selected].data = ctx.getImageData(0,0,image.width, image.height);
}
