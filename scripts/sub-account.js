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
        clearLoader();
      })  
    }
  }
}

var SubAccountView = {
  populateData: function(){
    data = SubAccountModel.subInfo
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    startDate = new Date(data.cid.start_date)
    nextDate = new Date(data.cid.next_pmt_date)
    cid = data.sub.cid
    $('#planInfo').html(data.cid.plan);
    $('#startDate').html(monthNames[startDate.getMonth()] +' '+startDate.getDate()+', '+startDate.getFullYear());
    $('#nextDate').html(monthNames[nextDate.getMonth()] +' '+nextDate.getDate()+', '+nextDate.getFullYear())
    mailUrl = 'mailto:zoraabkit@zoraab.com?subject=Inquiry%20Regarding%20Subscription%20' + cid
    $('.bottom-section a').attr('href',mailUrl)
  }
}