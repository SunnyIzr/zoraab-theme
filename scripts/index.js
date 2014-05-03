$(document).ready(function(){
  panelHoverEffect()
})


var panelHoverEffect = function(){
  $('.linked-panel').hover(function(){
    $(this).find('p').attr('color','#67c5a9');
    $(this).find('path').attr('fill','#67c5a9');
  }, function(){
    $(this).find('p').attr('color','#404041');
    $(this).find('path').attr('fill','#b8b8b8');
  })
}