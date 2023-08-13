import { ComponentLocator } from './sandbox/app/common/ComponentLocator.js';
import { NewComponentDetails } from './sandbox/app/common/NewComponentDetails.js';
const extFrameWindow = document.getElementById('extjsFrameWindow');

// Global window event listner for Ext js application sended
// window.addEventListener('message', function ({ data }) {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.tabs.sendMessage(tabs[0].id, data, (response) => {
//       extFrameWindow.contentWindow.postMessage(response.title, '*');
//     });
//   });
// });

// Listen for sended chrome message
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // Listning ...
// });

// Handle selection element change on elements tool
chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //chrome.scripting.executeScript({
        //    target: { tabId: tabs[0].id },
        //    injection: Ext.versions.ext.version,
        //    callback: function (error, success) {
        //        debugger;
        //    },
        //}
        //)
        chrome.devtools.inspectedWindow.eval(
            'new (' + ComponentLocator.toString() + ')($0)',
            (result, isException) => {
                if (isException) {
                    console.error(isException)
                    //chrome.devtools.inspectedWindow.eval('console.error(' + isException.description + ')');
                    // sended Error Message to Sandbox
                    extFrameWindow.contentWindow.postMessage(
                        { isError: true, ...isException },
                        '*'
                    );
                } else {
                    extFrameWindow.contentWindow.postMessage(result, '*');
                }
            }
        );
    });
});
