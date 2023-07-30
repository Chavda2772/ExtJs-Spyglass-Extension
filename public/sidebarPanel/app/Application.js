Ext.application({
  name: 'CL',

  launch: function () {
    // comment added
    Ext.create('CL.view.Main');
  },
});

// window.addEventListener('message', (event) => {
//   event.source.postMessage(
//     {
//       success: true,
//       resData: {
//         name: 'mahesh',
//       },
//     },
//     event.origin
//   );
// });
