var AccountController = {
  init: function(){
    this.editAccountInfo()
    this.dataSubmit()
    this.generateGravatar()
    this.activateResponsiveTab()
    TabLinks.setTabActive();
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
  },
  generateGravatar: function(){
    if ($('#customerEmail').size() > 0){
      AccountView.appendGravatarImg(AccountModel.emailAddress())
    }
  },
  activateResponsiveTab: function(){
    if ($('.account').size() > 0){
      fakewaffle.responsiveTabs()
    }
  }
}

var AccountModel = {
  shopifyId: function(){
    return $('#customerId').html()
  },
  emailAddress: function(){
    return $('#customerEmail').html()
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
  },
  appendGravatarImg: function(email){
    url = 'http://zoraab.herokuapp.com/gravatar-info'
    $.getJSON(url,{email: email}, function(res){
      $('#gravatarImg').image(res.img,function(){
        
      })
    })
  }
}

var TabLinks = {
  removeAllActive: function(){
    $('#accountNav').find('li').removeClass('active')  
  },
  setTabActive: function(){
    $('.tab-switch').click(function(){
      TabLinks.removeAllActive()
      target = '#' + this.href.split('#')[1]
      newTab = $("#accountNav").find('li a[href="' + target + '"]')
      $(newTab).parent().addClass('active')
    })
  }
}


















  
  
  
  
