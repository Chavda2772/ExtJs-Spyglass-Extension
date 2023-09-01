Ext.define('Spyglass.common.CommonHelper', {
    singleton: true,
    alternateClassName: 'CommonHelper',

    postParentMessage: function (script) {
        window.parent.postMessage({ script: script, }, '*');
    },
});
