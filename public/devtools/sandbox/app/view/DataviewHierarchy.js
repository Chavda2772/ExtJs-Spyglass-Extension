Ext.define('Spyglass.view.DataviewHierarchy', {
  extend: 'Ext.view.View',
  requires: ['Spyglass.controller.DataviewHierarchyController'],

  alias: ['widget.dataviewHierarchy'],
  controller: 'dataviewHierarchyController',

  emptyText: 'No records found !!',
  scrollable: true,
  store: {
    fields: ['name', 'email'],
    data: [],
  },
  tpl:
    '<tpl for=".">' +
    '<div class="list-item">' +
    '<h4>{name}</h4>' +
    '<p>{className}</p>' +
    '</div>' +
    '</tpl>',
  itemSelector: 'div.list-item',
  emptyText: 'No records found !!!',
  cls: 'custom-list',
  listeners: {
    loadCompData: 'onLoadCompData',
    selectionchange: 'onSelectionChange',
  },
});
