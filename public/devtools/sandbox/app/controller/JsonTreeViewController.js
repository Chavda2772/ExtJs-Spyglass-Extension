Ext.define('Spyglass.controller.JsonTreeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jsonTreeViewController',

    onLoadComponentJson: function (selection, isActiveView) {
        var me = this;
        var view = me.getView();
        var vm = me.getViewModel();
        var store = view.getStore();

        if (store.isFiltered())
            store.clearFilter();

        // Set Config in View
        view.LoadedJson = selection.data;

        if (Ext.Object.isEmpty(selection)) {
            store.setRoot({});
            vm.set('emptyJson', true);
        }
        else {
            vm.set('emptyJson', false);
        }

        if (isActiveView && view.LoadedJson?.id)
            me.refreshComponentDetails(view.LoadedJson.id);

        view.columns[0].sort('asc');
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
                else if (config[key] == null) {
                    returnData.push({
                        keyName: key,
                        valueName: config[key],
                        valueType: 'string',
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

        // Need Improvement
        var updateConfig = me.getConfigToUpdate(record, newValue);

        CommonHelper.postParentMessage(`new (${Spyglass.helperClass.UpdateComponent.toString()})(${JSON.stringify(updateConfig)}, '${view.LoadedJson.id}')`)

    },
    getConfigToUpdate: function (record, value) {
        var me = this;
        var returnObj;

        if (record.parentNode) {
            var keyName = record.data.keyName;

            if (keyName.startsWith('_')) {
                keyName = keyName.substring(1);
            }

            if (record.parentNode.data.valueType == 'Array') {
                returnObj = [];
            }
            else {
                returnObj = {};
            }

            returnObj[keyName] = value;
        }

        if (record.isRoot()) {
            return value;
        }
        else {
            returnObj = me.getConfigToUpdate(record.parentNode, returnObj);
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

                    CommonHelper.postParentMessage(`new (${Spyglass.helperClass.UpdateComponent.toString()})(${JSON.stringify(updateConfig)}, '${view.LoadedJson.id}')`)
                }
            }
        }).show();
    },
    onComponentRedefine: function (button) {
        var me = this;
        var view = me.getView();

        CommonHelper.postParentWithResponse({
            script: `new (${Spyglass.helperClass.RedefineComponent.toString()})('${view.LoadedJson.id}')`,
            success: function (response) {

            },
            error: function (error) {

            }
        });
    },
    onDataRefresh: function (button) {
        var me = this;
        var view = me.getView();

        if (view.LoadedJson?.id)
            me.refreshComponentDetails(view.LoadedJson.id);
    },
    refreshComponentDetails: function (compId) {
        var me = this;
        var view = me.getView();
        var store = view.getStore();

        view.setLoading(true);
        CommonHelper.postParentWithResponse({
            script: `new (${Spyglass.helperClass.ComponentDetail.toString()})('${compId}')`,
            success: function ({ componentDetail }) {
                var jsonData = JSON.parse(componentDetail);

                store.setRoot(me.getTreeStoreFromJson(jsonData));
                view.setLoading(false);
                console.log("Tree Json Loaded", jsonData);
            },
            error: function (error) {
                console.error(error);
                view.setLoading(false);
            }
        });
    },
    onDetailViewChange() {
        var me = this;
        var view = me.getView();

        if (view.LoadedJson?.id)
            me.refreshComponentDetails(view.LoadedJson.id);
    }
});
