Ext.define('Spyglass.controller.ViewportController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.viewportController',

  onComponentSelected: function (data) {
    var me = this;
    var view = me.getView();

    view.down('#dvJsonViewer').fireEvent('loadComponentJson', data);
  },
  onAfterRender: function (viewport, eOpts) {
    window.addEventListener(
      'message',
      (event) => {
        // if Error Message
        if (event.data.isError) {
          Ext.toast(event.data.value);
          return;
        }

        viewport
          .down('#dvComponentHierarchy')
          .fireEvent('loadCompData', event.data.componentDetails);
      },
      false
    );
  },
});
