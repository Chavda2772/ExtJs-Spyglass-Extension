Ext.define('Spyglass.view.JsonTreeView', {
    extend: 'Ext.tree.Panel',
    requires: ['Spyglass.controller.JsonTreeViewController'],

    alias: ['widget.JsonTreeView'],
    controller: 'jsonTreeViewController',
    rootVisible: false,
    width: '100%',

    store: {
        fields: ['keyName', 'valueName'],
        root: {}
    },
    columns: [
        {
            xtype: 'treecolumn',
            text: 'key',
            dataIndex: 'keyName',
            flex: 1,
        },
        {
            text: 'value',
            dataIndex: 'valueName',
            flex: 1,
        }
    ],
    listeners: {
        loadCompData: 'onLoadCompData',
    },
});