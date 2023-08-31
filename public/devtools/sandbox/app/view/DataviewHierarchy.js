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
    onItemMouseEnter(record, item, index, e) {
        var template = `new (${Spyglass.helperClass.HoverIn.toString()})('${record.data.id}')`;
        CommonHelper.postParentMessage({ script: template })
    },
    onItemMouseLeave(record, item, index, e) {
        var template = `new (${Spyglass.helperClass.HoverOut.toString()})`;
        CommonHelper.postParentMessage({ script: template });
    },
    listeners: {
        loadCompData: 'onLoadCompData',
        selectionchange: 'onSelectionChange',
        itemdblclick: 'onItemDoubleClick'
    },
});
