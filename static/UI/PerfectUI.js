function displayUI(ui, callback){
  $.get(ui, function(data){
    $("body").append(data);
  });

  $('body').unbind().on('click', '.action', function() {
    var result = [];
    $( ".fetch" ).each(function( index ) {
      result.push($( this ).text());
    });
    callback(result);
    $(this).parent().parent().remove();
  });
}

$(document).on('click', '.delete', function() {
  $(this).parent().parent().remove();
});

$(document).on('change', 'select', function(){
    $(this).find(':selected').addClass('fetch')
           .siblings('option').removeClass('fetch');
});
