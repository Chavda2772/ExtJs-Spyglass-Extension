Ext.define('Spyglass.MainViewport', {
  extend: 'Ext.container.Viewport',

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
      items: [
        {
          xtype: 'dataview',
          itemId: 'dvComponentList',
          store: {
            fields: ['name', 'email'],
            data: [
              {
                name: 'toolbar',
                className: 'Ext.Toolbar',
                componentConfiguration: {
                  className: 'Ext.Toolbar',
                  sampel: 'anc9.777543454996662',
                  chld: {
                    fileName: 50.98445507357414,
                  },
                },
              },
              {
                name: 'todoList',
                className: 'myApp.view.desktop.todolist.List',
                componentConfiguration: {
                  className: 'myApp.view.desktop.todolist.List',
                  sampel: 'anc95.25230416804966',
                  chld: {
                    fileName: 12.044744916827256,
                  },
                },
              },
              {
                name: 'todo',
                className: 'myApp.view.desktop.todo.Todo',
                componentConfiguration: {
                  className: 'myApp.view.desktop.todo.Todo',
                  sampel: 'anc17.505404439913995',
                  chld: {
                    fileName: 8.627702485621636,
                  },
                },
              },
              {
                name: 'container',
                className: 'Ext.Container',
                componentConfiguration: {
                  className: 'Ext.Container',
                  sampel: 'anc26.31613582352681',
                  chld: {
                    fileName: 16.475445004056823,
                  },
                },
              },
              {
                name: 'mainDesktop',
                className: 'myApp.view.desktop.Main',
                componentConfiguration: {
                  className: 'myApp.view.desktop.Main',
                  sampel: 'anc24.307791483030925',
                  chld: {
                    fileName: 43.04820867893868,
                  },
                },
              },
              {
                name: 'viewport',
                className: 'Ext.viewport.Default',
                componentConfiguration: {
                  className: 'Ext.viewport.Default',
                  sampel: 'anc78.68893861304218',
                  chld: {
                    fileName: 95.65179737319976,
                  },
                },
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

              var jsonViewer = new JSONViewer();

              document
                .querySelector('#JsonViwerData')
                .appendChild(jsonViewer.getContainer());

              jsonViewer.showJSON(selected[0].data.componentConfiguration);
              dataview.view.updateLayout();
              // dataview.view.up('viewport').getViewModel().set({
              //   jsonData: selected[0].data.componentConfiguration,
              // });
            },
          },
        },
      ],
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
