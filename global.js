(function(){
  // ignore iframes.
  if (window.top !== window) {
    return;
  }

  if (!safari.application) {
    return;
  }

  safari.application.addEventListener('command', function(event) {
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('buildUrl');
  }, false);

  safari.application.addEventListener('message', function(event) {
    console.log(event);
    safari.application.activeBrowserWindow.activeTab.url = event.message[0];
  }, false);
})();
