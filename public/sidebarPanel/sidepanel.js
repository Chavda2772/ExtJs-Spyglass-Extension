const mainBtn = document.getElementById('btnMainSidePanel');
const extFrameWindow = document.getElementById('extjsFrameWindow');

window.addEventListener('message', function (e) {
  // Get the sent data
  const data = e.data;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, 'message', (response) => {
      extFrameWindow.contentWindow.postMessage(response.title, '*');
    });
  });
});
