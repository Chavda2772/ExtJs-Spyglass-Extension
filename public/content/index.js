console.log('Content Scripts Loaded!');

//receiving a message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('content script listens');
  console.log('recived :-' + message + ',response = ' + document.title);
  sendResponse({ title: document.title });
});
