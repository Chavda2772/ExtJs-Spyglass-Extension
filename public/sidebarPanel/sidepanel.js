const mainBtn = document.getElementById('btnMainSidePanel');
const extFrameWindow = document.getElementById('extjsFrameWindow');

// chrome.runtime.onMessage.addListener((data, serder, responseFn) => {
// extFrameWindow.contentWindow.postMessage(data, '*');
// debugger;
// window.addEventListener(
//   'message',
//   (event) => {
//     console.log('Ext js application return data :-', event.data);
//     responseFn(event.data);
//   },
//   false
// );
// });

mainBtn.addEventListener('click', function () {
  console.log('Button clicked');

  // send message to content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log('send');
    chrome.tabs.sendMessage(tabs[0].id, 'message', (response) => {
      console.log('Recive response = ' + response.title);
      document.getElementById('lblTitle').innerHTML = response.title;
    });
    console.log('waiting ...');
  });
});
