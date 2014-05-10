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
    valdiateCompleteForm()
    $('#one-alert').alert('close')
    if ($('#me').is(':checked')) {
      $($('.status')[0]).addClass('status-complete')
      $('#stepOne').collapse('hide')
      $('#stepTwo').collapse('show')
      if ($('#giftForm').hasClass('in')) {
        $('#giftForm').collapse('hide')
      }
    }
    if ($('#gift').is(':checked')) {
      $($('.status')[0]).removeClass('status-complete')
      $('#giftForm').collapse('show')
    }
  })
}

var recipientComplete = function(){
  $( "input[name='recipient_name']" ).change(function(){
    if ($('#recipient_name').val().length > 0) {
      $($('.status')[0]).addClass('status-complete')
    }
  })
}
var stepTwoComplete = function(){
  $( "input[class='style']" ).change(function(){
    valdiateCompleteForm()
    $('#two-alert').alert('close')
    $($('.status')[1]).addClass('status-complete')   
  })
}
var stepThreeComplete = function(){
  $( "input[class='qty']" ).change(function(){
    valdiateCompleteForm()
    $('#three-alert').alert('close')
    $($('.status')[2]).addClass('status-complete')
    $('#stepThree').collapse('hide')
    $('#stepFour').collapse('show')
    changeUpfrontPlanPricing()
  })
}
var stepFourComplete = function(){
  $( "input[class='payment']" ).change(function(){
    valdiateCompleteForm()
    $('#pmt-alert').alert('close')
    if ($('#monthly').is(':checked')) {
      $('#month-alert').alert('close')
      $($('.status')[3]).addClass('status-complete')
      $('#stepFour').collapse('hide')
    } if ($('#once').is(':checked')) {
      $($('.status')[3]).removeClass('status-complete')
      $( "input[type='submit']" ).removeClass('submit')
      $('#upfrontForm').collapse('show')
    }
  })
}

var upfrontMonths = function(){
  $( "input[class='upfront_months']" ).change(function(){
    $('#months-alert').alert('close')
    $($('.status')[3]).addClass('status-complete')
    $('#stepFour').collapse('hide')
    valdiateCompleteForm()
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
  $('.submit-section > input').click(function(){
    validateForm()
  })
  $('#subform').submit(function(e){
    url = $('#subform').attr('action')
    data = $('#subform').serialize()
    e.preventDefault();
    $.post(url, data, function(res) {
      window.location=res.url 
    })
  })
}

var changeUpfrontPlanPricing = function() {
    if ($('#2').is(':checked')) {
      $('.3m-price').html('$60')
      $('.6m-price').html('$120')
      $('.9m-price').html('$180')
      $('.12m-price').html('$240')
    }
    if ($('#3').is(':checked')) {
      $('.3m-price').html('$87')
      $('.6m-price').html('$174')
      $('.9m-price').html('$261')
      $('.12m-price').html('$348')
    }
    if ($('#5').is(':checked')) {
      $('.3m-price').html('$135')
      $('.6m-price').html('$270')
      $('.9m-price').html('$405')
      $('.12m-price').html('$540')
    }
  
}

var validateForm = function(){
  validateStepOne()
  validateStepTwo()
  validateStepThree()
  validateStepFour()
}

var validateStepOne = function(){
  if (!$( "input[class='recipients']" ).is(':checked')) {
    $('#one-alert').alert('close')
    $('#alerts').append("<div id='one-alert' class='alert alert-danger'>Please select a recipient.</div>")
  }
}

var validateStepTwo = function() {
  if (!$( "input[class='style']" ).is(':checked')) {
    $('#two-alert').alert('close')
    $('#alerts').append("<div id='two-alert' class='alert alert-danger'>Please select atleast ONE style attribute.</div>")
  }
}

var validateStepThree = function(){
  if (!$( "input[class='qty']" ).is(':checked')) {
    $('#three-alert').alert('close')
    $('#alerts').append("<div id='three-alert' class='alert alert-danger'>Please select a number of socks.</div>")
  }
}

var validateStepFour = function(){
  if (!$( "input[class='payment']" ).is(':checked')) {
    $('#pmt-alert').alert('close')
    $('#alerts').append("<div id='pmt-alert' class='alert alert-danger'>Please select a payment option.</div>")
  } else if ($('#once').is(':checked')) {
    if (!$( "input[class='upfront_months']" ).is(':checked')) {
      $('#months-alert').alert('close')
      $('#alerts').append("<div id='months-alert' class='alert alert-danger'>Please select number of months upfront.</div>")
    }
  } 
  
  
}

var valdiateCompleteForm = function(){
  ary = []
  ary.push($( "input[class='recipients']" ).is(':checked'))
  ary.push($( "input[class='style']" ).is(':checked'))
  ary.push($( "input[class='qty']" ).is(':checked'))
  
  if ($( "input[class='payment']" ).is(':checked')) {
    if ($('#monthly').is(':checked')) {
      ary.push(true) 
    } else {
      ary.push($( "input[class='upfront_months']" ).is(':checked'))
    }
  } else {
    ary.push(false)
  }
  if ($.inArray(false,ary) == -1) {
    submitBtnComplete()
  }
}





