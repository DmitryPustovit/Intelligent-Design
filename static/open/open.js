function openImage()
{
  $('<input>').attr({
      type: 'hidden',
      id: 'openTemp',
      type: 'file'
  }).appendTo('body');
  $("#openTemp").css('opacity', 0);
  $("#openTemp").trigger('click');
}

$(document).on( 'change', '#openTemp', openImageHandler);

function openImageHandler(e){
  var reader = new FileReader();
  reader.onload = function(event){
      var img = new Image();
      img.onload = function(){
          newImage(img.width, img.height, false);
          ctx.drawImage(img,0,0);
      }
      img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
  $("#openTemp").remove();
}
