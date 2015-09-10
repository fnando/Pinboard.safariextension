(function(){
  if (window.top !== window) {
    return;
  }

  function getDescription() {
    var description = window.getSelection() + '';

    if (!description) {
      var element = document.querySelector('meta[name=description], meta[itemprop=description], meta[property="og:description"]');
      description = (element && element.content);
    }

    return description || '';
  }

  function buildUrl() {
    var url = [
      'https://pinboard.in/add?next=same',
      'url=' + encodeURIComponent(location.href),
      'title=' + encodeURIComponent(document.title || ''),
      'description=' + encodeURIComponent(getDescription())
    ].join('&');

    safari.self.tab.dispatchMessage('redirect', [url]);
  }

  safari.self.addEventListener('message', function(event) {
    buildUrl();
  }, false);

  window.addEventListener('keydown', function(event) {
    var trigger = event.shiftKey && event.metaKey && event.which === 80; // cmd-shift-P

    if (trigger) {
      buildUrl();
    }
  }, false);
})();
