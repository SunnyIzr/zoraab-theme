var filter = function() {
  $('.select-filter').click(function(event){
    
    event.preventDefault();
    tags = getTags($(this))
    selectedTag = $(this).attr('id')
    url = window.location.pathname
    if (tagSelected(url,selectedTag) == true){
      newUrl = removalUrl(url,selectedTag)
    } 
    else if (filteredSelection(url,tags) == true) {
      regExpTags = new RegExp(tags.join('|'))
      newUrl = url.replace(regExpTags,selectedTag);
    }
    else if (noFilters(url)) {
      newUrl = url + '/' + selectedTag
    } 
    else {
      newUrl = url + '+' + selectedTag
    }
    window.location.href = newUrl
  })
}

var getTags = function(el) {
  ids = []
  el.parent().find('a').each(function() {ids.push(this.id)})
  return ids
}

var filteredSelection = function(url,tags){
  present = false
  $.each(tags,function(key,tag){
    if (url.search(tag) >= 0) {
      present = true
    }
  })
  return present
}

var noFilters = function(url) {
  return $(url.split('/')).last()[0] == 'mens-socks'
}

var tagSelected = function(url,tag){
      return url.search(tag) >= 0
  //Function giving a false positive for ties when bowties is selected
  if (tag == 'ties' && url.search('bowties') >= 0){
    return false
  } 
  else{
    return url.search(tag) >= 0
  }
}

var removalUrl = function(url,tag){
  if ($(url.split('/')).last()[0] == tag){
    newUrl = url.replace('/'+tag,'')
  } else if (url.search('/'+tag) >= 0){
    newUrl = url.replace(tag+'+','')
  } else {
    newUrl = url.replace('+'+tag,'')
  }
  return newUrl
}

var closeFilterOnMobile = function(){
  if ($(document).width() <= 768) {
    $('.filter-btn').click()
  }
}