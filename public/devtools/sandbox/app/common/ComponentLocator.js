export class ComponentLocator {
    targetDomElement;
    component;
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
    includeProps = ['initialConfig'];
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
            componentConfiguration: this.getComponentConfiguration(Ext.clone(targetComponent)),
        });

        if (targetComponent.up()) {
            componentHierarchy.push(...this.getComponentHierarchy(targetComponent.up()));
        }

        return componentHierarchy;
    }

    getComponentConfiguration(objectNode, keyName) {
        var me = this;
        var objDetails = {};

        Object.keys(objectNode).forEach((key) => {
            try {
                if (typeof objectNode[key] === 'object') {
                    if (!me.excludeProps.includes(objectNode[key])) {
                        //debugger;
                        if (me.includeProps.includes(key)) {
                            objDetails = { ...objDetails, ...me.getChildConfigs(objectNode[key]) }
                            debugger;
                        }
                        //console.log((keyName || "") + "/" + key)
                        //JSON.stringify(objectNode[key], me.customReplacer)
                        //objDetails = { ...objDetails, ...me.fetchNestedLevels(objectNode[key], 0, 2, (keyName || "") + "/" + key) }
                        //objDetails[key] = "{ Has Child Elements }";

                    }
                }
                else {
                    objDetails[key] = objectNode[key];
                }
            } catch (e) {
                console.error(e)
                debugger;
            }
        });

        return {
            className: objectNode.$className,
            ...objDetails,
        };
    }

    getChildConfigs(configuration) {
        var me = this;
        var withoutExclu = {};

        //debugger;
        // Without exclude
        Object.keys(configuration).forEach((key) => {
            debugger;
            if (typeof configuration[key] === 'object') {
                if (!me.excludeProps.includes(configuration[key])) {
                    withoutExclu = { ...withoutExclu, ...me.getChildConfigs(configuration[key]) }
                }
            }
            else {
                withoutExclu[key] = configuration[key];
            }
        });

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

    customReplacer(key, value) {
        // Ignore the '$initParent' property
        //debugger;
        if (excludeProps.includes(key)) {
            return null;
        }
        return value;
    }
}
