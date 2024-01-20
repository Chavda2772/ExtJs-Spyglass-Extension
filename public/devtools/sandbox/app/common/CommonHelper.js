Ext.define('Spyglass.common.CommonHelper', {
    singleton: true,
    alternateClassName: 'CommonHelper',
    callbacks: {},

    postParentMessage: function (code) {
        this.postParentWithResponse({ script: code, });
    },
    postParentWithResponse: function (options) {
        var me = this;

        me.promisePostMessageCallback(options.script)
            .then((data) => {
                delete me.callbacks[data.callbackID];
                delete data.callbackID;

                if (data.isError && typeof options.error == 'function') {
                    options.error(data);
                }
                else if (typeof options.success == 'function') {
                    options.success(data.result);
                }
            })
            .catch(err => {
                if (typeof options.error == 'function')
                    options.error(err);
            })
    },
    promisePostMessageCallback: function (script) {
        return new Promise((resolve, reject) => {
            var me = this;
            var callbackID = Math.random().toString(36).substring(2);

            try {
                me.callbacks[callbackID] = function (data) {
                    resolve({ ...data });
                };

                // Send the message with the callback ID and the request
                window.parent.postMessage({ callbackID: callbackID, script: script }, "*");
            }
            catch (err) {
                delete this.callbacks[respose.callbackID];
                reject(err);
            }
        });
    },
    showToast: function (message) {
        Ext.toast({
            html: message,
            closable: false,
            align: 'b',
            slideDUration: 1000,
            width: 300
        });
    },
    sortObject: function (unSortObject, direction = "asc") {
        if (!Ext.isObject(unSortObject)) {
            console.error("No object found !!")
            return {};
        }

        var collectionList = Object.keys(unSortObject).sort();

        if (direction != 'asc')
            collectionList = collectionList.toReversed();

        try {
            return collectionList.reduce((obj, key) => {
                obj[key] = unSortObject[key];
                return obj;
            }, {});
        } catch (e) {
            console.error(e)
            return {};
        }
    }
});
