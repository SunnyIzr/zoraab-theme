$(document).ready(function(){
  BlogController.init()
  $('#blogHero').image(BlogModel.heroUrl(), function(){
    $('#blogHero').addClass('hero-blog-reveal')
  })
})

var BlogController = {
  init: function(){
    this.prevewHover()
    
  }, 
  prevewHover: function(){
    $('.blog-preview').hover(function(){
      $(this).find('.preview-text').addClass('preview-text-hover')
    }, function(){
      $(this).find('.preview-text').removeClass('preview-text-hover')
    })
  }
}

var BlogModel = {
  heroUrl: function(){
    return $('.blog-hero')[0].src
  }
}