Ext.define('Spyglass.view.JsonTreeView', {
    extend: 'Ext.tree.Panel',
    requires: ['Spyglass.controller.JsonTreeViewController'],

    alias: ['widget.JsonTreeView'],
    controller: 'jsonTreeViewController',
    rootVisible: false,
    width: '100%',

    plugins: {
        cellediting: {
            clicksToEdit: 2,
        }
    },
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
            getEditor: function (record, defaultType) {
                return this.up('JsonTreeView').getController().onColumnEditorActive(record, defaultType);
            },
        },
        {
            text: 'typeOf',
            dataIndex: 'valueType',
            flex: 1,
        }
    ],
    listeners: {
        loadComponentJson: 'onLoadComponentJson',
    },
});