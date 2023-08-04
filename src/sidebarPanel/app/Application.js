import './view/Main.js';
import './common/Enums.js';

Ext.application({
  name: 'CL',

  launch: function () {
    Ext.create('CL.view.Main');
  },
});
