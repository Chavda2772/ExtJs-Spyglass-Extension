Ext.define('Spyglass.common.CommonHelper', {
    singleton: true,
    alternateClassName: 'CommonHelper',

    postParentMessage: function (config) {
        window.parent.postMessage({ script: config.script, }, '*');
    },
});
