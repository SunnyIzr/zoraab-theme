$(document).ready(function(){
  loadBarOnLoad()
  // loadPopupOnLoad()
  // closeModalBtn();
})


var loadBarOnLoad = function(){
  setTimeout(function(){
    if ( getCookie('zoraabpopup') != 'true') {
      loadNotificationBar()
    }
  }, 3500)
}

var loadPopupOnLoad = function(){
  setTimeout(function(){
    if ( getCookie('zoraabpopup') != 'true' ) {
      revealSaleModal()
      
    }
  }, 750)
}

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
  
  //create cookie
  setCookie()
}

var revealSaleModal = function(){
  $('#hiddenModalBtn').click()
  //create cookie
  setCookie()
}

var closeModalBtn = function(){
  $('#closeModalBtn').click(function(e){
    e.preventDefault();
    $('.md-show').removeClass('md-show')
  })
}

var setCookie = function(){
  var now = new Date();
  var time = now.getTime();
  time += 18000 * 1000;
  // time += 120 * 1000
  now.setTime(time);
  console.log("zoraabpopup=true; " + now.toUTCString() + ";")
  document.cookie = "zoraabpopup=true; expires=" + now.toUTCString() + "; path=/"
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}