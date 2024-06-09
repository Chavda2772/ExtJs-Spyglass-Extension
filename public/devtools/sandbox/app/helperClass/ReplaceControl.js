export class ReplaceControl {
    constructor(config) {
        try {
            var component = Ext.getCmp(config.compId);

            // Find component
            if (!component) {
                return {
                    isSuccess: false,
                    message: 'Component not found !!'
                }
            }

            // Create clone
            var cloneCmp = Ext.create(component);
            var parent = component.up();

            // Add to parent if found
            if (parent) {
                var itemIndx = parent.items.indexOf(component);

                // Replace item at same index 
                parent.insert(itemIndx, cloneCmp);
            }

            // Make visible
            if (!cloneCmp.isVisible())
                cloneCmp.setVisible(true);

            // hide atual component
            component.hide();

            return {
                isSuccess: true,
            }

        } catch (e) {
            console.error(e);
            return {
                isSuccess: false,
                message: e.message
            }
        }
    }
}