Ext.define('Spyglass.controller.JsonDataViewerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jsonDataViewerController',

    viewerId: '',
    viewerInstance: null,

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
        if (isActiveView) 
            me.refreshComponentDetails(view.LoadedJson.id);
    },
    refreshComponentJson(compId) {
        var me = this;
        var view = me.getView();

        view.setLoading(true);
        CommonHelper.postParentWithResponse({
            script: `new (${Spyglass.helperClass.ComponentDetail.toString()})('${compId}')`,
            success: function ({ componentDetail }) {
                var jsonData = JSON.parse(componentDetail);

                me.viewerInstance.showJSON(jsonData);
                console.log("Data Loaded", jsonData);
                view.setLoading(false);
            },
            error: function (error) {
                CommonHelper.showToast(error);
                console.error(error);
                view.setLoading(false);
            }
        });
    },
    onDetailViewChange() {
        var me = this;
        me.refreshComponentJson(me.getView().LoadedJson.id);
    }
});
