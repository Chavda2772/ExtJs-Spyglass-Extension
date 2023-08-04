console.log('Content Scripts Loaded!');
var port = chrome.runtime.connect();
var count = 1;

//receiving a message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkForExtJS') {
    checkForExtJS();
    return;
  }
  if (message.msgType) {
    // const cmpId = setSelectedElement($0);
    sendResponse({ msgType: 'getCmpId', isExtJs: isExtJs });
  }

  console.log('content script message recived !!');
  console.log('recived :-' + message + ',response = ' + document.title);
  count = count + 1;
  sendResponse({ title: document.title + ' ' + count });
});

function checkForExtJS() {
  // Check if the 'Ext' object exists in the global scope
  if (window.Ext && typeof window.Ext.versions === 'object') {
    // Ext JS is loaded, send a message to DevTools panel
    // chrome.runtime.sendMessage({ extVersion: window.Ext.versions.ext.version });
    return window.Ext.versions.ext.version;
  } else {
    return 'Not loaded';
  }
}
