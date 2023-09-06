Ext.define('Spyglass.view.HierarchyGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['Spyglass.controller.HierarchyGridController'],

    alias: ['widget.hierarchyGrid'],
    controller: 'hierarchyGridController',

    title: 'Hierarchy',
    hideHeaders: true,
    store: {},
    emptyText: 'No Records found !!!',
    columns: [{
        text: 'name',
        dataIndex: 'name',
        flex: 1,
        renderer: 'onRenderHierarchy'
    }],
    rowTpl:
        '<tpl for=".">' +
        '<div class="list-item">' +
        '<h4>{xtype}</h4>' +
        '<p>{id}</p>' +
        '<p>{className}</p>' +
        '</div>' +
        '</tpl>',
    listeners: {
        loadCompData: 'onLoadCompData',
        select: 'onRecordSelect',
        itemdblclick: 'onItemDoubleClick',
        itemmouseenter: 'onItemMouseEnter',
        itemmouseleave: 'onItemMouseLeave'
    },
});
