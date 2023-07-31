console.log('Content Scripts Loaded!');
var port = chrome.runtime.connect();
var isExtJs = window.Ext?.versions?.ext?.version;

//receiving a message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.msgType) {
    // const cmpId = setSelectedElement($0);
    sendResponse({ msgType: 'getCmpId', isExtJs: isExtJs });
  }

  console.log('content script message recived !!');
  console.log('recived :-' + message + ',response = ' + document.title);
  sendResponse({ title: document.title });
});

function setSelectedElement(el, callback, aa, dd) {
  console.log('setSelectedElement', el.id);
  return el.id;
}
