SubscriptionController = {
  init: function(){
    this.activateFullForm()
    this.singlePlanSelect()
    this.giftChecked();
    this.sockPlanChecked();
    this.subFreqOptChecked();
    this.subTermChecked();
    this.closeForm();
    this.updateUpfronts();
    this.submitForm();
    this.backBtn();
  },
  activateFullForm: function(){
    if ($('.featured-sub-products').size() > 0) {
     (function() {
        var formWrap = document.getElementById( 'fs-form-wrap-socksOnly' );

        [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {  
          new SelectFx( el, {
            stickyPlaceholder: false,
            onChange: function(val){
              document.querySelector('span.cs-placeholder').style.backgroundColor = val;
            }
          });
        } );

        window.socksOnlyForm = new FForm( formWrap, {
          onReview : function() {
            classie.add( document.body, 'overview' ); // for demo purposes only
          }
        } );
      })(); 
      (function() {
        var formWrap = document.getElementById( 'fs-form-wrap-socksAndBoxers' );

        [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {  
          new SelectFx( el, {
            stickyPlaceholder: false,
            onChange: function(val){
              document.querySelector('span.cs-placeholder').style.backgroundColor = val;
            }
          });
        } );

        window.socksAndBoxersForm = new FForm( formWrap, {
          onReview : function() {
            classie.add( document.body, 'overview' ); // for demo purposes only
          }
        } );
      })();
      (function() {
        var formWrap = document.getElementById( 'fs-form-wrap-accsOnly' );

        [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {  
          new SelectFx( el, {
            stickyPlaceholder: false,
            onChange: function(val){
              document.querySelector('span.cs-placeholder').style.backgroundColor = val;
            }
          });
        } );

        window.accsOnlyForm = new FForm( formWrap, {
          onReview : function() {
            classie.add( document.body, 'overview' ); // for demo purposes only
          }
        } );
      })();
      (function() {
        var formWrap = document.getElementById( 'fs-form-wrap-starterKit' );

        [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {  
          new SelectFx( el, {
            stickyPlaceholder: false,
            onChange: function(val){
              document.querySelector('span.cs-placeholder').style.backgroundColor = val;
            }
          });
        } );

        window.starterKitForm = new FForm( formWrap, {
          onReview : function() {
            classie.add( document.body, 'overview' ); // for demo purposes only
          }
        } );
      })(); 
    }
  },
  singlePlanSelect: function(){
    $('.single-plan').click(function(e){
      e.preventDefault();
      subForm = $(this).data('target')
      SubscriptionView.revealForm(subForm)
    })
  },
  giftChecked: function(){
    $('input[name="recipient"]').change(function(e){
      if ( $(this).val() == 'gift' ){
        $(this).parent().parent().parent().addClass('gifted')
      } else{
        $(this).parent().parent().parent().removeClass('gifted')
      }
    })
  },
  sockPlanChecked: function(){
    $('input[name="qty"]').change(function(e){
      $('.quantity-question .active').removeClass('active')
      $(this).parent().addClass('active')
    })
  },
  subFreqOptChecked: function(){
    $('input[name="payment"]').change(function(e){
      if ( $(this).val() == 'once' ){
        $(this).parent().parent().parent().addClass('paying-once')
      } else{
        $(this).parent().parent().parent().removeClass('paying-once')
      }
    })
  },
  subTermChecked: function(){
    $('input[name="term"]').change(function(e){
      $('.payment-options .active').removeClass('active')
      $(this).parent().addClass('active')
    })
  },
  closeForm: function(){
    $('.close-form').click(function(e){
      e.preventDefault();
      form = $(this).data('target')
      $(form).css('transition-property','all')
      $(form).removeClass('active')
    })
  },
  updateUpfronts: function(){
    $('input[name="qty"]').change(function(){
      sockPlan = parseInt($('input[name="qty"]:checked').val())
      if ( sockPlan == 2 ) {
        $('.price-plan-3').html(60)
        $('.price-plan-9').html(180)
        $('.price-plan-1').html(240)
      }
      if ( sockPlan == 3 ) {
        $('.price-plan-3').html(87)
        $('.price-plan-9').html(261)
        $('.price-plan-1').html(348)
      }
      if ( sockPlan == 5 ) {
        $('.price-plan-3').html(135)
        $('.price-plan-9').html(405)
        $('.price-plan-1').html(540)
      }
    })
  },
  submitForm: function(){
    $('.submit-sub-form').click(function(e){
      e.preventDefault();
      console.log('running')
      $form = $($(this).data('target'))
      console.log($form)
      url = $form.attr('action')
      console.log(url)
      data = $form.serialize()
      $.post(url, data, function(res) {
        console.log('running ajax')
        window.location=res.url
      })
    })
  },
  backBtn: function(){
    $('.back-btn').click(function(e){
      e.preventDefault();
      form = window[$(this).data('target')]
      prevSection = form.current - 1
      form._nextField(prevSection)
      
    })
  }
}

