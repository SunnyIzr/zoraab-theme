$(document).ready(function(){
  BlogController.init()
  $('#blogHero').image(BlogModel.heroUrl(), function(){
    $('#blogHero').addClass('hero-blog-reveal')
  })
})

var BlogController = {
  init: function(){
    this.prevewHover()
    this.popBlogs()
  }, 
  prevewHover: function(){
    // $(document).on('hover','.blog-preview',function(){
    //   $(this).find('.preview-text').addClass('preview-text-hover')
    // }, function(){
    //   $(this).find('.preview-text').removeClass('preview-text-hover')
    // })
    $(document).on('mouseover','.blog-preview',function(){
      $(this).find('.preview-text').addClass('preview-text-hover')
    }).on('mouseout',function(){
      $(this).find('.preview-text').removeClass('preview-text-hover')
    })
  },
  popBlogs: function(){
    blogs = BlogModel.getBlogs()
  }
}

var BlogModel = {
  heroUrl: function(){
    return $('.blog-hero')[0].src
  },
  getBlogs: function(){
    url = "http://zoraab.herokuapp.com/blogs"
    $.getJSON(url,function(res){
      $.each(res,function(idx,blog){
        BlogView.addBlog(blog)
        // $('.blog-preview').last().addClass('blog-preview-revealed')
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
  }
}