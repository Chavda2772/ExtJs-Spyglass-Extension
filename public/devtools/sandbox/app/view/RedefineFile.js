Ext.define('Spyglass.view.RedefineFile', {
    extend: 'Ext.window.Window',

    alias: ['widget.redefineFile'],

    title: 'Redefine Specific Class',
    modal: true,
    width: 500,
    minHeight: 180,
    defaultListenerScope: true,
    closable: true,
    defaultFocus: '#txtClassName',
    maximizable: false,
    bodyPadding: 10,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        defaults: {
            minWidth: 100
        },
        items: [
            {
                xtype: 'button',
                text: 'Redefine',
                handler: 'onSave'
            },
            {
                xtype: 'button', text: 'Close',
                handler: 'onClose'
            }
        ]
    }],

    items: [
        {
            xtype: 'form',
            itemId: 'frmClassConfig',
            defaultType: 'textfield',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyPadding: 5,
            border: false,
            items: [
                {
                    fieldLabel: 'Class Name',
                    itemId: 'txtClassName',
                    name: 'cmpClassName',
                    emptyText: 'ex.MyApp.view.Main OR Alternative ClassName ex.Enums',
                    msgTarget: 'under',
                    allowBlank: false,
                }
            ]
        }
    ],
    onClose: function (button) {
        this.close();
    },
    onSave: function (button) {
        var view = this;
        var form = view.down('#frmClassConfig');
        var txtClassName = view.down('#txtClassName');
        var frmValues = form.getValues();

        // Validate
        if (!form.isValid()) {
            form.items.items.filter((item) => {
                return !item.isValid()
            })[0].focus();
            return;
        }

        if (frmValues.cmpClassName.startsWith('Ext')) {
            txtClassName.markInvalid('Cannot redefine ExtJS class.');
            return false;
        }

        var config = {
            isClassRedefine: true,
            className: frmValues.cmpClassName
        }

        // Redefine request
        CommonHelper.postParentWithResponse({
            script: `new (${Spyglass.helperClass.RedefineComponent.toString()})(${JSON.stringify(config)})`,
            success: function (data) {
                if (data.isSuccess) {
                    CommonHelper.showToast(`Class: <b>${frmValues.cmpClassName}</b> redefine successfully.`);
                    view.close();
                }
                else
                    txtClassName.markInvalid(data.message);
            },
            error: function (err) {
                CommonHelper.showToast(err.message);
            }
        });
    }
});