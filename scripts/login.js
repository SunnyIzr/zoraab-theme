$(document).ready(function(){
  switchAcctForm()
  hoverAccountNetworkHat()
  hoverOffAccountDropdown()
  removeDropownOffHover()
  if ($('#passwordErrors').size() > 0) {
    $('.single-account-form').hide()
    $('#recover-password').show()
  }
  if ($('.success').size() > 0) {
    $('.single-account-form').hide()
    $('.instructions').hide()
    $('#recover-password').show()
  }
})

var switchAcctForm = function(){
  $('.switch-account-form').click(function(e){
    e.preventDefault()
    $('.single-account-form').hide()
    $($(this).data('target')).show()
  })
}

var hoverAccountNetworkHat = function(){
  $('.account-network-hat').hover(function(){
    $('.account-dropdown').show()
  }, function(){
    $('.account-dropdown')
  })
}

var hoverOffAccountDropdown = function(){
  $('.account-dropdown').hover(function(){
    $('.account-dropdown').show()
  },function(){
    $('.account-dropdown').hide()
  })
}

var removeDropownOffHover = function(){
  $('.network_hat').hover(function(){
    $('.account-dropdown').hide()
  })
}