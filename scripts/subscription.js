SubscriptionController = {
  init: function(){
    this.activateFullForm()
    this.singlePlanSelect()
    this.launchSubForm()
    this.finalSockQuestion()
    this.giftChecked();
    this.sockPlanChecked();
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
  finalSockQuestion: function(){
    $('input[name="q6"]').change(function(e){
      $('.checkout-sub-btn a').addClass('active')
    })
  },
  giftChecked: function(){
    $('input[name="q3"]').change(function(e){
      if ( $('#q3b').is(':checked') ){
        $(this).parent().parent().parent().addClass('gifted')
      }
    })
  },
  sockPlanChecked: function(){
    $('input[name="q5"]').change(function(e){
      $('.quantity-question .active').removeClass('active')
      $(this).parent().addClass('active')
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
    $(form).addClass('active')
  }
}