SubscriptionView = {
  revealForm: function(form){
    $(form).css('transition-property','opacity')
    $(form).addClass('active')
  }
}



SubscriptionSummary = {
  popSubSummary: function(){
    this.getSubName();
    this.getStyles();
    this.getSockPlan();
    this.getPmtPlan();
    this.hideLastContinueBtn();
    this.showBackBtn();
  },
  showBackBtn: function(){
    $('.back-btn').each(function(){
      form = window[$(this).data('target')]
      if (form.current > 0){
        $(this).show()
      } else if (form.current == 0){
        $(this).hide()
      }
    })
    
  },
  getSubName: function(){
    $.each($('input[name="name"]'),function(k,v){
      firstName = $(v).val().split(' ')[0]
      $($(v).data('target')).html(firstName)
    })
  },
  getStyles: function(){
    $.each($('input[name="style[]"]:checked'),function(k,v){
      style = $(v).val()
      $('#summ'+style).removeClass('hide')
    })
  },
  getSockPlan: function(){
    sockPlan = $('input[name="qty"]:checked').val()
    $('.number-of-socks').html(sockPlan)
    sockIcon = $($('.icon-sock')[0]).clone()
    $('.acc-icons').html('')
    for (i = 0; i < parseInt(sockPlan); i++){
      $('.acc-icons').append(sockIcon.clone())
    }
    if (sockPlan == '5'){
      $('.acc-icons').addClass('plan-5')
    }
  },
  getPmtPlan: function(){
    pmtFreq = $('input[name="payment"]:checked').val()
    if (pmtFreq == 'monthly'){
      $('.monthlyPmt').removeClass('hide')
      SubscriptionSummary.calcMonthlyPrice();
    } 
    if (pmtFreq == 'once'){
      $('.upfrontPmt').removeClass('hide')
      SubscriptionSummary.updateSubTerm();
      SubscriptionSummary.calcUpfrontPrice();
    }
  },
  calcMonthlyPrice: function(){
    sockPlan = parseInt($('input[name="qty"]:checked').val())
    if (sockPlan == 2) { $('.finalPrice').html(20)}
    if (sockPlan == 3) { $('.finalPrice').html(29)}
    if (sockPlan == 5) { $('.finalPrice').html(45)}
    $('#socksAndBoxers .finalPrice').html(28)
    $('#accsOnly .finalPrice').html(28)
    $('#starterKit .finalPrice').html(14)
  },
  updateSubTerm: function(){
    term = $('input[name="term"]:checked').val()
    if (term == '3months') {$('.num-of-months').html('3 months')}
    if (term == '9months') {$('.num-of-months').html('9 months')}
    if (term == '1year') {$('.num-of-months').html('1 year')}
  },
  calcUpfrontPrice: function(){
    sockPlan = parseInt($('input[name="qty"]:checked').val())
    term = $('input[name="term"]:checked').val()
    if ( sockPlan == 2) {
      if (term == '3months') { $('.finalPrice').html(60)}
      if (term == '9months') { $('.finalPrice').html(180)}
      if (term == '1year') { $('.finalPrice').html(240)}
    }
    if ( sockPlan == 3) {
      if (term == '3months') { $('.finalPrice').html(87)}
      if (term == '9months') { $('.finalPrice').html(261)}
      if (term == '1year') { $('.finalPrice').html(348)}
    }
    if ( sockPlan == 5) {
      if (term == '3months') { $('.finalPrice').html(135)}
      if (term == '9months') { $('.finalPrice').html(405)}
      if (term == '1year') { $('.finalPrice').html(540)}
    }
    sbTerm = $('#socksAndBoxers input[name="term"]:checked').val()
    if (sbTerm == '3months') { $('#socksAndBoxers .finalPrice').html(84)}
    if (sbTerm == '9months') { $('#socksAndBoxers .finalPrice').html(252)}
    if (sbTerm == '1year') { $('#socksAndBoxers .finalPrice').html(336)}
      
    acTerm = $('#accsOnly input[name="term"]:checked').val()
    if (acTerm == '3months') { $('#accsOnly .finalPrice').html(84)}
    if (acTerm == '9months') { $('#accsOnly .finalPrice').html(252)}
    if (acTerm == '1year') { $('#accsOnly .finalPrice').html(336)}
      
    skTerm = $('#starterKit input[name="term"]:checked').val()
    if (skTerm == '3months') { $('#starterKit .finalPrice').html(42)}
    if (skTerm == '9months') { $('#starterKit .finalPrice').html(126)}
    if (skTerm == '1year') { $('#starterKit .finalPrice').html(168)}
  },
  hideLastContinueBtn: function(){
    $('.fs-continue').click(function(e){
      $.each($('.order-summary-page'),function(k,v){
        if ( $(v).css('visibility') == 'visible') {
          formEl = $(v).data('form')
          $(formEl + ' .fs-continue').hide();
        }
      })
    })
  },
}












