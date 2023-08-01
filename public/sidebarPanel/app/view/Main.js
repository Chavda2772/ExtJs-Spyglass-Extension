Ext.define('Image', {
  extend: 'Ext.data.Model',
  fields: ['month'],
});

const jsonData = {
  name: 'John',
  age: 28,
  email: 'john@example.com',
  address: {
    street: '123 Main St',
    city: 'New York',
    zip: '10001',
  },
};

Ext.define('CL.view.Main', {
  extend: 'Ext.container.Viewport',

  layout: 'border',
  defaults: {
    split: true,
  },
  items: [
    {
      title: 'hierarchy',
      region: 'center',
      collapsible: false,
      scrollable: true,
      items: Ext.create('Ext.view.View', {
        store: {
          id: 'imagesStore',
          model: 'Image',
          data: [
            {
              month: 'Jan',
            },
            {
              month: 'Feb',
            },
            {
              month: 'Mar',
            },
            {
              month: 'Apr',
            },
            {
              month: 'May',
            },
            {
              month: 'Jun',
            },
            {
              month: 'Jul',
            },
            {
              month: 'Aug',
            },
            {
              month: 'Sep',
            },
            {
              month: 'Oct',
            },
            {
              month: 'Nov',
            },
            {
              month: 'Dec',
            },
          ],
        },
        tpl: new Ext.XTemplate(
          '<tpl for=".">',
          '<div style="margin-bottom: 10px;" class="thumb-wrap"><div>{month}</div></div>',
          '</tpl>'
        ),
        itemSelector: 'div.thumb-wrap',
        emptyText: 'No images available',
        renderTo: Ext.getBody(),
      }),
    },
    {
      title: 'Details',
      region: 'east',
      collapsible: true,
      width: '50%',
      items: {
        xtype: 'panel',
        html: `<pre>${JSON.stringify(jsonData, null, 2)}</pre>`,
      },
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
