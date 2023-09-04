Ext.define('Spyglass.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Spyglass.view.JsonDataViewer',
        'Spyglass.controller.ViewportController',
        'Spyglass.view.JsonTreeView',
        'Spyglass.view.HierarchyGrid',
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
            mode: 'tree',
            isEmptyView: true
        },
    },
    items: [
        {
            region: 'center',
            collapsible: false,
            scrollable: true,
            layout: 'fit',
            bind: {
                hidden: '{isEmptyView}'
            },
            items: {
                xtype: 'hierarchyGrid',
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
            width: '60%',
            layout: 'vbox',
            bind: {
                hidden: '{isEmptyView}'
            },
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
        {
            region: 'west',
            collapsible: false,
            scrollable: true,
            width: '100%',
            bind: {
                hidden: '{!isEmptyView}'
            },
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'No Ext JS Site.',
            }]
        }
    ],

    listeners: {
        afterrender: 'onAfterRender',
        beforerender: 'onBeforeRender'
    },
});
