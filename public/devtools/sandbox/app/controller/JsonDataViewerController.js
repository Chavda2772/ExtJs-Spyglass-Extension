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
    onLoadComponentJson: function (selection) {
        this.viewerInstance.showJSON(selection.data);
    },
});
