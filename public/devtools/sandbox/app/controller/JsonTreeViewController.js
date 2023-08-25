Ext.define('Spyglass.controller.JsonTreeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jsonTreeViewController',

    onLoadCompData: function (data) {
        this.getView().items.items[0].getStore().setRoot(data)
    }
});
