import Enums from '../config/Enums.js';

const extFrameWindow = document.getElementById('extjsFrameWindow');

// Event Listener for iframe events
window.addEventListener('message', function (e) {
  // Get the sent data
  const data = e.data;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, data, (response) => {
      extFrameWindow.contentWindow.postMessage(response.title, '*');
    });
  });
});

chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { msgType: Enums.msgType.getCmpId },
      (response) => {
        debugger;
        extFrameWindow.contentWindow.postMessage(response.title, '*');
      }
    );
  });
  // chrome.devtools.inspectedWindow.eval(
  //   'setSelectedElement($0)',
  //   {
  //     useContentScriptContext: true,
  //   },
  //   function (result, exceptionInfo) {
  //     const data = { msgType: Enums.msgType.getCmpId, compId: result };
  //     extFrameWindow.contentWindow.postMessage(data, '*');
  //   }
  // );
});
