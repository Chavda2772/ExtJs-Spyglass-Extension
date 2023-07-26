// devtools.js
// Create a connection to the background script
const backgroundPageConnection = chrome.runtime.connect({
  name: 'devtools-page',
});

// Create the sidebar panel
chrome.devtools.panels.elements.createSidebarPane(
  'ExtJS Component',
  function (sidebar) {
    // Handle the initialization of the sidebar panel
    // sidebar.setPage('/source/sidebarPanel/app.html'); // Path to the HTML file for the sidebar content
    sidebar.setPage('/source/sidebarPanel/app.html');
    sidebar.setHeight('300px'); // Set the initial height of the sidebar panel
    sidebar.onShown.addListener(function (window) {
      // Handle actions when the sidebar is shown
    });
    sidebar.onHidden.addListener(function () {
      // Handle actions when the sidebar is hidden
    });
  }
);
