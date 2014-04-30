$(document).ready(function(){
  stepOneComplete()
  recipientComplete()
  stepTwoComplete()
  stepThreeComplete()
  stepFourComplete()
  upfrontMonths()
  styleHover()
})

var stepOneComplete = function(){
  $( "input[name='recipients']" ).change(function(){
    if ($('#me').is(':checked')) {
      $($('.status')[0]).html('<i class="fa fa-check"></i>')
      $('#stepOne').collapse('hide')
      $('#stepTwo').collapse('show')
      $('#giftForm').collapse('hide')
    }
    if ($('#gift').is(':checked')) {
      $($('.status')[0]).html('')
      $('#giftForm').collapse('show')
    }
  })
}

var recipientComplete = function(){
  $( "input[name='recipient_name']" ).change(function(){
    if ($('#recipient_name').val().length > 0) {
      $($('.status')[0]).html('<i class="fa fa-check"></i>')
    }
  })
}
var stepTwoComplete = function(){
  $( "input[name='style']" ).change(function(){
    $($('.status')[1]).html('<i class="fa fa-check"></i>')   
  })
}
var stepThreeComplete = function(){
  $( "input[name='qty']" ).change(function(){
    $($('.status')[2]).html('<i class="fa fa-check"></i>')
    $('#stepThree').collapse('hide')
    $('#stepFour').collapse('show')
  })
}
var stepFourComplete = function(){
  $( "input[name='payment']" ).change(function(){
    if ($('#monthly').is(':checked')) {
      $($('.status')[3]).html('<i class="fa fa-check"></i>')
      $('#stepFour').collapse('hide')
      submitBtnComplete()
    } if ($('#once').is(':checked')) {
      $($('.status')[3]).html('')
      $( "input[type='submit']" ).removeClass('submit')
      $('#upfrontForm').collapse('show')
    }
  })
}

var upfrontMonths = function(){
  $( "input[name='upfront_months']" ).change(function(){
    $($('.status')[3]).html('<i class="fa fa-check"></i>')
    $('#stepFour').collapse('hide')
    submitBtnComplete()
  })
}

var submitBtnComplete = function(){
  $( "input[type='submit']" ).addClass('submit')
}

var styleHover = function() {
  $('.style-pic').hover(function(event){
    $(this).children('.style-desc').css('opacity','1.0')
  }, function(event){
    $(this).children('.style-desc').css('opacity','0.0')
  })
}