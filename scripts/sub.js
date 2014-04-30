$(document).ready(function(){
  stepOneComplete()
  recipientComplete()
  stepTwoComplete()
  stepThreeComplete()
  stepFourComplete()
  upfrontMonths()
  styleHover()
  subFormSubmission()
})

var stepOneComplete = function(){
  $( "input[class='recipients']" ).change(function(){
    if ($('#me').is(':checked')) {
      $($('.status')[0]).html('<i class="fa fa-check"></i>')
      $('#stepOne').collapse('hide')
      $('#stepTwo').collapse('show')
      if ($('#giftForm').hasClass('in')) {
        $('#giftForm').collapse('hide')
      }
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
  $( "input[class='style']" ).change(function(){
    $($('.status')[1]).html('<i class="fa fa-check"></i>')   
  })
}
var stepThreeComplete = function(){
  $( "input[class='qty']" ).change(function(){
    $($('.status')[2]).html('<i class="fa fa-check"></i>')
    $('#stepThree').collapse('hide')
    $('#stepFour').collapse('show')
  })
}
var stepFourComplete = function(){
  $( "input[class='payment']" ).change(function(){
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
  $( "input[class='upfront_months']" ).change(function(){
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

var subFormSubmission = function() {
  $('#subform').submit(function(e){
    url = $('#subform').attr('action')
    data = $('#subform').serialize()
    e.preventDefault();
    $.post(url, data, function(res) {
      window.location=res.url 
    })
  })
}






