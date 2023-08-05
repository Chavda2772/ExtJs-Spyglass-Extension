// import './app/MainViewport.js';
// import './app/common/Enums.js';
// import './app/view/JsonDataViewer.js';

Ext.application({
  requires: ['Spyglass.common.Enums', 'Spyglass.MainViewport'],
  name: 'Spyglass',

  appFolder: 'app',
  appProperty: 'Spyglass',

  mainView: 'Spyglass.MainViewport',
  launch: function () {
    debugger;
    // Ext.create('Spyglass.view.Main');
  },
});
