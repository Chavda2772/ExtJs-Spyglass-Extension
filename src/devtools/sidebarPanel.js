import { ComponentLocator } from './sandbox/app/helperClass/ComponentLocator.js';
const extFrameWindow = document.getElementById('extjsFrameWindow');

// Global window event listner for Framework iframe
window.addEventListener('message', (event) => {
    var data = event.data;
    var callbackID = data.callbackID;
    var response = {};

    // When postmessage is not from framework iframe
    if (!callbackID) return;

    chrome.devtools.inspectedWindow.eval(data.script, (result, isException) => {
        // Respose handle
        if (isException) {
            response = { isError: true, ...isException };
        }
        else if (result === undefined || result === null || result === '') {
            response = { result: true };
        }
        else {
            response = { result };
        }

        // Send back the response with the same callback ID
        extFrameWindow.contentWindow.postMessage({
            callbackID: callbackID,
            ...response
        }, '*');

    });
});

// Listen for sended chrome message
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // Listning ...
// });

// Handle selection element change on elements tool
chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.devtools.inspectedWindow.eval(
            'new (' + ComponentLocator.toString() + ')($0)',
            (result, isException) => {
                if (isException) {
                    console.error(isException);
                    // sended Error Message to framework 
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
