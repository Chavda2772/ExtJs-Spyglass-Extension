Ext.application({
  name: 'CL',
  // mainView: 'CL.view.Main',
  // requires: ['CL.*'],
  appFolder: 'app',
  launch: function () {
    Ext.create('CL.view.Main');
  },
});
