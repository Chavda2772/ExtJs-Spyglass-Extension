Ext.define('Spyglass.view.JsonDataViewer', {
    extend: 'Ext.panel.Panel',
    requires: ['Spyglass.controller.JsonDataViewerController'],

    alias: ['widget.jsonDataViewer'],
    controller: 'jsonDataViewerController',
    viewModel: {
        data: {
            emptyJson: true,
            sortedOrder: 'asc'
        }
    },
    // Custom Config
    LoadedJson: {},

    scrollable: true,
    width: '100%',
    items: [
        {
            xtype: 'textfield',
            itemId: 'txtSearchField',
            emptyText: 'Search ...',
            width: '100%',
            listeners: {
                change: 'onSearchJson'
            }
        },
        {
            xtype: 'component',
            itemId: 'cmpViewer',
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
