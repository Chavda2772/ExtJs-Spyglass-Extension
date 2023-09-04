import { HoverIn } from './app/helperClass/HoverIn.js';
import { HoverOut } from './app/helperClass/HoverOut.js';
import { UpdateComponent } from './app/helperClass/UpdateComponent.js';
import { ComponentDetail } from './app/helperClass/ComponentDetail.js';

Ext.application({
    requires: [
        // This will automatically load all classes in the Spyglass namespace
        // so that application classes do not need to require each other.
        'Spyglass.common.Enums',
        'Spyglass.view.Viewport',
    ],

    name: 'Spyglass',
    appFolder: 'app',

    mainView: 'Spyglass.view.Viewport',
    launch: function () {
        Spyglass.helperClass = {
            HoverIn,
            HoverOut,
            UpdateComponent,
            ComponentDetail
        }
    },
});
