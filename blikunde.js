
['autophill.js', 'setDomeneWsFalseValues.js'].forEach(function(resource) {
  var s = document.createElement('script');
  s.src = chrome.extension.getURL(resource);
  s.onload = function() {this.parentNode.removeChild(this);};
  (document.head||document.documentElement).appendChild(s);
});
