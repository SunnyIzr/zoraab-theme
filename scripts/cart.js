$(function() {
  if ($('#cart')[0].innerText == " CART (0) ")
  {
  	$('#co').addClass("empty-cart");
  	$('#co').removeClass("button-co");
  }

  $(document).on('click', '.remove-button', function(e){
  	e.preventDefault();
  	var url = $(this).parent()[0].href
  	$.get(url)
  	$(this).parent().parent().remove()
  	$.getJSON("/cart.js",function(response){ 
  		var item_count = response.item_count
  		$('#item-count')[0].innerText = item_count

  	});
    changeLineNumbers();
  });

  $('#add').click(function(e){
    $.post("/cart/add.js",{id: $('#product-select')[0].children[0].value},function(response){
      $(".empty-cart-message").addClass("hidden")
      var lineNumber = $('.line-items').size() + 1
      addItemToCart(response); 
      var item_count = response.quantity
      $('#item-count')[0].innerText += item_count
    }, "json");
  });

  function addItemToCart(item){
    var img = item.image
    var price = "$"+(item.price/100).toFixed(2)
    var title = item.title
    var url = item.url
    $('#container').prepend(
    "<div class='line-items'>
      <a href='/cart/change?line="+1+"&quantity=0'><span class='remove-button glyphicon glyphicon-remove' style='color: #8E9292;display: block;float: right;''></span></a>
      <a href="+item.url+">  
        <img class='prod-img' src="+img+" alt= title />
      </a>
      <span class='qty'>QTY 1<span>
      <a class='prod-title' href="+url+">"+ title +"</a>
      <span class='item-price'>"+ price +"</span>
    </div>"
    )
    changeLineNumbers();
  }

  function changeLineNumbers(){
    $.each($('.line-items'),function(index, value){
      value.children[0].href="/cart/change?line="+(index+1)+"&quantity=0"
    })
  }
});
