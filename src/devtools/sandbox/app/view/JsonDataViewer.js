Ext.define('Spyglass.view.JsonDataViewer', {
  extend: 'Ext.panel.Panel',
  requires: ['Spyglass.controller.JsonDataViewerController'],

  alias: ['widget.jsonDataViewer'],
  controller: 'jsonDataViewerController',

  scrollable: true,
  html: '<div id="JsonViwerData"></div>',
  listeners: {
    afterrender: 'onAfterrender',
    loadComponentJson: 'onLoadComponentJson',
  },
});
