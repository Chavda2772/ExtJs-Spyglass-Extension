Ext.define('Spyglass.view.AddConfig', {
    extend: 'Ext.window.Window',

    alias: ['widget.addConfig'],

    title: 'Add Config',
    modal: true,
    width: 500, 
    minHeight: 300,
    closable: true,
    defaultFocus: '#txtConfigKey',
    maximizable: false,
    bodyPadding: 10,
    defaultListenerScope: true,
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
                text: 'Save',
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
            itemId: 'frmConfig',
            defaultType: 'textfield',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyPadding: 5,
            border: false,
            items: [
                {
                    fieldLabel: 'Config Name',
                    itemId: 'txtConfigKey',
                    name: 'keyName',
                    msgTarget: 'under',
                    allowBlank: false,
                },
                {
                    fieldLabel: 'Config Value',
                    itemId: 'txtConfigValue',
                    name: 'value',
                    msgTarget: 'under',
                    allowBlank: false,
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Config Type',
                    name: 'configType',
                    forceSelection: true,
                    editable: false,
                    store: {
                        fields: ['display', 'valueField'],
                        data: [
                            { display: 'String', valueField: 'string' },
                            { display: 'Number', valueField: 'number' },
                            { display: 'Boolean', valueField: 'boolean' },
                        ],
                    },
                    queryMode: 'local',
                    displayField: 'display',
                    valueField: 'valueField',
                    value: 'string'
                }
            ]
        }
    ],
    onClose: function (button) {
        this.close();
    },
    onSave: function (button) {
        var view = this;
        var form = view.down('#frmConfig');
        var frmValues = form.getValues();

        // Validate
        if (!form.isValid()) {
            form.items.items.filter((item) => {
                return !item.isValid()
            })[0].focus();
            return;
        }

        if (frmValues.configType == 'number') {
            var valuefld = view.down('#txtConfigValue');

            if (isNaN(Number(frmValues.value))) {
                valuefld.markInvalid('Provide Valid number');
                valuefld.focus();
                return;
            }

            frmValues.value = Number(frmValues.value);
        }

        if (frmValues.configType == 'boolean')
            frmValues.value = frmValues.value.toLowerCase() == 'true';

        view.fireEvent('addConfig', frmValues)
        view.close();
    }
});