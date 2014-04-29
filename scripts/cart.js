$(function() {
  if ($('#cart')[0].innerText == " CART (0) ")
  {
  	$('#co').addClass("empty-cart");
  	$('#co').removeClass("button-co");
  }

  $(".remove-button").click(function(e){
  	e.preventDefault();
  	var url = $(this).parent()[0].href
  	$.get(url)
  	$(this).parent().parent().remove()
  	$.getJSON("/cart.js",function(response){ 
  		var item_count = response.item_count
  		$('#item-count')[0].innerText = item_count

  	});

  });

});