export class ComponentLocator {
    targetDomElement;
    component;
    componentConfig;
    componentInitialConfig;
    excludeProps = [
        '$initParent',
        "$configWatch",
        "$iid",
        "bodyElement",
        "buttonElement",
        'container',
        '_container',
        '_innerWrapper',
        'inheritedState',
        'el',
        'dom',
        'ownerLayout',
        'ownerCt',
        'owner',
        'ownerCmp',
        'component',
        'layout',
        'parent',
        'items',
        'observable',
        'controller',
        'scope',
        'ev',
        'manager',
        'field',
        'scheduler',
        'view',
        'stub',
        'root',
        '_field',
        '_parent'
    ];
    //includeProps = ['initialConfig', 'columns', 'listeners', 'selectable', 'store'];
    constructor(element) {
        this.targetDomElement = element;
        this.component = Ext.Component.from(element);
        return {
            componentDetails: this.getComponentDetails(this.component),
        };
    }

    // Get Component Details
    getComponentDetails() {
        const compData = this.getComponentHierarchy(this.component);
        //debugger;
        return JSON.stringify(compData);
    }

    getComponentHierarchy(targetComponent) {
        var componentHierarchy = [];

        componentHierarchy.push({
            name: targetComponent.xtype,
            className: targetComponent.$className,
            filePath: Ext.Loader.getPath(targetComponent.$className),
            ...this.getComponentBasicConfiguration(Ext.clone(targetComponent)),
        });

        if (targetComponent.up()) {
            componentHierarchy.push(...this.getComponentHierarchy(targetComponent.up()));
        }

        return componentHierarchy;
    }

    // Basic filter
    getComponentBasicConfiguration(objectNode) {
        var me = this;
        const objDetails = {};
        debugger;
        var initConfig = me.getComponentConfiguration(objectNode.getInitialConfig());
        var config = me.getComponentConfiguration(objectNode.getConfig());

        debugger;
        return {
            ...objDetails,
        };
    }
    // Advance Filter
    getComponentConfiguration(objectNode) {
        var me = this;
        let objDetails = null;

        Object.keys(objectNode).forEach((key) => {
            try {
                if (!me.excludeProps.includes(key)) {
                    if (typeof objectNode[key] === 'object') {
                        if (Array.isArray(objectNode[key])) {
                            objDetails[key] = objectNode[key].map(item => {
                                if (typeof item === 'object' && !Array.isArray(item)) {
                                    return me.getComponentConfiguration(item);
                                }
                                return item;
                            });
                        } else if (Ext.Object.isEmpty(objectNode[key])) {
                            objDetails[key] = {};
                        } else {
                            objDetails[key] = me.getComponentConfiguration(objectNode[key]);
                        }
                    } else {
                        objDetails[key] = objectNode[key];
                    }
                }
            } catch (e) {
                console.error(e);
            }
        });

        return {
            ...objDetails,
        };
    }


    getChildConfigs(configuration) {
        var me = this;
        var withoutExclu = {};

        //debugger;
        // Without exclude
        Object.keys(configuration).forEach((key) => {
            if (typeof configuration[key] === 'object') {
                if (!me.excludeProps.includes(configuration[key])) {
                    withoutExclu = { ...withoutExclu, ...me.getChildConfigs(configuration[key]) }
                }
            }
            else {
                withoutExclu[key] = configuration[key];
            }
        });
        //debugger;
        return withoutExclu;
    }

    fetchNestedLevels(obj, depth, maxDepth, keyName) {
        var me = this;

        if (depth > maxDepth) {
            return null; // Stop recursion if depth exceeds the limit
        }

        if (typeof obj !== 'object' || obj === null) {
            return obj; // Base case: return non-objects directly
        }

        const result = {};

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = me.fetchNestedLevels(obj[key], depth + 1, maxDepth);
            }
        }

        return result;
    }

    getObjectPropertyConfig(propObject) {
        var me = this;
        var propConfig = {};


        Object.keys(configuration).forEach((key) => {
            if (typeof configuration[key] === 'object') {
                debugger;
                if (Array.isArray(configuration[key])) {
                    debugger;
                }
                else {
                    if (!me.excludeProps.includes(propObject)) {
                        propConfig = { ...propConfig, ...me.getObjectPropertyConfig(propObject) }
                    }
                }
            }
            else {
                propConfig[key] = configuration[key];
            }
        });

        return propConfig;
    }

    customReplacer(key, value) {
        // Ignore the '$initParent' property
        //debugger;
        if (excludeProps.includes(key)) {
            return null;
        }
        return value;
    }
}
