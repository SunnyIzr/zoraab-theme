$(document).ready(function(){
  seeMoreDetails();
  hideMoreDetails();
  closeModalBtn();
  // loadBarOnLoad()
  // saleLinkToBar();
  // loadPopupOnLoad()
  saleLinkToPopUp();
})


var loadBarOnLoad = function(){
  setTimeout(function(){
    if ( getCookie('zoraabpopup') != 'true') {
      loadNotificationBar()
    }
  }, 3500)
}

var saleLinkToBar = function(){
  $('.sale-nav-link').click(function(e){
    e.preventDefault();
    if ($('.ns-box').size() == 0) {
      loadNotificationBar();
    }
  })
}

var saleLinkToPopUp = function(){
  $('.sale-nav-link').click(function(e){
    e.preventDefault();
    revealSaleModal();
  })
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
    message : $('#saleBar').html(),
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

var seeMoreDetails = function(){
  $(document).on('click','.show-more-details', function(e){
    e.preventDefault();
    myEl = $(this).parent().parent()
    myEl.html('')
    myEl.append($('#addlDetails').html())
  })
}

var hideMoreDetails = function(){
  $(document).on('click','.hide-more-details', function(e){
    e.preventDefault();
    myEl = $(this).parent().parent().parent()
    myEl.html('')
    myEl.html($('#saleBarHeadline').html())
  })
}