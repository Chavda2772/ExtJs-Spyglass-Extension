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

        me.viewerInstance.showJSON({});
    },
    onLoadComponentJson: function (selection, isActiveView) {
        var me = this;
        var view = me.getView();
        var vm = view.getViewModel();

        view.LoadedJson = selection.data;

        if (Ext.Object.isEmpty(selection)) {
            me.viewerInstance.showJSON({});
            vm.set('emptyJson', true);
        }
        else {
            vm.set('emptyJson', false);
        }

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

                    vm.set('emptyJson', Ext.Object.isEmpty(orderObj));

                    me.viewerJsonData = orderObj;
                    me.viewerInstance.showJSON(orderObj);                    
                    me.filterData();

                } catch (e) {
                    vm.set('emptyJson', true);
                    console.error("Error While loading data :- ", e);
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

        me.filterData();
    },
    onClearSearch: function () {
        this.getView().down('#txtSearchField').setValue('');
    },
    onSpecialKeyPress: function (text, e, eOpts) {
        var me = this;

        if (e.getKeyName() == 'ESC') {
            me.onClearSearch()
        }
    },

    // Helper function
    filterData: function () {
        var me = this;
        var search = me.getViewModel().get('searchText');

        if (!search)
            return true;

        var retdata = me.filterNLevelObject(Ext.clone(me.viewerJsonData), search, "", "me.viewerJsonData");
        me.viewerInstance.showJSON(retdata);
    },
    filterNLevelObject: function (objectNode, keyToFind, valueToFind, path) {
        var me = this;
        var foundObj = {};

        if (Ext.isObject(objectNode)) {
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
        else if (Ext.isString(objectNode)) {
            if (objectNode.includes(keyToFind)) {
                return objectNode;
            }
        }
        else if (Ext.isNumber(objectNode) || Ext.isBoolean(objectNode)) {
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
