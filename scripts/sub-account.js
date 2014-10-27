var SubAccountController = {
  init: function(){
    SubAccountModel.getSubData()
  }
}

var SubAccountModel = {
  subInfo: {},
  getSubData: function(){
    if ($('#customerId').size() > 0){
      url = 'http://zoraab.herokuapp.com/shopify-sub-data/' + AccountModel.shopifyId()
      $.getJSON(url,function(res){
        SubAccountModel.subInfo = res
      }).done(function(){
        SubAccountView.populateData()
        SubAccountView.populateOrders()
        clearLoader();
      })  
    }
  },
  shopifyImgUrl: function(sku){
  }
}

var SubAccountView = {
  populateData: function(){
    data = SubAccountModel.subInfo
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    startDate = new Date(data.cid.start_date)
    nextDate = new Date(data.cid.next_pmt_date)
    cid = data.sub.cid
    $('.planInfo').html(data.cid.plan);
    $('#startDate').html(monthNames[startDate.getMonth()] +' '+startDate.getDate()+', '+startDate.getFullYear());
    $('#nextDate').html(monthNames[nextDate.getMonth()] +' '+nextDate.getDate()+', '+nextDate.getFullYear())
    mailUrl = 'mailto:zoraabkit@zoraab.com?subject=Inquiry%20Regarding%20Subscription%20' + cid
    $('.bottom-section a').attr('href',mailUrl)
  },
  populateOrders: function(){
    orders = SubAccountModel.subInfo.orders
    lastStatus = orders.last_order.status
    if (lastStatus == undefined) {
      $('.last-month > ul').remove()
      $('.last-month > .sub-order-wrapper > .no-order').show()
      $('.last-month > .status > span').html('Not Ready')
    } else{
      if (lastStatus == "Never Sent to Shipstation"){
        lastStatus = 'Pending'
      }
      $('.this-month > .status > span').html(lastStatus)
      $.each(orders.last_order.skus,function(k,sku){
        url = '/products/' + sku + '.js'
        $.getJSON(url,function(res){}).success(function(res){
          imgLink = res.images[0]
          link = res.url
          $('.this-month > .sub-order-wrapper > ul').append('<li><a href="'+ link +'" target="_blank"><img src="' + imgLink + '"></a></li>')
        }).fail(function(){
          imgLink = $('#fallbackImg').html()
          $('.this-month > .sub-order-wrapper > ul').append('<li> <img src="' + imgLink + '"> </li>')
        })
      })
    }
    
    nextStatus = orders.next_order.status
    if (nextStatus == undefined) {
      $('.next-month > ul').remove()
      $('.next-month > .sub-order-wrapper > .no-order').show()
      $('.next-month > .status > span').html('Not Ready')
    } else {
      if (nextStatus == "Never Sent to Shipstation"){
        nextStatus = 'Pending'
      }
      $('.next-month > .status > span').html(nextStatus)
      $.each(orders.next_order.skus,function(k,sku){
        url = '/products/' + sku + '.js'
        $.getJSON(url,function(res){}).success(function(res){
          imgLink = res.images[0]
          link = res.url
          $('.next-month > .sub-order-wrapper > ul').append('<li><a href="'+ link +'" target="_blank"><img src="' + imgLink + '"></a></li>')
        }).fail(function(){
          imgLink = $('#fallbackImg').html()
          $('.next-month > .sub-order-wrapper > ul').append('<li> <img src="' + imgLink + '"> </li>')
        })
      })
    }
  }
}