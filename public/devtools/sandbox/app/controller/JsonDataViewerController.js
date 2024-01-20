Ext.define('Spyglass.controller.JsonDataViewerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jsonDataViewerController',

    viewerId: '',
    viewerInstance: null,
    viewerJsonData: {},

    onAfterrender: function () {
        var me = this;
        var view = me.getView();
        var cmpViewer = view.down('#cmpViewer');

        me.viewerId = 'jsonViewer-' + view.id;
        me.viewerInstance = new JSONViewer();

        cmpViewer.setHtml('<div id="' + me.viewerId + '"></div>');
        cmpViewer.el.dom
            .querySelector('#' + me.viewerId)
            .appendChild(me.viewerInstance.getContainer());
    },
    onLoadComponentJson: function (selection, isActiveView) {
        var me = this;
        var view = me.getView();

        view.LoadedJson = selection.data;
        view.down('#txtSearchField').setValue('');

        if (Ext.Object.isEmpty(selection))
            me.viewerInstance.showJSON({});

        if (isActiveView && view.LoadedJson?.id)
            me.refreshComponentJson(view.LoadedJson.id);
    },
    refreshComponentJson(compId) {
        var me = this;
        var view = me.getView();
        var vm = view.getViewModel();

        view.setLoading(true);
        CommonHelper.postParentWithResponse({
            script: `new (${Spyglass.helperClass.ComponentDetail.toString()})('${compId}')`,
            success: function ({ componentDetail }) {
                try {
                    var jsonData = JSON.parse(componentDetail);
                    var orderObj = CommonHelper.sortObject(jsonData, vm.get('sortedOrder'))

                    if (Ext.Object.isEmpty(orderObj))
                        orderObj = jsonData;

                    if (Ext.Object.isEmpty(orderObj))
                        vm.set('emptyJson', true);
                    else
                        vm.set('emptyJson', false);

                    me.viewerJsonData = orderObj;
                    me.viewerInstance.showJSON(orderObj);
                    console.log("Data Loaded.");
                } catch (e) {
                    vm.set('emptyJson', true);
                    console.log("Error While loading data :- ", e);
                }
                view.setLoading(false);
            },
            error: function (error) {
                CommonHelper.showToast(error);
                console.error(error);
                view.setLoading(false);
            }
        });
    },
    onRefreshData() {
        var me = this;
        var view = me.getView();

        if (view.LoadedJson?.id)
            me.refreshComponentJson(view.LoadedJson.id);
    },
    onSortViewerData: function (button) {
        var me = this;
        var vm = me.getViewModel();
        var sortOrder = button.SortOrder;
        var sortedData = CommonHelper.sortObject(me.viewerJsonData, sortOrder);

        vm.set('sortedOrder', sortOrder);
        me.viewerInstance.showJSON(sortedData);
    },
    onChangeSortOrder: function (sort) {
        var me = this;
        var sortedData = CommonHelper.sortObject(me.viewerJsonData, sort);

        me.getViewModel().set('sortedOrder', sort);
        me.viewerInstance.showJSON(sortedData);
    },
    onSearchJson: function (txt, newValue, oldValue, eOpts) {
        var me = this;
        if (!newValue) {
            me.viewerInstance.showJSON(me.viewerJsonData);
            return true;
        }

        var retdata = me.filterNLevelObject(Ext.clone(me.viewerJsonData), newValue, "", "me.viewerJsonData");
        me.viewerInstance.showJSON(retdata);
    },

    // Helper function
    filterNLevelObject: function (objectNode, keyToFind, valueToFind, path) {
        var me = this;
        var foundObj = {};

        if (typeof objectNode == "object") {
            Object.keys(objectNode).forEach((key) => {
                // Find Direct key
                if (key.toLowerCase().includes(keyToFind.toLowerCase())) {
                    foundObj[key] = objectNode[key];
                }

                // nested object
                else if (Ext.isObject(objectNode[key])) {
                    var retval = me.filterNLevelObject(objectNode[key], keyToFind, valueToFind, `${path}.${key}`)

                    if (!Ext.Object.isEmpty(retval)) {
                        foundObj[key] = retval;
                    }
                }
                else if (Ext.isArray(objectNode[key])) {
                    var retval = [];
                    objectNode[key].forEach((item, idx) => {
                        var arrFoundObj = me.filterNLevelObject(item, keyToFind, valueToFind, `${path}.${key}[${idx}]`)
                        if (!Ext.Object.isEmpty(arrFoundObj)) {
                            retval.push(arrFoundObj)
                        }
                    });
                    
                    if (!Ext.Object.isEmpty(retval)) {
                        foundObj[key] = retval;
                    }
                }

                try {
                    //foundObj = objectNode[key] = me.filterNLevelObject(objectNode[key], keyToFind, valueToFind, `${path}.${key}`);
                }
                catch (e) {
                    console.error(e);
                }

                //return true;
            });
        }
        else if (typeof objectNode == "string") {
            if (objectNode.includes(keyToFind)) {
                return objectNode;
            }
        }
        else if (typeof objectNode == "number") {
            if (String(objectNode).includes(keyToFind)) {
                return objectNode;
            }
        }
        else if (typeof objectNode == "boolean") {
            if (String(objectNode).includes(keyToFind)) {
                return objectNode;
            }
        }

        return {
            ...foundObj,
        };
    },
    findNestedObj: function (entireObj, keyToFind, valToFind) {
        let foundObj;

        JSON.stringify(entireObj, (keyName, keyValue, a, b, c) => {
            if (keyToFind == keyName) {
                foundObj = keyValue;
            }
            return keyValue;
        });

        return foundObj;
    }
});
