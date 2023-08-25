Ext.define('Spyglass.view.JsonTreeView', {
    extend: 'Ext.tree.Panel',
    requires: ['Spyglass.controller.JsonTreeViewController'],

    alias: ['widget.JsonTreeView'],
    controller: 'jsonTreeViewController',
    rootVisible: false,
    width: '100%',

    plugins: {
        cellediting: {
            clicksToEdit: 1
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
            getEditor: function (record) {
                //if (record.data.code == 'combo') {
                return Ext.create('Ext.grid.CellEditor', {
                    field: Ext.create('Ext.form.ComboBox', {
                        store: {
                            fields: ['abbr', 'name'],
                            data: [
                                { "valueName": "AL", "name": "Alabama" },
                                { "valueName": "AK", "name": "Alaska" },
                                { "valueName": "AZ", "name": "Arizona" }
                            ]
                        },
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'valueName',
                    })
                });
                //}
            }
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