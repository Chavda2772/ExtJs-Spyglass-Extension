// import './app/MainViewport.js';
// import './app/common/Enums.js';
// import './app/view/JsonDataViewer.js';

Ext.application({
  requires: [
    // This will automatically load all classes in the Spyglass namespace
    // so that application classes do not need to require each other.
    'Spyglass.common.Enums',
    'Spyglass.view.Viewport',
  ],

  name: 'Spyglass',
  appFolder: 'app',

  mainView: 'Spyglass.view.Viewport',
  // launch: function () {
  //   Ext.create('Spyglass.view.Main');
  // },
});
