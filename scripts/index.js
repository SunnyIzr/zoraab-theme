$(document).ready(function(){
  panelHoverEffect()
  $('#indexHero').image($('#hero-url').html(), function(){
  $('#indexHero').addClass('hero-reveal')
  })
})


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