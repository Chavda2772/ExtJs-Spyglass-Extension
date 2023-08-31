Ext.define('Spyglass.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Spyglass.view.DataviewHierarchy',
        'Spyglass.view.JsonDataViewer',
        'Spyglass.controller.ViewportController',
        'Spyglass.view.JsonTreeView',
        'Spyglass.common.CommonHelper',
        'Spyglass.common.TempData',
    ],

    alias: ['widget.mainViewport'],
    controller: 'viewportController',
    layout: 'border',
    defaults: {
        split: true,
    },
    viewModel: {
        data: {
            mode: 'tree'
        }
    },
    items: [
        {
            title: 'hierarchy',
            region: 'center',
            collapsible: false,
            scrollable: true,
            items: {
                xtype: 'dataviewHierarchy',
                itemId: 'dvComponentHierarchy',
                listeners: {
                    componentSelected: 'onComponentSelected',
                },
            },
        },
        {
            title: 'Details',
            region: 'east',
            itemId: 'compDetailView',
            collapsible: true,
            width: '70%',
            layout: 'vbox',
            header: {
                items: [
                    {
                        xtype: 'segmentedbutton',
                        items: [
                            {
                                tooltip: 'Read Mode',
                                iconCls: 'x-fa fa-book',
                                mode: 'read',
                                handler: 'onChangeView',
                                bind: {
                                    pressed: '{mode == "read"}',
                                },
                            },
                            {
                                tooltip: 'Tree View',
                                iconCls: 'x-fa fa-tree',
                                mode: 'tree',
                                handler: 'onChangeView',
                                bind: {
                                    pressed: '{mode == "tree"}',
                                },
                            }
                        ],
                    }
                ]
            },
            items: [
                {
                    xtype: 'jsonDataViewer',
                    itemId: 'dvJsonViewer',
                    flex: 1,
                    bind: {
                        hidden: '{mode != "read"}'
                    },
                },
                {
                    xtype: 'JsonTreeView',
                    itemId: 'tvJsonTree',
                    flex: 1,
                    bind: {
                        hidden: '{mode != "tree"}'
                    },
                }
            ],
        },
    ],

    listeners: {
        afterrender: 'onAfterRender',
    },
});
