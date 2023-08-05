Ext.define('Spyglass.MainViewport', {
  extend: 'Ext.container.Viewport',
  requires: ['Spyglass.view.DataviewHierarchy', 'Spyglass.view.JsonDataViewer'],

  alias: ['widget.mainViewport'],
  layout: 'border',
  defaults: {
    split: true,
  },
  viewModel: {
    data: {
      jsonData: JSON.stringify([
        {
          id: 1,
          first_name: 'Claudio',
          last_name: 'Bernardini',
          email: 'cbernardini0@taobao.com',
          gender: 'Male',
          ip_address: '229.59.223.255',
          child: {
            id: 3,
            first_name: 'Guenna',
            last_name: 'Haslock(e)',
            email: 'ghaslocke2@plala.or.jp',
            gender: 'Non-binary',
            ip_address: '168.104.112.162',
          },
        },
        {
          id: 2,
          first_name: 'Clem',
          last_name: 'Christophe',
          email: 'cchristophe1@barnesandnoble.com',
          gender: 'Female',
          ip_address: '71.116.221.191',
        },
      ]),
    },
  },
  items: [
    {
      title: 'hierarchy',
      region: 'center',
      collapsible: false,
      scrollable: true,
      items: {
        xtype: 'dataviewHierarchy',
      },
    },
    {
      title: 'Details',
      region: 'east',
      itemId: 'compDetailView',
      collapsible: true,
      width: '50%',
      layout: 'fit',
      items: {
        xtype: 'jsonDataViewer',
      },
    },
  ],

  listeners: {
    afterrender: function (viewport, eOpts) {
      window.addEventListener(
        'message',
        (event) => {
          // if Error Message
          if (event.data.isError) {
            Ext.toast(event.data.value);
            return;
          }

          viewport
            .down('#dvComponentList')
            .getStore()
            .setData(event.data.componentDetails);
        },
        false
      );
    },
  },
});
