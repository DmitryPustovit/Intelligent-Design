if(localStorage.getItem("tool") != null)
  $('#' + localStorage.getItem("tool")).addClass('selected');

$( ".clicky" ).click(function() {
  $('.clicky').removeClass('selected');
  $(this).addClass('selected');
});
