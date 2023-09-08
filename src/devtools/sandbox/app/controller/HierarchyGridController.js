Ext.define('Spyglass.controller.HierarchyGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hierarchyGridController',

    onLoadCompData: function (compData) {
        var view = this.getView();
        var store = view.getStore();

        store.setData(compData);

        if (Ext.Object.isEmpty(compData)) {
            view.fireEvent('componentSelected', {});
        }
        else {
            view.setSelection(store.getAt(0));
        }
    },

    onRecordSelect: function (dataview, record, index, eOpts) {
        var me = this;
        var view = me.getView();

        if (Ext.Object.isEmpty(record)) {
            Ext.toast('No record selected');
            return true;
        }

        view.fireEvent('componentSelected', record);
    },
    onItemDoubleClick: function (view, record, item, index, e, eOpts) {

        CommonHelper.postParentMessage(`
        console.group("Comp Details :- " + '${record.data.id}');
        console.log("Component ", Ext.getCmp('${record.data.id}'));
        console.log("ViewModel ", Ext.getCmp('${record.data.id}').lookupViewModel());
        console.log("Controller ", Ext.getCmp('${record.data.id}').lookupController());
        console.groupEnd();
        `);
        Ext.toast("Component details print to console.");
    },
    onRenderHierarchy: function (value, cell, record) {
        var view = this.getView();
        var tpl = view.lookupTpl('rowTpl');
        var returnValue = value;

        if (!Ext.Object.isEmpty(tpl)) {
            returnValue = tpl.apply(record.data);
        }

        return returnValue;
    },
    onItemMouseEnter: function (column, record, item, index, e, eOpts) {
        CommonHelper.postParentMessage(`new (${Spyglass.helperClass.HoverIn.toString()})('${record.data.id}')`)
    },
    onItemMouseLeave: function (column, record, item, index, e, eOpts) {
        CommonHelper.postParentMessage(`new (${Spyglass.helperClass.HoverOut.toString()})`);
    }
});
