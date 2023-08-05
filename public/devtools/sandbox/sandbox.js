import './app/MainViewport.js';
import './app/common/Enums.js';
import './app/view/JsonDataViewer.js';

Ext.application({
  name: 'Spyglass',

  appFolder: 'app',
  appProperty: 'Spyglass',

  mainView: 'Spyglass.MainViewport',
  launch: function () {
    // Ext.create('Spyglass.view.Main');
  },
});
