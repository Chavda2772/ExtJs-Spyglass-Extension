Ext.define('Spyglass.controller.JsonTreeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jsonTreeViewController',

    onLoadComponentJson: function (selection) {
        var me = this;
        var view = me.getView();
        var store = view.getStore();

        if (store.isFiltered())
            store.clearFilter();

        view.LoadedJson = selection.data;
        me.refreshComponentDetails(selection.data.id);
    },
    getTreeStoreFromJson: function (jsonData) {
        var me = this;

        return {
            expanded: true,
            children: me.getStoreFromConfig(jsonData)
        }
    },
    getStoreFromConfig(config) {
        var me = this;
        var returnData = [];

        if (Ext.isObject(config)) {
            Object.keys(config).forEach((key) => {
                if (Ext.isObject(config[key])) {
                    returnData.push({
                        keyName: key,
                        valueName: '[[ OBJECT ]]',
                        valueType: 'Object',
                        expanded: false,
                        leaf: false,
                        children: [...me.getStoreFromConfig(config[key])]
                    });
                }
                else if (Ext.isArray(config[key])) {
                    returnData.push({
                        keyName: key,
                        valueName: '[[ ARRAY ]]',
                        valueType: 'Array',
                        expanded: false,
                        leaf: false,
                        children: [...me.getStoreFromConfig(config[key])]
                    });
                }
                else if (config[key] == '[[ Function ]]') {
                    returnData.push({
                        keyName: key,
                        valueName: config[key],
                        valueType: 'Function',
                        expanded: false,
                        leaf: true
                    });
                }
                else {
                    returnData.push({
                        keyName: key,
                        valueName: config[key],
                        valueType: typeof config[key],
                        expanded: false,
                        leaf: true
                    });
                }
            });
        } else if (Ext.isArray(config)) {
            if (config.length) {
                Ext.Array.forEach(config, (item, idx) => {
                    var obj = {
                        keyName: idx.toString(),
                        expanded: false,
                    };

                    if (Ext.isObject(item)) {
                        obj.valueName = '[[ OBJECT ]]';
                        obj.children = [...me.getStoreFromConfig(item)];
                        obj.valueType = 'Object';
                        obj.leaf = false;
                    }
                    else if (Ext.isArray(item)) {
                        obj.valueName = '[[ ARRAY ]]';
                        obj.children = [...me.getStoreFromConfig(item)];
                        obj.valueType = 'Array';
                        obj.leaf = false;
                    }
                    else if (item == '[[ Function ]]') {
                        obj.valueName = item;
                        obj.valueType = 'Function';
                        obj.leaf = true;
                    }
                    else {
                        obj.valueName = item;
                        obj.valueType = typeof item;
                        obj.leaf = true;
                    }

                    returnData.push(obj);
                });
            }
        }
        return returnData;
    },
    onColumnEditorActive: function (record, defaultType) {
        var me = this;
        return me.getEditorDetails(record);
    },
    getEditorDetails: function (record) {
        var me = this;
        var data = record.data;
        var editorConfig = {};

        switch (data.valueType) {
            case 'string':
                editorConfig = {
                    xtype: 'textfield',
                }
                break;
            case 'boolean':
                editorConfig = {
                    xtype: 'combobox',
                    forceSelection: true,
                    editable: false,
                    store: {
                        fields: ['display', 'valueField'],
                        data: [
                            { valueField: true, display: 'True' },
                            { valueField: false, display: 'False' },
                        ],
                    },
                    queryMode: 'local',
                    displayField: 'display',
                    valueField: 'valueField',
                }
                break;
            case 'number':
                editorConfig = {
                    xtype: 'numberfield',
                }
                break;
            default:
                break;
        }

        return editorConfig;
    },
    onChangeEditor: function (field, newValue, oldValue, eOpts) {
        var me = this;
        var view = me.getView();
        var record = field.up().record;

        // backup
        var updateConfig = {
            [record.data.keyName]: newValue
        };

        // Need Improvement
        //debugger;
        //var updateConfig = me.getConfigToUpdate(record, newValue);
        //debugger;

        CommonHelper.postParentMessage(`new (${Spyglass.helperClass.UpdateComponent.toString()})('${JSON.stringify(updateConfig)}', '${view.LoadedJson.id}')`)

    },
    getConfigToUpdate: function (record, newValue) {
        var me = this;
        var view = me.getView();
        var returnObj = {};

        if (newValue) {
            returnObj[record.data.keyName] = newValue;
        }
        else if (Ext.Object.isEmpty()) {

        }

        return returnObj;
    },
    onAddConfig: function (button) {
        var view = this.getView();

        Ext.create('Spyglass.view.AddConfig', {
            listeners: {
                addConfig: function (config) {
                    var updateConfig = {
                        [config.keyName]: config.value
                    };

                    CommonHelper.postParentMessage(`new (${Spyglass.helperClass.UpdateComponent.toString()})('${JSON.stringify(updateConfig)}', '${view.LoadedJson.id}')`)
                }
            }
        }).show();
    },
    onComponentRerender: function (button) {
        console.log("Component refresh added");
    },
    onDataRefresh: function (button) {
        var template = `Ext.getCmp('ext-button-5')`;

        CommonHelper.postParentWithResponse({
            script: template,
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.error(error);
            }
        });
    },
    refreshComponentDetails: function (compId) {
        var me = this;
        var view = me.getView();
        var store = view.getStore();

        CommonHelper.postParentWithResponse({
            script: `new (${Spyglass.helperClass.ComponentDetail.toString()})('${compId}')`,
            success: function ({ componentDetail }) {
                var jsonData = JSON.parse(componentDetail);

                store.setRoot(me.getTreeStoreFromJson(jsonData));
            },
            error: function (error) {
                console.error(error);
            }
        });
    }
});
