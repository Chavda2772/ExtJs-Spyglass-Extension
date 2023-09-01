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

        if (isExtension) {
            window.addEventListener('message', event => {
                // if Error Message
                if (event.data.isError) {
                    console.error(event.data)
                    Ext.toast({
                        html: event.data.value,
                        closable: false,
                        align: 't',
                        slideDUration: 400,
                        maxWidth: 400
                    });
                    return;
                }

                var data = JSON.parse(event.data.componentDetails);
                viewport.down('#dvComponentHierarchy').fireEvent('loadCompData', data);
            }, false);
        }
        else {
            viewport.down('#dvComponentHierarchy').fireEvent('loadCompData', tempData.data);
            window.addEventListener('message', event => {
                // if Error Message
                if (event.data.isError) {
                    console.error(event.data)
                    Ext.toast({
                        html: event.data.value,
                        closable: false,
                        align: 't',
                        slideDUration: 400,
                        maxWidth: 400
                    });
                    return;
                }

                var data = JSON.parse(event.data.componentDetails);
                viewport.down('#dvComponentHierarchy').fireEvent('loadCompData', data);
            }, false);
        }
    },
    onChangeView: function (button, e) {
        this.getViewModel().set({
            mode: button.mode
        });
    }
});
