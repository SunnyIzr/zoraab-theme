var AccountController = {
  init: function(){
    this.editAccountInfo()
    this.editContactInfo()
    this.editAddressInfo()
  },
  editAccountInfo: function(){
    $('.edit-account').click(function(){
      AccountView.makeAccountEditable()
    })
  },
  editContactInfo: function(){
    $('.edit-contact').click(function(){
      AccountView.makeContactEditable()
    })
  },
  editAddressInfo: function(){
    $('.edit-address').click(function(){
      AccountView.makeAddressEditable()
    })
  }
}

var AccountModel = {
  
}

var AccountView = {
  makeAccountEditable: function(){
    $('.account-editable').html("<input type='text' class='form-control'>")
  },
  makeContactEditable: function(){
    $('.contact-editable').html("<input type='text' class='form-control'>")
  },
  makeAddressEditable: function(){
    $('.address-editable').html("<input type='text' class='form-control'>")
  }
}