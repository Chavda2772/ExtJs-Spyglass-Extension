Ext.define('Spyglass.controller.JsonTreeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jsonTreeViewController',

    onLoadComponentJson: function (selection) {
        var me = this;
        var view = me.getView();

        view.items.items[0].getStore().setRoot(me.getTreeStoreFromJson(selection.data))
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
                        expanded: false,
                        leaf: false,
                        children: [...me.getStoreFromConfig(config[key])]
                    });
                }
                else if (Ext.isArray(config[key])) {
                    returnData.push({
                        keyName: key,
                        valueName: '[[ ARRAY ]]',
                        expanded: false,
                        leaf: false,
                        children: [...me.getStoreFromConfig(config[key])]
                    });
                }
                else {
                    returnData.push({
                        keyName: key,
                        valueName: config[key],
                        expanded: false,
                        leaf: true
                    })
                }
            });
        }
        else if (Ext.isArray(config)) {
            if (config.length) {
                Ext.Array.forEach(config, (item, idx) => {
                    var obj = {
                        keyName: idx.toString(),
                        expanded: false,
                    };

                    if (Ext.isObject(item)) {
                        obj.valueName = '[[ OBJECT ]]';
                        obj.children = [...me.getStoreFromConfig(item)];
                        obj.leaf = false;
                    }
                    else if (Ext.isArray(item)) {
                        obj.valueName = '[[ ARRAY ]]';
                        obj.children = [...me.getStoreFromConfig(item)];
                        obj.leaf = false;
                    } else {
                        obj.valueName = item;
                        obj.leaf = true;
                    }

                    returnData.push(obj);
                });
            }
        }
        return returnData
    }
});
