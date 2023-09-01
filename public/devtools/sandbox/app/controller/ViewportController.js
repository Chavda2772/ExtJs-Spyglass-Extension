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
        // Temp Changes
        var isExtension = true;

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

        if (!isExtension) {
            viewport.down('#dvComponentHierarchy').fireEvent('loadCompData', tempData.data);
        }
    },
    onChangeView: function (button, e) {
        this.getViewModel().set({
            mode: button.mode
        });
    }
});
