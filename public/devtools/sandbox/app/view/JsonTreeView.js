Ext.define('Spyglass.view.JsonTreeView', {
    extend: 'Ext.tree.Panel',
    requires: ['Spyglass.controller.JsonTreeViewController'],

    alias: ['widget.JsonTreeView'],
    controller: 'jsonTreeViewController',
    rootVisible: false,
    width: '100%',

    // Custom Config
    LoadedJson: {},

    plugins: {
        gridfilters: true,
        cellediting: {
            clicksToEdit: 2,
        },
    },
    store: {
        fields: ['keyName', 'valueName'],
        root: {},
    },
    columns: [
        {
            xtype: 'treecolumn',
            text: 'key',
            dataIndex: 'keyName',
            flex: 1,
            filter: {
                type: 'string',
                operator: '/='
            }
        },
        {
            text: 'value',
            dataIndex: 'valueName',
            flex: 1,
            getEditor: function (record, defaultType) {
                var view = this.up('JsonTreeView');
                var editorConfig = view.getController().onColumnEditorActive(record, defaultType);

                if (!Ext.Object.isEmpty(editorConfig)) {
                    var editor = Ext.create('Ext.grid.CellEditor', {
                        record,
                        field: Ext.create({
                            ...editorConfig,
                            listeners: {
                                change: 'onChangeEditor'
                            }
                        }),
                    });

                    return editor;
                } else {
                    Ext.toast('Can not edit ' + record.data.valueType + ' type');
                }
            },
            filter: {
                type: 'string',
                operator: '/='
            }
        },
        {
            text: 'typeOf',
            dataIndex: 'valueType',
            flex: 1,
            filter: {
                type: 'string',
                operator: '/='
            }
        },
    ],
    listeners: {
        loadComponentJson: 'onLoadComponentJson',
    },
});