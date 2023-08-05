Ext.define('Spyglass.controller.JsonDataViewerController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.jsonDataViewerController',

  // This method is called as a "handler" for the Add button in our view
  onAddClick: function () {
    Ext.Msg.alert('Add', 'The Add button was clicked');
  },
});
