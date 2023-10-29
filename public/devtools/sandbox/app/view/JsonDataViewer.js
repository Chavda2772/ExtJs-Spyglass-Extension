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

    tbar: {
        bind: {
            hidden: '{emptyJson}'
        },
        items: [
            {
                xtype: 'segmentedbutton',
                items: [
                    {
                        text: 'ASC',
                        SortOrder: 'asc',
                        handler: 'onSortViewerData',
                        bind: {
                            pressed: '{sortedOrder == "asc"}',
                        },
                    },
                    {
                        text: 'DESC',
                        SortOrder: 'desc',
                        handler: 'onSortViewerData',
                        bind: {
                            pressed: '{sortedOrder == "desc"}',
                        },
                    }
                ],
            }
        ]
    },

    listeners: {
        afterrender: 'onAfterrender',
        loadComponentJson: 'onLoadComponentJson',
        detailViewChange: 'onDetailViewChange'
    },
});
