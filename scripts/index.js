$(document).ready(function(){
  panelHoverEffect()
  heroAddClickEffect();
  heroAddEffect();
  $('#indexHero').image($('#hero-url').html(), function(){
  $('#indexHero').addClass('hero-reveal')
  })
})


var heroAddClickEffect = function(){
  $('.add-btn').click(function(event){
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
    $(i).attr('alt','Cool Socks and Colorful Socks')
    i.src = src;
    i.onload = f;
    this.insertBefore(i,this.firstChild);
  });
}