Ext.define('Spyglass.controller.DataviewHierarchyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dataviewHierarchyController',

    onLoadCompData: function (compData) {
        this.getView().getStore().setData(compData);
    },

    onSelectionChange: function (dataview, selected, eOpts) {
        var me = this;
        if (!selected[0]) {
            Ext.toast('No record selected');
            return true;
        }

        me.getView().fireEvent('componentSelected', selected[0]);
    },
    onItemDoubleClick: function (view, record, item, index, e, eOpts) {

        var template = `
        console.group("Comp Details :- " + '${record.data.id}')
        console.log("Component ", Ext.getCmp('${record.data.id}'))
        console.log("ViewModel ", Ext.getCmp('${record.data.id}').lookupViewModel())
        console.groupEnd()
        `;

        CommonHelper.postParentMessage({ script: template });
        Ext.toast("Component details print to console.");
    }
});
