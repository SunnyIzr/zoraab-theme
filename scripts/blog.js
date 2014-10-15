$(document).ready(function(){
  
})

var BlogController = {
  init: function(){
    this.prevewHover()
    this.popBlogs()
    this.popHeroImg()

  }, 
  prevewHover: function(){
    $(document).on('mouseover','.blog-preview',function(){
      $(this).find('.preview-text').addClass('preview-text-hover')
    }).on('mouseout',function(){
      $(this).find('.preview-text').removeClass('preview-text-hover')
    })
  },
  popBlogs: function(){
    if ($(".blogs").size() > 0) {
      blogs = BlogModel.getBlogs()
    }
  },
  popHeroImg: function(){
    if ($("#blogHero").size() > 0) {
      $('#blogHero').image(BlogModel.heroUrl(), function(){
        $('#blogHero').addClass('hero-blog-reveal')
      })
    }
  }
}

var BlogModel = {
  heroUrl: function(){
    return $('.blog-hero')[0].src
  },
  getBlogs: function(){
    url = "http://zoraab.herokuapp.com/blogs"
    $.getJSON(url,function(res){
      BlogView.addFeatured(res.featured)
      $.each(res.blogs,function(idx,blog){
        BlogView.addBlog(blog)
      })
    })
  }
}

var BlogView = {
  addBlog: function(blog){
    el = "<a href='" + blog.link + "'></a>"
    el = $(el).append("<img class='preview-img' src='" + blog.img_link + "'>")
    el = el.append("<p class='preview-text'>" + blog.title + "</p>")
    liEl = $("<li class='blog-preview'></li>")
    liEl = $(liEl).append(el)
    $(liEl).appendTo($('.blog-grid'))
  },
  addFeatured: function(blog){
    $($('.hero-content > h1')[0]).html(blog.title)
    $($('.hero-content > h3')[0]).html(blog.subtext)
    $('.hero-content > h5 > a')[0].href = blog.link
    $('#featuredImage').image(blog.main_img_link, function(){
      $('#featuredImage').addClass('hero-blog-reveal')
    })
  }
}