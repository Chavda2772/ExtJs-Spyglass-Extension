Ext.define('Spyglass.view.DataviewHierarchy', {
  extend: 'Ext.view.View',

  alias: ['widget.dataviewHierarchy'],

  scrollable: true,
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
});
