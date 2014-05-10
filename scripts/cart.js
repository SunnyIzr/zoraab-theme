$(function() {
  
  $('.button-ks').click(function(e){
    e.preventDefault();
    Foundation.libs.offcanvas.click_toggle_class(e,'move-left')
  })
  
  $(document).on('click', '.empty-cart', function(e){
    e.preventDefault();
  })
  
  $(document).on('click','.quantity', function(e){
    e.preventDefault();
  })
  
  $(document).on('mouseenter', '.empty-cart', function(e){
    $('#co').tooltip('show')
  })
    
  $(document).on('mouseleave', '.empty-cart', function(e){
    $('#co').tooltip('hide')
  })
      
  if ($('#cart')[0].innerText == " CART (0) ")
  {
    $('#co').addClass("empty-cart");
    $('#co').removeClass("button-co");
  }
  
  $(document).on('click','.plus-btn', function(e){
    e.preventDefault();
    qtyEl = $(this).parent().find('.quantity')
    newQty = parseInt(qtyEl.val()) + 1
    qtyEl.val(newQty)
    $.post("/cart/change.js","quantity="+(newQty)+"&id="+qtyEl[0].id,function(response){
      updatePricing();
    },"json")
  })
  
  $(document).on('click','.minus-btn', function(e){
    e.preventDefault();
    qtyEl = $(this).parent().find('.quantity')
    newQty = parseInt(qtyEl.val()) - 1
    qtyEl.val(newQty)
    if (newQty == 0){
        $(this).parent().parent().parent().find('.remove-button').click()
        updatePricing()
      }
      else{
        $.post("/cart/change.js","quantity="+newQty+"&id="+qtyEl[0].id,function(response){
            updatePricing();
          },"json")
      }
  })


  $(document).on('click', '.remove-button', function(e){
    e.preventDefault();
    Foundation.libs.offcanvas.click_toggle_class(e,'move-left')
    var url = this.href
    $(this).parent().parent().remove()
    $.get(url,function(r){
      $.getJSON("/cart.js",function(response){ 
        var item_count = response.item_count
        for(var i =0;i<$('.item-count').length;i++){
          $('.item-count')[i].innerText = item_count
        }
        if (item_count == 0){
          $("#co").removeClass("button-co")
          $("#co").addClass("empty-cart")
          $('#price-container')[0].innerHTML = ""
          $('.empty-cart-message')[0].innerHTML = "<h2>Your cart is empty</h2>"
        }
        else {
          updatePricing()
        }
      }, "json");
      changeLineNumbers()  
    })
  });

  $('.add').click(function(e){
    $(this).closest('.modal').modal('hide')
    var itemId = parseInt($(this).parent().find('.product-select').val())
    var newQty = $(this).parent().parent().find('.product-quantity').val()
    $.getJSON("/cart.js",function(response){
      var itemArray = response.items
      var idArray = []
      $.each(itemArray, function(index,value){
        idArray.push(value.id)
      })
      var value = $.inArray(itemId,idArray)
      if (value != -1){
        var quantity = itemArray[value].quantity
        var totalNewQty = quantity + parseInt(newQty)
        $.post("/cart/change.js","quantity="+totalNewQty+"&id="+itemId,function(response){
          updatePricing()
        },'json')
      }
      else{ 
        $.post("/cart/add.js",{id: itemId, quantity: newQty},function(response){
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
  });

  $(document).on('keypress','.update',function (e) {
    if (e.which == 13) {
      $(this).blur()
      e.preventDefault();
      if (e.currentTarget.value == 0){
        $(this).parent().parent().parent().find('.remove-button').click()
        updateItemCounts("update")
        updatePricing()
      }
      else{
        $.post("/cart/change.js","quantity="+(e.currentTarget.value)+"&id="+e.currentTarget.id,function(response){
            updatePricing();
          },"json")
      }
      
    }
  });

  function addPricingToCart(){

    $('#price-container')[0].innerHTML =
      "<div id='pricing'>
        <table style='width:300px'>
          <tr>
            <td class='header left'>TOTAL </td>
            <td class='number price total-price header right'></td> 
          </tr>
          <tr>
            <td class='left'>
              <span class='number item-count'>1</span> ITEMS
            </td>
            <td class='number total-price right'>
            </td>
          </tr>
          <tr>  
            <td class='left'>SHIPPING</td> 
            <td class='right'>FREE</td>
          </tr>
        </table>
      </div>
      <h3 id='ship'>Free shipping in the US and Canada.</h3>"
  
    
    $("#co").removeClass("empty-cart")
    $("#co").addClass("button-co")
  }

  function addItemToCart(item){
    var img = item.image
    var price = "$"+(item.price/100).toFixed(2)
    var title = item.title
    var url = item.url
    var qty = item.quantity
    $('#container').prepend(
    "<div class='line-items'>
      <div><a href='/cart/change?line="+1+"&quantity=0' class='remove-button close-button svg-close-icon'>"+closeButton+"</a></div>
      <div class='img-wrapper'><a href="+item.url+">  
        <img class='img-responsive' src="+img+" alt= title />
      </a></div>
      <div class='product-details'>
      <a class='prod-title' href='"+url+"'>"+title+"</a>
      <span class='qty'>
      <span class='number price-item'>"+price+"</span>
      <span class='times'>x</span>
      QTY <input name='updates[]'' class='quantity number update' id='"+item.id+"'' value="+qty+" />
      <span class='plus-btn btn btn-primary'>+</span>
      <span class='minus-btn btn btn-primary'>-</span>
      </span>
      <span class='subtotal'>
      <span class='text'>SUBTOTAL</span>
      <span class='number amt price'>"+item.line_price+"</span>
      </span></div>
    </div>"
    )
    changeLineNumbers();
  }

  function updatePricing(){
    $.getJSON("/cart.js",function(response){
      var totalPrice = response.total_price
      var itemCount = response.item_count
      var items = response.items
      $('.item-count').html(itemCount)
      $(".total-price").html("$"+(totalPrice/100)+".00")
      $.each(items,function(index,value){
        $('#'+value.id).parent().parent().parent().find('.amt').html('$'+((value.line_price/100).toFixed(2)))
        $('#'+value.id).val(value.quantity)
      })
      
    },"json")
  }

  function changeLineNumbers(){
    $.each($('.line-items'),function(index, value){
      value.children[0].href="/cart/change?line="+(index+1)+"&quantity=0"
    })
  }

});

var closeButton = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
<path fill="#404041" d="M51.311,51.315L71.426,31.13c0.361-0.363,0.361-0.951-0.004-1.313c-0.363-0.359-0.951-0.363-1.313,0.004  L50,50L29.891,29.821c-0.363-0.366-0.95-0.363-1.313-0.004c-0.365,0.363-0.365,0.95-0.004,1.313l20.115,20.185L28.574,71.501  c-0.361,0.363-0.361,0.951,0.004,1.313c0.181,0.18,0.417,0.27,0.655,0.27c0.238,0,0.477-0.091,0.658-0.274L50,52.631L70.109,72.81  c0.181,0.183,0.421,0.274,0.658,0.274c0.238,0,0.473-0.091,0.655-0.27c0.365-0.363,0.365-0.95,0.004-1.313L51.311,51.315z"/>
</svg>'
