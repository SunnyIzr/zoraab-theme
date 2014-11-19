SubscriptionController = {
  init: function(){
    this.activateFullForm()
    this.singlePlanSelect()
    this.launchSubForm()
    this.giftChecked();
    this.sockPlanChecked();
    this.subFreqOptChecked();
    this.subTermChecked();
    this.closeForm();
    this.updateUpfronts();
  },
  activateFullForm: function(){
    if ($('.featured-sub-products').size() > 0) {
     (function() {
        var formWrap = document.getElementById( 'fs-form-wrap' );

        [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {  
          new SelectFx( el, {
            stickyPlaceholder: false,
            onChange: function(val){
              document.querySelector('span.cs-placeholder').style.backgroundColor = val;
            }
          });
        } );

        new FForm( formWrap, {
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
      SubscriptionView.selectPlan(this)
      SubscriptionModel.planSelection = $(this).data('target')
    })
  },
  launchSubForm: function(){
    $('.launch-sub-form').click(function(e){
      e.preventDefault();
      SubscriptionView.revealForm(SubscriptionModel.planSelection)
    })
  },
  giftChecked: function(){
    $('input[name="q3"]').change(function(e){
      if ( $('#q3b').is(':checked') ){
        $(this).parent().parent().parent().addClass('gifted')
      } else{
        $(this).parent().parent().parent().removeClass('gifted')
      }
    })
  },
  sockPlanChecked: function(){
    $('input[name="sockNum"]').change(function(e){
      $('.quantity-question .active').removeClass('active')
      $(this).parent().addClass('active')
    })
  },
  subFreqOptChecked: function(){
    $('input[name="payment"]').change(function(e){
      if ( $('#once').is(':checked') ){
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
    $('input[name="sockNum"]').change(function(){
      sockPlan = parseInt($('input[name="sockNum"]:checked').val())
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
  }
}

SubscriptionModel = {
  planSelection: null
  
}

SubscriptionView = {
  selectPlan: function(el){
    $('li.active').removeClass('active')
    $(el).addClass('active')
    $('.launch-sub-form').addClass('active')
  },
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
  },
  getSubName: function(){
    firstName = $('#q1').val().split(' ')[0]
    $('.subscriberName').html(firstName)
  },
  getStyles: function(){
    $.each($('input[name="style[]"]:checked'),function(k,v){
      style = $(v).val()
      $('#summ'+style).removeClass('hide')
    })
  },
  getSockPlan: function(){
    sockPlan = $('input[name="sockNum"]:checked').val()
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
    sockPlan = parseInt($('input[name="sockNum"]:checked').val())
    if (sockPlan == 2) { $('.finalPrice').html(20)}
    if (sockPlan == 3) { $('.finalPrice').html(29)}
    if (sockPlan == 5) { $('.finalPrice').html(45)}
  },
  updateSubTerm: function(){
    term = $('input[name="term"]:checked').val()
    if (term == '3months') {$('.num-of-months').html('3 months')}
    if (term == '9months') {$('.num-of-months').html('9 months')}
    if (term == '1year') {$('.num-of-months').html('1 year')}
  },
  calcUpfrontPrice: function(){
    sockPlan = parseInt($('input[name="sockNum"]:checked').val())
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
  },
  hideLastContinueBtn: function(){
    $('.fs-continue').click(function(e){
      if ( $('.order-summary-page').css('visibility') == 'visible') {
        $('.fs-controls').hide();
      }
    })
  },
}












