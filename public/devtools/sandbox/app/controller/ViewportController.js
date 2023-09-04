Ext.define('Spyglass.controller.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewportController',

    onComponentSelected: function (data) {
        var me = this;
        var view = me.getView();

        view.down('#dvJsonViewer').fireEvent('loadComponentJson', data);
        view.down('#tvJsonTree').fireEvent('loadComponentJson', data);
    },
    onAfterRender: function (viewport, eOpts) {
        // Callback EventListener
        window.addEventListener('message', event => {
            if (event.data.callbackID) {
                if (typeof CommonHelper.callbacks[event.data.callbackID] == 'function') {
                    CommonHelper.callbacks[event.data.callbackID](event.data);
                }
            }
            else {
                var data = JSON.parse(event.data.componentDetails);
                viewport.down('#dvComponentHierarchy').fireEvent('loadCompData', data);
            }
        }, false);
    },
    onChangeView: function (button, e) {
        this.getViewModel().set({
            mode: button.mode
        });
    },
    onBeforeRender(viewport, eOpts) {
        var me = this;
        var vm = me.getViewModel();

        var template = 'typeof Ext == "object"';
        CommonHelper.postParentWithResponse({
            script: template,
            success: function (data) {
                vm.set({
                    isEmptyView: !data
                });
            },
            error: function (error) {
                console.error(error);
            }
        });
    }
});
