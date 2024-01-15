Ext.define('Spyglass.controller.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewportController',

    onComponentSelected: function (data) {
        var me = this;
        var view = me.getView();
        var vm = me.getViewModel();

        vm.set({
            recordId: data.get('id'),
            isExtComponent: data.get('isExtComponent')
        });

        view.down('#dvJsonViewer').fireEvent('loadComponentJson', data, vm.get('mode') == "read");
        view.down('#tvJsonTree').fireEvent('loadComponentJson', data, vm.get('mode') == "tree");
    },
    onAfterRender: function (viewport, eOpts) {
        // Callback EventListener
        window.addEventListener('message', event => {
            if (event.data.callbackID) {
                if (typeof CommonHelper.callbacks[event.data.callbackID] == 'function') {
                    CommonHelper.callbacks[event.data.callbackID](event.data);
                }
            }
            else {
                var data = JSON.parse(event.data.componentDetails);
                var returnVal = {};

                if (data.operationType == 'emptydetail')
                    CommonHelper.showToast("No Component details found for element.");
                else if (data.operationType == 'error')
                    CommonHelper.showToast(data.message);
                else
                    returnVal = data;

                viewport.down('#dvComponentHierarchy').fireEvent('loadCompData', returnVal);
            }
        }, false);
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
        var view = this.getView();

        Ext.create('Spyglass.view.AddConfig', {
            listeners: {
                addConfig: function (config) {
                    var updateConfig = {
                        [config.keyName]: config.value
                    };

                    CommonHelper.postParentMessage(`new (${Spyglass.helperClass.UpdateComponent.toString()})(${JSON.stringify(updateConfig)}, '${view.LoadedJson.id}')`)
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
    onSortOrderChange: function (btn) {
        var view = this.getView();

        view.getViewModel().set('sortedOrder', btn.SortOrder);
        view.down('#dvJsonViewer').fireEvent('changeSortOrder', btn.SortOrder);
    },
    onComponentRedefine: function (button) {
        var me = this;
        var view = me.getView();
        
        var config = {
            compId: view.getViewModel().get('recordId'),
            reDefineType: button.redefineType
        }

        CommonHelper.postParentWithResponse({
            script: `new (${Spyglass.helperClass.RedefineComponent.toString()})(${JSON.stringify(config)})`
        });
    },
});
