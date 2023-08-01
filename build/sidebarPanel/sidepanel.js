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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.extVersion) {
    // Ext JS is loaded on the page
    console.log(`Ext JS Version: ${message.extVersion}`);
  }
});

chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.devtools.inspectedWindow.eval(
      'Ext.versions.ext',
      (result, isException) => {
        if (isException) {
          console.error('Error executing code:', result);
        } else {
          console.log('Code executed successfully:', result);
        }
      }
    );

    // chrome.scripting.executeScript({
    //   target: { tabId: chrome.devtools.inspectedWindow.tabId },
    //   func: () => {
    //     // Send a message to content script to check for Ext JS
    //     chrome.runtime.sendMessage({ action: 'checkForExtJS' }).then((res) => {
    //       console.log('Res', res);
    //     });
    //   },
    // });
    // code to send message
    // chrome.tabs.sendMessage(
    //   tabs[0].id,
    //   { msgType: Enums.msgType.getCmpId },
    //   (response) => {
    //     debugger;
    //     extFrameWindow.contentWindow.postMessage(response.title, '*');
    //   }
    // );
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
