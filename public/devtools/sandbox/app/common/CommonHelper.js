Ext.define('Spyglass.common.CommonHelper', {
    singleton: true,
    alternateClassName: 'CommonHelper',

    postParentMessage: function (code) {
        var execute = {
            script: code.script,
        };
        window.parent.postMessage(execute, '*');
    },
});
