Ext.define('Image', {
  extend: 'Ext.data.Model',
  fields: ['month'],
});

Ext.define('CL.view.Main', {
  extend: 'Ext.container.Viewport',

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
      items: [
        {
          xtype: 'dataview',
          itemId: 'dvComponentList',
          store: {
            fields: ['name', 'email'],
            data: [
              {
                name: 'button',
                className: 'Ext.button',
              },
            ],
          },
          tpl:
            '<tpl for=".">' +
            '<div class="list-item">' +
            '<h4>{name}</h4>' +
            '<p>{className}</p>' +
            '</div>' +
            '</tpl>',
          itemSelector: 'div.list-item',
          emptyText: 'No items to display',
          cls: 'custom-list',
          listeners: {
            selectionchange: function (dataview, selected, eOpts) {
              if (!selected[0]) {
                Ext.toast('No record selected');
                return true;
              }
              dataview.view.up('viewport').getViewModel().set({
                jsonData: selected[0].data.componentConfiguration,
              });
            },
          },
        },
      ],
    },
    {
      title: 'Details',
      region: 'east',
      collapsible: true,
      width: '50%',
      flex: 1,
      items: {
        xtype: 'panel',
        bind: {
          html: '<pre>{jsonData}</pre>',
        },
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
