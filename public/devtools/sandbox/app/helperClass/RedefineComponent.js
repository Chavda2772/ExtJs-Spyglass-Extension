export class RedefineComponent {
    constructor(config) {
        var me = this;
        try {
            // Redefine specific class
            if (config.isClassRedefine) {
                var clsName = me.getClassName(config.className);

                if (!clsName) {
                    return {
                        isSuccess: false,
                        message: 'Class Not found. Enter valid className.'
                    };
                }

                try {
                    var filePath = me.getFilePath(clsName);

                    return {
                        ...me.requestFileContent(filePath)
                    };

                }
                catch (e) {
                    console.error(e);
                    return {
                        isSuccess: false,
                        message: e.message
                    }
                }
            }

            // Redefine componet
            var component = Ext.getCmp(config.compId);

            if (component.$className.startsWith('Ext.'))
                return true;

            // Redefine view
            if (config.reDefineType == 'both' || config.reDefineType == 'view') {
                var compView = me.getFilePath(component.$className);
                me.requestFileContent(compView);
            }

            // Redefine Controller
            if (config.reDefineType == 'both' || config.reDefineType == 'controller') {
                if (!component.defaultListenerScope && !Ext.Object.isEmpty(component.getController())) {
                    var compController = me.getFilePath(component.getController().$className)
                    me.requestFileContent(compController);
                }
            }

            return {
                isSuccess: true,
            }

        } catch (e) {
            console.error(e);
            return {
                isSuccess: false,
                message: e.message
            }
        }
    }

    getFilePath(cmpClassName) {
        var filePath = Ext.Loader.getPath(cmpClassName)
        var location = window.location;
        var originalPath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));

        return window.location.origin + originalPath + '/' + filePath;
    }

    requestFileContent(filePath) {
        var isSuccess = false;
        var message = '';

        Ext.Ajax.request({
            url: filePath,
            async: false,
            callback: function (eopts, success, response) {
                if (success) {
                    new Function(response.responseText)();                    
                    isSuccess = true;
                }
                else {
                    message = 'Cannot redefine component. This may use production builds or using a bundler.';
                    console.error(message);
                }
            }
        });

        return {
            isSuccess,
            message
        };
    }

    getClassName(className) {
        var clsName = className;

        // Check if alternative classname
        var altClassName = Ext.ClassManager.alternateToName[className];
        if (altClassName) return altClassName;

        // Check class is there
        var fullName = Ext.ClassManager.lookupName(clsName, false);
        if (fullName) return clsName;

        return '';
    }
}