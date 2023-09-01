Ext.define('Spyglass.view.HierarchyGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['Spyglass.controller.HierarchyGridController'],

    alias: ['widget.hierarchyGrid'],
    controller: 'hierarchyGridController',

    title: 'Hierarchy',
    hideHeaders: true,
    store: {},
    flex: 1,
    columns: [{
        text: 'name',
        dataIndex: 'name',
        flex: 1,
        renderer: 'onRenderHierarchy'
    }],
    rowTpl:
        '<tpl for=".">' +
        '<div class="list-item">' +
        '<h4>{name}</h4>' +
        '<p>{className}</p>' +
        '</div>' +
        '</tpl>',
    listeners: {
        loadCompData: 'onLoadCompData',
        selectionchange: 'onSelectionChange',
        itemdblclick: 'onItemDoubleClick',
        itemmouseenter: 'onItemMouseEnter',
        itemmouseleave: 'onItemMouseLeave'
    },
});
