$(document).ready(function(){
  collectionHover()
  filter()
  svgIcon()
  svgCloseIcon()
  filterChevron()
  closeFilterOnMobile()
})


var collectionHover = function() {
  $('.collection-item').hover(function(event){
    $(this).children('.item-desc').css('opacity','1.0')
  }, function(event){
    $(this).children('.item-desc').css('opacity','0.0')
  })
}

var svgIcon = function() {
  $('.svg-icon').hover(function(){
    $(this).find('path').attr('fill','#67c5a9')
    $(this).find('polygon').attr('fill','#67c5a9')
  }, function(){
    $(this).find('path').attr('fill','#b8b8b8')
    $(this).find('polygon').attr('fill','#b8b8b8')
  })
}

var svgCloseIcon = function() {
  $('.svg-close-icon').hover(function(){
    $(this).find('path').attr('fill','#67c5a9')
  }, function(){
    $(this).find('path').attr('fill','#404041')
  })
}

var filterChevron = function() {
  el = $('.filter-btn').find('i')
  $('.filter-btn').click(function(){
    if ($(el).hasClass('fa-caret-up')){
      $(el).removeClass('fa-caret-up')
      $(el).addClass('fa-caret-down')
    } else if ($(el).hasClass('fa-caret-down')){
      $(el).addClass('fa-caret-up')
      $(el).removeClass('fa-caret-down')
    }
  })
}


