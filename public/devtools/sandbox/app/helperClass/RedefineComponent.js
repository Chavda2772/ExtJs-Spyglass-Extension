export class RedefineComponent {
    constructor(compId) {
        var me = this;
        try {
            var component = Ext.getCmp(compId);

            if (!component.$className.startsWith('Ext.')) {
                var cmpPath = me.getFilePath(component.$className);

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

    }
}