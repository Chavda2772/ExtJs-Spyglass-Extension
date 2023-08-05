import { ComponentLocator } from './app/common/ComponentLocator.js';

var extFrameWindow = document.getElementById('extjsFrameWindow');

// Global window event listner for Ext js application sended
window.addEventListener('message', function ({ data }) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, data, (response) => {
      // extFrameWindow.contentWindow.postMessage(response.title, '*');
    });
  });
});

// Listen for sended chrome message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Listning ...
});

// Handle selection element change on elements tool
chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.devtools.inspectedWindow.eval(
      'new (' + ComponentLocator.toString() + ')($0)',
      (result, isException) => {
        debugger;
        if (isException) {
          debugger;
          // sended Error Message to Sandbox
          // extFrameWindow.contentWindow.postMessage(
          //   { isError: true, ...isException },
          //   '*'
          // );
        } else {
          debugger;
          // extFrameWindow.contentWindow.postMessage(result, '*');
        }
      }
    );
  });
});
