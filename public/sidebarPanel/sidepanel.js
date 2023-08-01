import Enums from '../config/Enums.js';
import { ComponentLocator } from './app/common/ComponentLocator.js';

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
      'new (' + ComponentLocator.toString() + ')($0)',
      (result, isException) => {
        if (isException) {
          console.error('Error executing code:', result);
        } else {
          console.log('Code executed successfully:', result);
        }
      }
    );
  });
});
