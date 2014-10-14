var AccountController = {
  init: function(){
    this.editAccountInfo()
    this.dataSubmit()
  },
  editAccountInfo: function(){
    $('.edit-data').click(function(){
      fields = $(this).data('input')
      console.log(fields)
      submit = $(this).data('submit')
      AccountView.makeDataEditable(fields,submit)
    })
  },
  dataSubmit: function(){
    $('.data-submit').click(function(e){
      e.preventDefault();
      AccountModel.updateShopifyData(this)
    })
  }
}

var AccountModel = {
  shopifyId: function(){
    return $('#customerId').html()
  },
  updateShopifyData: function(submitTag){
    data = $(submitTag).parent().serializeArray()
    url = 'https://zoraab.herokuapp.com/update_shopify_customer'
    $.post(url,{id: AccountModel.shopifyId, updates: data}, function(res){
    }).success(function(){
      location.reload()
    })
  }
}

var AccountView = {
  makeDataEditable: function(fields){
    $.each($('.'+fields),function(k,v){
      originalValue = $(v).html()
      paramName = $(v).data('name')
      if (paramName == 'address[phone]') {
        originalValue = originalValue.replace('(','').replace(') ','').replace('-','')
      }
      $(v).html("<input type='text' name='" + paramName + "' class='form-control' value='" + originalValue + "'>")     
    })
    $('.'+submit).show()
  }
}