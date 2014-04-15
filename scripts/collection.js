$(document).ready(function(){
  collectionHover()
  filter()
})


var collectionHover = function() {
  $('.collection-item').hover(function(event){
    $(this).children('.item-desc').css('opacity','1.0')
  }, function(event){
    $(this).children('.item-desc').css('opacity','0.0')
  })
}