$(document).ready(function(){
  setTimeout(function(){
    // loadNotificationBar()
        revealSaleModal()
  }, 500)
  closeModalBtn();
})

var loadNotificationBar = function(){
  // create the notification
  window.notification = new NotificationFx({
    message : '<p>Save money on your purchases. Shop now. <a href="#">See details.</a></p>',
    layout : 'bar',
    effect : 'slidetop',
    type : 'notice', // notice, warning or error
    onClose : function() {
      bttn.disabled = false;
    }
  });

  // show the notification
  notification.show();
  $('.normal-body').addClass('show')
}

var revealSaleModal = function(){
  $('#hiddenModalBtn').click()
}

var closeModalBtn = function(){
  $('#closeModalBtn').click(function(e){
    e.preventDefault();
    $('.md-show').removeClass('md-show')
  })
}