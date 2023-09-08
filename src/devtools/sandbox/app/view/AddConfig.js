Ext.define('Spyglass.view.AddConfig', {
    extend: 'Ext.panel.Panel',

    alias: ['widget.addConfig'],

    title: 'Add Config',
    modal: true,
    fixed: true,
    width: 500,
    height: '100%',
    floating: true,
    closable: true,
    defaultAlign: 'tr-br?',
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
                            { display: 'Number', valueField: 'number' },
                            { display: 'String', valueField: 'string' },
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

        if (frmValues.configType == 'number' && isNaN(frmValues.value)) {
            var valuefld = view.down('#txtConfigValue');

            valuefld.markInvalid('Provide Valid number');
            valuefld.focus();
            return;
        }

        if (frmValues.configType == 'boolean')
            frmValues.value = frmValues.value.toLowerCase() == 'true';

        view.fireEvent('addConfig', frmValues)
        view.close();
    }
});