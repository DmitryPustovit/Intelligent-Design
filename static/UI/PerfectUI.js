function displayUI(ui, callback){
  var result = [];
  $.get(ui, function(data){
    $("body").append(data);
  });

  $('body').on('click', '.action', function() {
    $( ".fetch" ).each(function( index ) {
      result.push($( this ).text());
    });
    callback(result);
    $(this).parent().parent().remove();
  });

}

$('body').on('click', '.delete', function() {
  $(this).parent().parent().remove();
});

$('body').on('change', 'select', function(){
    $(this).find(':selected').addClass('fetch')
           .siblings('option').removeClass('fetch');
});
