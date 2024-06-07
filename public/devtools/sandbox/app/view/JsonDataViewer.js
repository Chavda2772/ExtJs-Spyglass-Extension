Ext.define('Spyglass.view.JsonDataViewer', {
    extend: 'Ext.panel.Panel',
    requires: ['Spyglass.controller.JsonDataViewerController'],

    alias: ['widget.jsonDataViewer'],
    controller: 'jsonDataViewerController',
    viewModel: {
        data: {
            emptyJson: true,
            sortedOrder: 'asc',
            searchText: ''
        }
    },

    // Custom Config
    LoadedJson: {},

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'txtSearchField',
                    emptyText: 'Search ...',
                    flex: 1,
                    bind: {
                        hidden: '{emptyJson}',
                        value: '{searchText}'
                    },
                    listeners: {
                        change: 'onSearchJson',
                        specialkey: 'onSpecialKeyPress'
                    }
                },
                {
                    xtype: 'button',
                    text: 'clear',
                    tooltip: 'clear',
                    ui: 'default-toolbar-small',
                    bind: {
                        hidden: '{!searchText}'
                    },
                    handler: 'onClearSearch'
                }
            ]
        },
        {
            xtype: 'component',
            itemId: 'cmpViewer',
            scrollable: true,
            flex: 1,
        }
    ],

    listeners: {
        afterrender: 'onAfterrender',
        loadComponentJson: 'onLoadComponentJson',
        refreshData: 'onRefreshData',
        changeSortOrder: 'onChangeSortOrder'
    },
});
