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
  if($('#sketchScroll').width() < $('#sketch').width())
    $('#sketchScroll').css('width', $('#sketch').width() + ($('#sketch').width() * .4));

  if($('#sketchScroll').height() < $('#sketch').height())
  $('#sketchScroll').css('height', $('#sketch').height() + ($('#sketch').height() * .4));

  createLayer();
  selectLayer(1);

  if(fill){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  image.layers[image.selected].data = ctx.getImageData(0,0,image.width, image.height);
}
