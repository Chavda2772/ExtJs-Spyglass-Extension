export class RedefineComponent {
    constructor(compId) {
        var me = this;
        try {
            var component = Ext.getCmp(compId);

            if (!component.$className.startsWith('Ext.')) {
                var compView = me.getFilePath(component.$className);

                me.requestFileContent(compView);

                if (!component.defaultListenerScope && !Ext.Object.isEmpty(component.getController())) {
                    var compController = me.getFilePath(component.getController().$className)
                    me.requestFileContent(compController);
                }

            } else {
                console.log("Ext js component cannot redefine")
            }

        } catch (e) {
            //debugger;
        }
    }

    getFilePath(cmpClassName) {
        var filePath = Ext.Loader.getPath(cmpClassName)
        var location = window.location;
        var originalPath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));

        return window.location.origin + originalPath + '/' + filePath;
    }

    requestFileContent(filePath) {
        Ext.Ajax.request({
            url: filePath,
            async: false,
            callback: function (eopts, isSuccess, response) {
                if (isSuccess)
                    eval(response.responseText);
            }
        })
    }
}