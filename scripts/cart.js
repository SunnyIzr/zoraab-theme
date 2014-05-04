$(function() {
  if ($('#cart')[0].innerText == " CART (0) ")
  {
  	$('#co').addClass("empty-cart");
  	$('#co').removeClass("button-co");
  }

  $(document).on('click', '.remove-button', function(e){
  	e.preventDefault();
  	var url = $(this).parent()[0].href
    $(this).parent().parent().remove()
    $.get(url,function(r){
      $.getJSON("/cart.js",function(response){ 
        var item_count = response.item_count
        for(var i =0;i<$('.item-count').length;i++){
          $('.item-count')[i].innerText = item_count
        }
        console.log(item_count)
        if (item_count == 0){
          $("#co").removeClass("button-co")
          $("#co").addClass("empty-cart")
          $('#price-container')[0].innerHTML = ""
          $('.empty-cart-message')[0].innerHTML = "<h2 >Your cart is empty</h2>"
        }
        else {
          updatePricing()
        }
      }, "json");
      changeLineNumbers()  
    })
  });

  $('#add').click(function(e){
    var itemId = parseInt($('#product-select')[0].children[0].value)
    $.getJSON("/cart.js",function(response){
      var itemArray = response.items
      var idArray = []
      for(var i =0;i<itemArray.length;i++){
        idArray.push(itemArray[i].id)
      }
      var value = $.inArray(itemId,idArray)
      if (value != -1){
        var quantity = itemArray[value].quantity
        $.post("/cart/change.js","quantity="+(quantity+1)+"&id="+itemId,function(response){
          updatePricing()
        })
      }
      else{ 
        $.post("/cart/add.js",{id: itemId},function(response){
          $(".empty-cart-message").addClass("hidden")
          if (itemArray.length == 0){
            console.log(response)
            addPricingToCart()
          }
          addItemToCart(response)
          updatePricing()
        }, "json");
      }
    })
    updateItemCounts("add")
  });

  $('.update').keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      if (e.currentTarget.value == 0){
        $('.remove-button').click()
        updateItemCounts("update")
        updatePricing()
      }
      else{
        $.post("/cart/change.js","quantity="+(e.currentTarget.value)+"&id="+e.currentTarget.id,function(response){
            updateItemCounts("update");updatePricing();
          },"json")
      }
      
    }
  });

  function addPricingToCart(){

    $('#price-container')[0].innerHTML =
      "<div id='pricing'>
        <table style='width:300px'>
          <tr>
            <td class='spacing-left'>TOTAL </td>
            <td id='price'class='spacing-right'>
            {{ cart.total_price | money }}
            </td> 
          </tr>
          <tr>
            <td class='spacing-left'><span class='item-count'>
              1</span> ITEMS
            </td>
          </tr>
          <tr>  
            <td class='spacing-left'>SHIPPING | FREE</td> 
            <td class='spacing-right'>FREE</td>
          </tr>
        </table>
      </div>
      <h3 id='ship'>Free shipping in the US.</h3>"
    
    $("#co").removeClass("empty-cart")
    $("#co").addClass("button-co")
  }

  function addItemToCart(item){
    var img = item.image
    var price = "$ "+(item.price/100).toFixed(2)
    var title = item.title
    var url = item.url
    $('#container').prepend(
    "<div class='line-items'>
      <a href='/cart/change?line="+1+"&quantity=0'><span class='remove-button glyphicon glyphicon-remove' style='color: #8E9292;display: block;float: right;''></span></a>
      <a href="+item.url+">  
        <img class='prod-img' src="+img+" alt= title />
      </a>
      <span class='qty'>QTY <input name='updates[]' class='update' value='1' /><span>
      <a class='prod-title' href="+url+">"+ title +"</a>
      <span class='item-price'>"+ price +"</span>
    </div>"
    )
    changeLineNumbers();
  }

  function updateItemCounts(type){
    var arr = $('.item-count')
    if (type == "add"){
      for(var i=0;i<arr.length;i++){
        arr[i].innerText = (parseInt(arr[i].innerText) + 1)
      }
    }
    else if (type == "update"){
      $.getJSON("/cart.js",function(response){
        var itemCount = (response.item_count)
        for(var i=0;i<arr.length;i++){
          arr[i].innerText = itemCount
        }     
      })
    }
  }

  function updatePricing(){
    $.getJSON("/cart.js",function(response){
      var price = response.total_price
      $("#price")[0].innerText = "$ "+(price/100)+".00"
    },"json")
  }

  function changeLineNumbers(){
    $.each($('.line-items'),function(index, value){
      value.children[0].href="/cart/change?line="+(index+1)+"&quantity=0"
    })
  }

});
