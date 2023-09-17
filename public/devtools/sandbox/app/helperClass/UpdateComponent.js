export class UpdateComponent {
    constructor(config, id) {
        var me = this;
        try {
            var comp = me.comp = Ext.getCmp(id);
            var reqData = JSON.parse(config);
            var destinationConfig = reqData;
            var firstKeyName = Object.keys(destinationConfig)[0];

            var isSuccess = me.getLastComponetInstance(comp, firstKeyName, destinationConfig[firstKeyName])

            return {
                success: isSuccess,
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

    getLastComponetInstance(componentConfig, key, configValue) {
        var me = this;

        if (typeof configValue == 'object') {
            var childKey = Object.keys(configValue)[0];
            var compConfig = {};

            if (Ext.isArray(configValue)) {
                // for component config
                if (!Ext.isArray(componentConfig[key])) {
                    if (Ext.isArray(componentConfig[key][key])) {
                        compConfig = componentConfig[key][key];
                    }
                    else {
                        compConfig = componentConfig[key];
                    }
                }
                else {
                    compConfig = componentConfig[key];
                }

                // for key
                configValue.forEach((item, idx) => {
                    if (item) {
                        childKey = idx + ''
                    }
                });

            }
            else if (componentConfig[key] == undefined) {
                var keyMethod = 'get' + key.substring(0, 1).toUpperCase() + key.substring(1);
                if (typeof componentConfig[keyMethod] == 'function') {
                    compConfig = componentConfig[keyMethod]()
                }
            }
            else {
                compConfig = componentConfig[key];
            }

            var isSuccess = me.getLastComponetInstance(compConfig, childKey, configValue[childKey]);

            if (!isSuccess) {
                if (componentConfig.isInstance) {
                    return me.setRecursiveValue(componentConfig, key, configValue);
                } else {
                    return false;
                }
            }

            return isSuccess;
        }
        else {
            if (componentConfig.isInstance) {
                var setterMethod = 'set' + key.substring(0, 1).toUpperCase() + key.substring(1);

                if (typeof componentConfig[setterMethod] == 'function') {
                    componentConfig[setterMethod](configValue);
                }
                else {
                    componentConfig.setConfig({
                        [key]: configValue
                    });
                }

                return true;
            }
            else {
                return false;
            }
        }
    }

    setRecursiveValue(componentConfig, key, configValue) {
        var me = this;

        debugger;

        if (typeof configValue == 'object') {
            var childComp = componentConfig[key];
            var objKeys = Object.keys(childComp);
            var hasChildInstance = false;

            objKeys.forEach(item => {
                if (childComp[item]?.isInstance) {
                    hasChildInstance = true;
                }
            });

            if (hasChildInstance) {
                return me.setValueOnly(componentConfig, key, configValue);
            }
            else {
                var merged = me.mergeConfigsObjects(childComp, configValue);
                componentConfig.setConfig({
                    [key]: merged
                });
                return true;
            }
        }
        else {
            componentConfig.setConfig({
                [key]: configValue
            })
            return true;
        }
    }

    setValueOnly(componentConfig, key, configValue, path = '') {
        var me = this;
        if (typeof configValue == 'object') {
            var firKey = Object.keys(configValue)[0];
            var retVal = me.setValueOnly(componentConfig, firKey, configValue[firKey], key + '.' + firKey);
            return retVal;
        }
        else {
            const pathArray = path.split('.');
            let currentObj = componentConfig;

            for (let i = 0; i < pathArray.length - 1; i++) {
                const loopkey = pathArray[i];
                if (!currentObj[loopkey] || typeof currentObj[loopkey] !== 'object') {
                    currentObj[loopkey] = {};
                }
                currentObj = currentObj[loopkey];
            }

            const finalKey = pathArray[pathArray.length - 1];
            currentObj[finalKey] = configValue;

            return true;
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