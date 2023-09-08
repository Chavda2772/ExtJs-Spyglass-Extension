export class NewComponentDetails {
    jsonConfig = {
        "name": "tree",
        "className": "Ext.grid.Tree",
        "isExtComponent": false,
        "items": {
            "allowFunctions": false,
            "getKey": "[[Function]]"
        },
        "_items": {
            "allowFunctions": false,
            "getKey": "[[Function]]"
        },
        "innerItems": [0, 1, 2, 3, 2, 5, 6],
        "lastSize": {},
        "onInitializedListeners": [],
        "$iid": 17,
        "baseCls": "x-tree",
        "autoGenId": true,
        "id": "ext-tree-1",
        "getId": "ext-tree-1",
        "referenceList": [
            "element",
            "bodyElement",
            "outerCt",
            "innerCt",
            "resizeMarkerElement"
        ],
    };
    sampleData = {
        expanded: true,
        children: [{
            text: 'parent',
            duration: '6h 55m',
            expanded: true,
            children: [{
                text: 'child 1',
                duration: '2h 04m',
                leaf: true
            }, {
                text: 'PHX layover',
                duration: '2h 36m',
                leaf: true
            }, {
                text: 'child 2',
                duration: '2h 15m',
                leaf: true
            }]
        }]
    };

    constructor(element, config) {
        try {
            var storeData = this.getStore(this.jsonConfig)
        } catch (e) {
            console.error(e)
        }
        return {
            componentDetails: JSON.stringify({
                expanded: true,
                children: storeData
            }),
        };
    }

    getStore(config) {
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
                        children: [...me.getStore(config[key])]
                    });
                }
                else if (Ext.isArray(config[key])) {
                    returnData.push({
                        keyName: key,
                        valueName: '[[ ARRAY ]]',
                        expanded: false,
                        leaf: false,
                        children: [...me.getStore(config[key])]
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
                        obj.leaf = false;
                    }
                    else if (Ext.isArray(item)) {
                        obj.valueName = '[[ ARRAY ]]';
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

}
