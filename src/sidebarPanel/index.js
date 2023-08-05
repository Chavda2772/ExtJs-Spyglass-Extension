// Create the sidebar panel
chrome.devtools.panels.elements.createSidebarPane(
  'ExtJS Spyglass',
  function (sidebar) {
    // Handle the initialization of the sidebar panel
    sidebar.setPage('src/sidebarPanel/sidebarPanel.html'); // Path to the HTML file for the sidebar content
    sidebar.setHeight('300px'); // Set the initial height of the sidebar panel
    sidebar.onShown.addListener(function (window) {
      // Handle actions when the sidebar is shown
    });
    sidebar.onHidden.addListener(function () {
      // Handle actions when the sidebar is hidden
    });
  }
);
