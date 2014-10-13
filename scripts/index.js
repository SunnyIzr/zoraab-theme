$(document).ready(function(){
  panelHoverEffect()
  heroAddClickEffect();
  heroAddEffect();
  $('#indexHero').image($('#hero-url').html(), function(){
    $('#indexHero').addClass('hero-reveal')
    slideDownSizeVars();
    hideSizeVarDropdown();
    heroAddSizeEffect();
  })
})

var heroAddSizeEffect = function(){
  $('.add-size-to-cart-action').click(function(event){
    target = $(this).data('target')
    variant = $(this).data('variant')
    console.log(variant)
    $('option[value="'+variant+'"]').prop('selected','true')
    $($(target).parent().parent().parent()).removeClass('item-desc-hover')
    $(target).click()
  })
}

var slideDownSizeVars = function(){
  $('.add-sized-btn').click(function(e){
    $($(this).parent().parent().parent()).addClass('item-desc-hover')
    target = $(this).data('target')
    $(target).slideDown(function() {})
    
  })
}

var removeAllSizeVarDropdowns = function(){
  $('.size-dropdown').css('display','none')
}

var hideSizeVarDropdown = function(){
  $(document).click(function(){
    removeAllSizeVarDropdowns()
  });
  $('.stop-hide-dropdown').click(function(e){
    e.stopPropagation();
  })
  
}


var heroAddClickEffect = function(){
  $('.add-to-cart-action').click(function(event){
    $(this).parent().find('.add').click()
  })
}

var heroAddEffect = function(){
  $('.add-btn').hover(function(){
    $(this).find('.add-plus-btn').css('background-color','#3ea284')
    $(this).css('color','#3ea284')
  }, function(){
    $(this).find('.add-plus-btn').css('background-color','#67c5a9')
    $(this).css('color','#404041');
  })
}

var panelHoverEffect = function(){
  $('.linked-panel').hover(function(){
    $(this).find('.text').css('color','#67c5a9');
    $(this).find('.link').css('color','#67c5a9');
    $(this).find('path').attr('fill','#67c5a9');
  }, function(){
    $(this).find('.text').css('color','#404041');
    $(this).find('.link').css('color','#404041');
    $(this).find('path').attr('fill','#b8b8b8');
  })
}

var getHeroImg = function(){
  heroUrl = $('#hero-url').html()
  $.get(heroUrl, 'image/jpg', function(res){
    
  })
}



$.fn.image = function(src, f) {
  return this.each(function() {
    var i = new Image();
    $(i).addClass('img-responsive')
    $(i).attr('alt','Cool Socks For Men and Colorful Socks')
    i.src = src;
    i.onload = f;
    this.insertBefore(i,this.firstChild);
  });
}