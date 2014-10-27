$(document).ready(function(){
  switchAcctForm()
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