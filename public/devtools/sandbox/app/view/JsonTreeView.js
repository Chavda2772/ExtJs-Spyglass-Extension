Ext.define('Spyglass.view.JsonTreeView', {
    extend: 'Ext.tree.Panel',
    requires: ['Spyglass.controller.JsonTreeViewController', 'Spyglass.view.AddConfig'],

    alias: ['widget.JsonTreeView'],
    controller: 'jsonTreeViewController',
    rootVisible: false,
    width: '100%',
    emptyText: 'No Records found !!!',
    viewModel: {
        data: {
            emptyJson: true,
            isExtComponent: true
        }
    },
    bind: {
        hideHeaders: '{emptyJson}',
    },

    // Custom Config
    LoadedJson: {},

    tbar: {
        bind: {
            hidden: '{emptyJson}'
        },
        items: [
            {
                xtype: 'button',
                text: 'Add Config',
                handler: 'onAddConfig'
            },
            {
                xtype: 'button',
                text: 'Refresh',
                handler: 'onDataRefresh'
            },
            {
                xtype: 'splitbutton',
                text: 'Redefine Component',
                handler: 'onComponentRedefine',
                redefineType: 'both',
                menu: [
                    {
                        text: 'Controller Only',
                        iconCls: 'x-fa fa-gamepad',
                        redefineType: 'controller',
                        handler: 'onComponentRedefine'
                    },
                    {
                        text: 'View Only',
                        iconCls: 'x-fa fa-eye',
                        redefineType: 'view',
                        handler: 'onComponentRedefine'
                    }
                ],
                bind: {
                    hidden: '{isExtComponent}'
                }
            },
        ]
    },

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
        detailViewChange: 'onDetailViewChange'
    },
});