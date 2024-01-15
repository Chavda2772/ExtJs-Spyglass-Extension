Ext.define('Spyglass.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Spyglass.view.JsonDataViewer',
        'Spyglass.controller.ViewportController',
        'Spyglass.view.JsonTreeView',
        'Spyglass.view.HierarchyGrid',
        'Spyglass.view.RedefineFile',
        'Spyglass.common.CommonHelper',
    ],

    alias: ['widget.mainViewport'],
    controller: 'viewportController',
    layout: 'border',
    defaults: {
        split: true,
    },
    viewModel: {
        data: {
            mode: 'read',
            sortedOrder: 'asc',
            isEmptyView: true,

            // Record
            cmpId: '',
            isExtComponent: false
        },
    },
    items: [
        {
            region: 'center',
            collapsible: false,
            width: '40%',
            flex: 1,
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
            tbar: {
                items: [
                    {
                        iconCls: 'x-fas fa-bars',
                        menu: [
                            {
                                text: 'Add Config',
                                iconCls: 'x-fas fa-plus',
                                tooltip: 'Add new Configuration',
                                handler: 'onAddConfig'
                            },
                            {
                                text: 'Redefine class',
                                iconCls: 'x-fas fa-file-contract',
                                tooltip: 'Redefine specific class',
                                handler: 'onRedefineFile'
                            },
                        ]
                    },
                    {
                        text: 'Refresh',
                        tooltip: 'Refresh component details',
                        iconCls: 'x-fa fa-sync-alt',
                        handler: 'onRefreshDetail'
                    },
                    {
                        xtype: 'splitbutton',
                        text: 'Redefine',
                        iconCls: 'x-fab fa-rev',
                        tooltip: 'Redefine Component',
                        handler: 'onComponentRedefine',
                        redefineType: 'both',
                        bind: {
                            hidden: '{isExtComponent}'
                        },
                        menu: [
                            {
                                text: 'Controller Only',
                                iconCls: 'x-fa fa-gamepad',
                                redefineType: 'controller',
                                handler: 'onComponentRedefine'
                            },
                            {
                                text: 'View Only',
                                iconCls: 'x-fa fa-eye',
                                redefineType: 'view',
                                handler: 'onComponentRedefine'
                            }
                        ],
                    },
                    '->',
                    {
                        xtype: 'segmentedbutton',
                        bind: {
                            hidden: '{mode != "read"}',
                        },
                        items: [
                            {
                                iconCls: 'x-fas fa-sort-alpha-down',
                                tooltip: 'Sort Ascending',
                                SortOrder: 'asc',
                                handler: 'onSortOrderChange',
                                bind: {
                                    pressed: '{sortedOrder == "asc"}',
                                },
                            },
                            {
                                iconCls: 'x-fas fa-sort-alpha-up-alt',
                                tooltip: 'Sort Descending',
                                SortOrder: 'desc',
                                handler: 'onSortOrderChange',
                                bind: {
                                    pressed: '{sortedOrder == "desc"}',
                                }
                            }
                        ]
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
