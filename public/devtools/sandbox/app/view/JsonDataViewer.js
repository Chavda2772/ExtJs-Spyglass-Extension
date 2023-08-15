Ext.define('Spyglass.view.JsonDataViewer', {
  extend: 'Ext.panel.Panel',
  requires: ['Spyglass.controller.JsonDataViewerController'],

  alias: ['widget.jsonDataViewer'],
  controller: 'jsonDataViewerController',

  scrollable: true,
  listeners: {
    afterrender: 'onAfterrender',
    loadComponentJson: 'onLoadComponentJson',
  },
});
