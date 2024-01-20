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

    plugins: {
        gridfilters: true,
        cellediting: {
            clicksToEdit: 2,
        },
    },
    bbar: {
        bind: {
            hidden: '{emptyJson}'
        },
        items: {
            xtype: 'component',
            html: '<strong><i><span style="color: red">*</span> Note: </i>Double-click on light blue cell for updating real-time component config.</strong>'
        }
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
                    CommonHelper.showToast(`Can not edit <strong>${record.data.valueType}</strong> type`);
                }
            },
            filter: {
                type: 'string',
                operator: '/='
            },
            renderer: function (val, metaData, rowIndex, colIndex, store, view, f) {
                var valType = metaData.record.get('valueType');

                if (valType != "Object" && valType != "Function" && valType != "Array")
                    metaData.tdCls = 'editable-tree-cell'

                return val;
            }
        },
        {
            text: 'typeOf',
            dataIndex: 'valueType',
            flex: 1,
            hidden: true,
            filter: {
                type: 'string',
                operator: '/='
            }
        },
    ],
    listeners: {
        refreshData: 'onRefreshData',
        loadComponentJson: 'onLoadComponentJson',
    },
});