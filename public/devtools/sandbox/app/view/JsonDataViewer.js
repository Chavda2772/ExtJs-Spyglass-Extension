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

    listeners: {
        afterrender: 'onAfterrender',
        loadComponentJson: 'onLoadComponentJson',
        refreshData: 'onRefreshData',
        changeSortOrder: 'onChangeSortOrder',
        filterData: 'onFilterData'
    },
});
