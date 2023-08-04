console.log('background Scripts Loaded!');

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.runtime.OnMessage.addListener((message, sender, sendResponse) => {
//     console.log('background script listens');
//     console.log('recived :-' + message + ',response = ' + document.title);
//     sendResponse({ title: document.title });
//   });
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log('background message recived !!');
//   chrome.runtime.sendMessage('message', function (message) {
//     sendResponse({ title: message });
//   });
// });
