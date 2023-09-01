Ext.define('Spyglass.controller.HierarchyGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hierarchyGridController',

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
        var template = `new (${Spyglass.helperClass.HoverIn.toString()})('${record.data.id}')`;
        CommonHelper.postParentMessage({ script: template })
    },
    onItemMouseLeave: function (column, record, item, index, e, eOpts) {
        var template = `new (${Spyglass.helperClass.HoverOut.toString()})`;
        CommonHelper.postParentMessage({ script: template });
    }
});
