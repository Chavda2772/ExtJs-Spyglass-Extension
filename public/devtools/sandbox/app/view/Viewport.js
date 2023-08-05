Ext.define('Spyglass.view.Viewport', {
  extend: 'Ext.container.Viewport',
  requires: [
    'Spyglass.view.DataviewHierarchy',
    'Spyglass.view.JsonDataViewer',
    'Spyglass.controller.ViewportController',
  ],

  alias: ['widget.mainViewport'],
  controller: 'viewportController',
  layout: 'border',
  defaults: {
    split: true,
  },
  items: [
    {
      title: 'hierarchy',
      region: 'center',
      collapsible: false,
      scrollable: true,
      items: {
        xtype: 'dataviewHierarchy',
        itemId: 'dvComponentHierarchy',
        listeners: {
          componentSelected: 'onComponentSelected',
        },
      },
    },
    {
      title: 'Details',
      region: 'east',
      itemId: 'compDetailView',
      collapsible: true,
      width: '50%',
      layout: 'fit',
      items: {
        xtype: 'jsonDataViewer',
        itemId: 'dvJsonViewer',
        listeners: {
          componentSelected: 'onComponentSelected',
        },
      },
    },
  ],

  listeners: {
    afterrender: 'onAfterRender',
  },
});
