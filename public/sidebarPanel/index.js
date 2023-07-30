// Create the sidebar panel
chrome.devtools.panels.elements.createSidebarPane(
  'vite public',
  function (sidebar) {
    // Handle the initialization of the sidebar panel
    sidebar.setPage('sidebarPanel/app.html');
    sidebar.setHeight('300px'); // Set the initial height of the sidebar panel
    sidebar.onShown.addListener(function (window) {
      // Handle actions when the sidebar is shown
    });
    sidebar.onHidden.addListener(function () {
      // Handle actions when the sidebar is hidden
    });
  }
);
