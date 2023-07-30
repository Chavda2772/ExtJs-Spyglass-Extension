Ext.define('CL.view.Main', {
  extend: 'Ext.container.Viewport',

  layout: 'border',
  items: [
    {
      region: 'center',
      xtype: 'panel',
      items: [
        {
          xtype: 'button',
          text: 'Send Message',
          handler: function (event) {
            window.parent.postMessage('message', '*');
          },
        },
        {
          xtype: 'button',
          itemId: 'lblSample',
          text: 'sample',
        },
      ],
    },
  ],
  listeners: {
    afterrender: function (viewport, eOpts) {
      window.addEventListener(
        'message',
        (event) => {
          viewport.down('#lblSample').setText(event.data);
        },
        false
      );
    },
  },
});
