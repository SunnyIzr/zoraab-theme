$(document).ready(function(){
  BlogController.init()
  $('#blogHero').image(BlogModel.heroUrl(), function(){
    $('#blogHero').addClass('hero-blog-reveal')
  })
})

var BlogController = {
  init: function(){
    
  }
}

var BlogModel = {
  heroUrl: function(){
    return $('.blog-hero')[0].src
  }
}