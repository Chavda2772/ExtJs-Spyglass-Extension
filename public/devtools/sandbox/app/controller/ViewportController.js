Ext.define('Spyglass.controller.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewportController',

    onComponentSelected: function (data) {
        var me = this;
        var view = me.getView();
        var vm = me.getViewModel();

        if (Ext.Object.isEmpty(data)) {
            vm.set({
                emptyComponentData: true
            });
        }
        else {
            vm.set({
                cmpId: data.get('id'),
                isExtComponent: data.get('isExtComponent'),
                emptyComponentData: false
            });
        }

        view.down('#dvJsonViewer').fireEvent('loadComponentJson', data, vm.get('mode') == "read");
        view.down('#tvJsonTree').fireEvent('loadComponentJson', data, vm.get('mode') == "tree");
    },
    onAfterRender: function (viewport, eOpts) {
        var vm = this.getView().getViewModel();

        // Callback EventListener
        window.addEventListener('message', event => {
            if (event.data.callbackID) {
                if (typeof CommonHelper.callbacks[event.data.callbackID] == 'function') {
                    CommonHelper.callbacks[event.data.callbackID](event.data);
                }
            }
            else {
                // data validation
                if (!event.data.componentDetails)
                    return true;

                var data = JSON.parse(event.data.componentDetails);
                var returnVal = {};
                var isEmptyView = false

                if (data.operationType == 'emptydetail')
                    CommonHelper.showToast("No Component details found for element.");
                else if (data.operationType == 'error') {
                    if (data.message == "Ext is not defined") {
                        isEmptyView = true;
                    }
                    else {
                        CommonHelper.showToast(data.message);
                    }
                }
                else {
                    returnVal = data;
                }

                if (vm.get('isEmptyView') != isEmptyView) {
                    vm.set({
                        isEmptyView: isEmptyView
                    });
                }

                viewport.down('#dvComponentHierarchy').fireEvent('loadCompData', returnVal);
            }
        }, false);

        // Get component hierarchy details
        CommonHelper.postParentWithResponse({
            script: `new (${Spyglass.helperClass.ComponentHierarchy.toString()})($0)`,
            success: function (response) {
                var data = JSON.parse(response.componentDetails);

                if (data.operationType == 'emptydetail') {
                    CommonHelper.showToast("No Component details found for element.");
                }

                if (data.operationType == 'error' && data.message != "Ext is not defined") {
                    CommonHelper.showToast(data.message);
                }

                viewport.down('#dvComponentHierarchy').fireEvent('loadCompData', data);
            },
            error: function (error) { }
        });
    },
    onChangeView: function (button, e) {
        var me = this;
        var view = me.getView();
        var vm = me.getViewModel();

        vm.set({
            mode: button.mode
        });

        if (button.mode == "read") {
            view.down('#dvJsonViewer').fireEvent('refreshData');
        }
        else if (button.mode == "tree") {
            view.down('#tvJsonTree').fireEvent('refreshData');
        }

    },
    onBeforeRender(viewport, eOpts) {
        var me = this;
        var vm = me.getViewModel();

        var template = 'typeof Ext?.versions == "object"';
        CommonHelper.postParentWithResponse({
            script: template,
            success: function (data) {
                vm.set({
                    isEmptyView: !data
                });
            },
            error: function (error) {
                console.error(error);
            }
        });
    },
    onAddConfig: function (button) {
        var me = this;
        var vm = me.getView().getViewModel();

        Ext.create('Spyglass.view.AddConfig', {
            listeners: {
                addConfig: function (config) {
                    var cmpId = vm.get("cmpId");
                    var updateConfig = {
                        [config.keyName]: config.value
                    };

                    CommonHelper.postParentWithResponse({
                        script: `new (${Spyglass.helperClass.UpdateComponent.toString()})(${JSON.stringify(updateConfig)}, '${cmpId}')`,
                        success: function () {
                            me.onRefreshDetail();
                        }
                    })
                }
            }
        }).show();
    },
    onRefreshDetail: function () {
        // get active view
        var me = this;
        var view = me.getView();
        var mode = view.getViewModel().get('mode');

        if (mode == 'read') {
            view.down('#dvJsonViewer').fireEvent('refreshData');
        }
        else if (mode == 'tree') {
            view.down('#tvJsonTree').fireEvent('refreshData');
        }
    },
    onToggleSortBtn: function (btn, pressed, eOpts) {
        var view = this.getView();
        var order = pressed ? 'desc' : 'asc';

        view.getViewModel().set('sortedOrder', order);
        view.down('#dvJsonViewer').fireEvent('changeSortOrder', order);
    },
    onComponentRedefine: function (button) {
        var me = this;
        var view = me.getView();

        var config = {
            compId: view.getViewModel().get('cmpId'),
            reDefineType: button.redefineType
        }

        CommonHelper.postParentWithResponse({
            script: `new (${Spyglass.helperClass.RedefineComponent.toString()})(${JSON.stringify(config)})`
        });
    },
    onRedefineFile: function () {
        var me = this;

        Ext.create({
            xtype: 'redefineFile',
        }).show();
    }
});
