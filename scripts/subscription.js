SubscriptionController = {
  init: function(){
    this.activateFullForm()
    this.singlePlanSelect()
    this.launchSubForm()
  },
  activateFullForm: function(){
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