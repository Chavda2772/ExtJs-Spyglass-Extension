Ext.define('Spyglass.controller.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewportController',

    onComponentSelected: function (data) {
        var me = this;
        var view = me.getView();

        view.down('#dvJsonViewer').fireEvent('loadComponentJson', data);
    },
    onAfterRender: function (viewport, eOpts) {
        window.addEventListener('message', event => {
            // if Error Message
            if (event.data.isError) {
                console.error(event.data)
                Ext.toast(event.data.value);
                return;
            }

            var data = JSON.parse(event.data.componentDetails);
            viewport.down('#dvComponentHierarchy').fireEvent('loadCompData', data);
        }, false);
    },
});
