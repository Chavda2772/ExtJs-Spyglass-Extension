Ext.define('Spyglass.controller.JsonDataViewerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jsonDataViewerController',

    viewerId: '',
    viewerInstance: null,
    viewerJsonData: {},

    onAfterrender: function () {
        var me = this;
        var view = me.getView();

        me.viewerId = 'jsonViewer-' + view.id;
        me.viewerInstance = new JSONViewer();

        view.setHtml('<div id="' + me.viewerId + '"></div>');
        view.el.dom
            .querySelector('#' + me.viewerId)
            .appendChild(me.viewerInstance.getContainer());
    },
    onLoadComponentJson: function (selection, isActiveView) {
        var me = this;
        var view = me.getView();

        view.LoadedJson = selection.data;

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
    onFilterData: function (val) {
        var me = this;        
        retdata = me.findNestedObj(me.viewerJsonData, val);
    },

    // Helper function
    findNestedObj: function (entireObj, keyToFind, valToFind) {
        let foundObj;
        JSON.stringify(entireObj, (_, nestedValue) => {
            if (nestedValue && nestedValue[keyToFind] === valToFind) {
                foundObj = nestedValue;
            }
            return nestedValue;
        });
        return foundObj;
    }
});
