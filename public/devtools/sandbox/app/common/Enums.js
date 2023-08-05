import enums from '../../../../config/Enums.js';

console.log('Enums import', enums);

Ext.define('CL.common.Enums', {
  singleton: true,
  alternateClassName: 'Enums',

  ...enums,
});
