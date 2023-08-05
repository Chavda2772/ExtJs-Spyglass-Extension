Ext.define('Spyglass.controller.DataviewHierarchyController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.dataviewHierarchyController',

  onLoadCompData: function (compData) {
    this.getView().getStore().setData(compData);
  },

  onSelectionChange: function (dataview, selected, eOpts) {
    var me = this;
    if (!selected[0]) {
      Ext.toast('No record selected');
      return true;
    }

    me.getView().fireEvent('componentSelected', selected[0]);
  },
});
