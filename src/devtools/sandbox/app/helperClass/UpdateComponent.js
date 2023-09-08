export class UpdateComponent {
    constructor(config, id) {
        var me = this;
        try {
            var comp = Ext.getCmp(id);
            var reqData = JSON.parse(config);
            var destinationConfig = reqData;
            var sourceConfig = comp.initialConfig;


            Object.keys(destinationConfig).forEach((item) => {
                if (item.startsWith('_')) {
                    var keyName = item.substring(1);
                    destinationConfig[keyName] = destinationConfig[item];
                    delete destinationConfig[item];
                }
            });

            var mergedProps = me.mergeConfigsObjects(sourceConfig, destinationConfig);
            if (!Ext.Object.isEmpty(comp) && !Ext.Object.isEmpty(mergedProps)) {
                comp.setdConfig(mergedProps);
            }

            return {
                success: true,
            }
        }
        catch (e) {
            console.error(e);
            return {
                success: false,
                message: e.message
            }
        }
    }

    mergeConfigsObjects(source, destination) {
        var me = this;

        if (Array.isArray(source) && Array.isArray(destination)) {
            const maxLength = Math.max(source.length, destination.length);
            const mergedArray = new Array(maxLength);

            for (let i = 0; i < maxLength; i++) {
                const sourceItem = source[i];
                const destItem = destination[i];

                if (sourceItem !== undefined && destItem !== undefined) {
                    // Both items exist, handle them based on type
                    if (typeof sourceItem === 'object' && typeof destItem === 'object') {
                        // If both items are objects, recursively merge them
                        mergedArray[i] = me.mergeConfigsObjects(sourceItem, destItem);
                    } else {
                        // Otherwise, use the destination item
                        mergedArray[i] = destItem;
                    }
                } else if (destItem !== undefined) {
                    // Only destination item exists
                    mergedArray[i] = destItem;
                } else if (sourceItem !== undefined) {
                    // Only source item exists
                    mergedArray[i] = sourceItem;
                }
            }

            return mergedArray;
        }

        if (typeof source !== 'object' || typeof destination !== 'object') {
            // If either source or destination is not an object, return the destination
            return destination;
        }

        const result = Ext.apply({}, source);

        for (const key in destination) {
            if (destination.hasOwnProperty(key)) {
                if (source.hasOwnProperty(key)) {
                    const sourceValue = source[key];
                    const destValue = destination[key];

                    if (typeof sourceValue === 'object' && typeof destValue === 'object') {
                        // If both values are objects, recursively merge them
                        result[key] = me.mergeConfigsObjects(sourceValue, destValue);
                    } else {
                        // Otherwise, use the destination value
                        result[key] = destValue;
                    }
                } else {
                    // If the property exists only in destination, add it to the result
                    result[key] = destination[key];
                }
            }
        }

        if (source && typeof source === 'object' && destination !== null && typeof destination === 'object') {
            for (const key in source) {
                if (source.hasOwnProperty(key) && !destination.hasOwnProperty(key)) {
                    // If the property exists only in source, add it to the result
                    result[key] = source[key];
                }
            }
        }

        return result;
    }
}