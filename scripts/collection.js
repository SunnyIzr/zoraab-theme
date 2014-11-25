$(document).ready(function(){
  collectionHover()
  filter()
  svgIcon()
  svgCloseIcon()
  filterChevron()
  productVariantSoldOut()
})


var collectionHover = function() {
  $('.collection-item').hover(function(event){
    $(this).children('.item-desc').css('opacity','1.0')
    $(this).children('.pricing-info').css('border-color','#67c5a9')
    $(this).children('.pricing-info').addClass('hover')
  }, function(event){
    $(this).children('.item-desc').css('opacity','0.0')
    $(this).children('.pricing-info').css('border-color','#b8b8b8')
    $(this).children('.pricing-info').removeClass('hover')
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
  $(document).on('mouseenter','.svg-close-icon',function(e){
    $(this).find('path').attr('fill','#67c5a9')
  });
  $(document).on('mouseleave','.svg-close-icon',function(e){
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

var giftSetLiElHeight = function(){
  $.each($('.gift-set-products .gift-prod-img'),function(k,v){
    imgWidth = $(this).find('img').css('width')
    $(this).css('height',imgWidth)
  })
}

var productVariantSoldOut = function(){
  $('.product-select').change(function(){
    varId = $(this).val()
    handle = $(this).data('handle')
    url = '/products/' + handle + '.js'
    $.getJSON(url, function(res){
      $(res.variants).each(function(){
        if ( this.id == varId ) {
          window.selectEl = $('div[data-select-handle="'+handle+'"]')
          console.log('found selected var')
          
          
          if ( this.inventory_quantity < 1) {
            $(selectEl).addClass('current-var-sold-out')
          } else{
            $(selectEl).removeClass('current-var-sold-out')
          }
        }
      })
    })
  })
}


