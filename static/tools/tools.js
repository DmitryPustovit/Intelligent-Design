if(localStorage.getItem("tool") != null)
  $('#' + localStorage.getItem("tool")).addClass('selected');
else{
  $('#pencil').trigger( "click" );
}


$( ".clicky" ).click(function() {
  $('.clicky').removeClass('selected');
  $(this).addClass('selected');
});
