var clearLoader = function(){
  $('.load-overlay').css('opacity','0.0')
  setTimeout(function(){
    $('.load-overlay').remove()
  }, 500)
}