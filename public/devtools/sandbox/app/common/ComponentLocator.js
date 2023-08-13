export class ComponentLocator {
    targetDomElement;
    component;
    excludeProps = [
        "$initParent",
        "$configWatch",
        "$iid",
        "bodyElement",
        "buttonElement",
        "$owner",
        "activeRanges",
        "container",
        "_container",
        "_innerWrapper",
        "inheritedState",
        "el",
        "dom",
        "ownerLayout",
        "ownerCt",
        "owner",
        "ownerCmp",
        "component",
        "layout",
        "_layout",
        "parent",
        "items",
        "observable",
        "controller",
        "scope",
        "ev",
        "manager",
        "field",
        "scheduler",
        "view",
        "stub",
        "root",
        "_field",
        "_parent",
        "element",
        "map",
        "ownerGrid",
        "_indicators",
        "_partners",
        "managedListeners",
        "selfPartner",
        "_trueStore",
        "_selectable",
        "parentMenu",
        "beforeload",
        "events",
        "ownerFocusableContainer",
        "groupConfig",
        "focusableKeyNav",
        "_groupConfig",
        "observers",
        "lastOptions",
        "sorters",
        "ownerTree",
        "_headerContainer",
        "_plugins",
        "$outerWrapper",
        "grid",
        "_grid",
        "scroller",
        "_scroller",
        "treeStore",
        "store",
        "internalScope",
        "_sorterOptionsScope",
        "_view",
        "collection",
        "_collection",
        "$sortable",
        "selectionModel",
        "_selectionModel",
        "processEventScope",
        "viewListeners",
        "target",
        "_target",
        "sender",
        "schema",
        "nameHolder",
        "toolOwner",
        '_pinnedHeader',
        'pinnedHeader',
        '_collapsible',
        'collapsible',
        'list',
        "focusEl",
        "_constrain",
        'dragZone',
        "plugins",
        "innerItems",
        "_titleBar",
        "$delegatedEvents",
        "_viewModel",
        "pendingActiveItem"
    ];
    //includeProps = ['initialConfig', 'columns', 'listeners', 'selectable', 'store'];
    constructor(element) {
        var me = this;

        me.targetDomElement = element;
        me.component = Ext.Component.from(element);
        var componentListDetails = this.getComponentHierarchy(this.component);

        debugger;
        //var detail = me.getDataWithoutExcludedPropertys(me.component);
        var temp = JSON.stringify({
            componentDetails: { ...componentListDetails }
        });
        debugger;
        return temp; 
    }

    getComponentHierarchy(targetComponent) {
        var me = this;
        var componentHierarchy = [];

        componentHierarchy.push({
            name: targetComponent.xtype,
            className: targetComponent.$className,
            filePath: Ext.Loader.getPath(targetComponent.$className),
            config: { ...me.getComponentConfiguration(Ext.clone(targetComponent.getConfig())) },
            initialConfig: { ...me.getComponentConfiguration(Ext.clone(targetComponent.getInitialConfig())) },
        });

        if (targetComponent.up()) {
            componentHierarchy.push(...this.getComponentHierarchy(targetComponent.up()));
        }

        return componentHierarchy;
    }

    // Get Excluded propertys
    getDataWithoutExcludedPropertys(component) {
        var me = this;

        try {
            // get path in replacer ***********************************************
            var componentJson = JSON.stringify(component, function (key, value) {
                //debugger;
                if (me.excludeProps.includes(key)) {
                    return null;
                }
                else if (Array.isArray(value)) {
                    console.log(key);
                    return ['Data fetching pending ....'];
                    // **
                    // Need to improve array as it exceed call stack
                    // **
                    var data = [];
                    if (!value.length) {
                        return data;
                    }

                    return value.map(function (item) {
                        if (typeof item == 'object') {
                            data.push(me.getDataWithoutExcludedPropertys(item));
                        }
                        else {
                            data.push(item)
                        }
                    });
                }
                console.log(key);
                return value;
            });

            return JSON.parse(componentJson);

        } catch (e) {
            const regex = /property '(.*)' closes the circle/gm;
            let messages;
            var wordMatch = '';

            while ((messages = regex.exec(e)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (messages.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                messages.forEach((match) => {
                    if (!match.includes('property')) {
                        wordMatch = match;
                    }
                });
            }
            console.error(e);
            if (!me.excludeProps.includes(wordMatch)) {
                me.excludeProps.push(wordMatch);
            }
            me.getDataWithoutExcludedPropertys(component);
        }
    }


    // Basic filter
    getComponentBasicConfiguration(objectNode) {
        var me = this;
        //const objDetails = {};

        var initialConfig = me.getComponentConfiguration(objectNode.getInitialConfig());
        var config = me.getComponentConfiguration(objectNode.getConfig());

        return {
            initialConfig,
            config,
        };
    }
    // Advance Filter
    getComponentConfiguration(objectNode, keyName = '/') {
        var me = this;
        let objDetails = {};

        Object.keys(objectNode).forEach((key) => {
            try {
                if (!me.excludeProps.includes(key)) {
                    console.log(keyName + key);
                    if (objectNode[key] == null) {
                        objDetails[key] = null;
                    }
                    else if (objectNode[key] == undefined) {
                        objDetails[key] = undefined;
                    }
                    else if (typeof objectNode[key] === 'object') {
                        if (Array.isArray(objectNode[key])) {
                            objDetails[key] = objectNode[key].map(item => {
                                if (typeof item === 'object' && !Array.isArray(item)) {
                                    return me.getComponentConfiguration(item, keyName + key + '/');
                                }
                                return item;
                            });
                        } else if (Ext.Object.isEmpty(objectNode[key])) {
                            objDetails[key] = {};
                        } else {
                            objDetails[key] = me.getComponentConfiguration(objectNode[key], keyName + key + '/');
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

        // Without exclude
        Object.keys(configuration).forEach((key) => {
            if (typeof configuration[key] === 'object') {
                if (Array.isArray(configuration[key])) {
                    //objDetails[key] = objectNode[key].map(item => {
                    //    if (typeof item === 'object' && !Array.isArray(item)) {
                    //        return me.getComponentConfiguration(item);
                    //    }
                    //    return item;
                    //});
                } else if (Ext.Object.isEmpty(configuration[key])) {
                    withoutExclu[key] = {};
                } else if (!me.excludeProps.includes(configuration[key])) {
                    withoutExclu[key] = me.getChildConfigs(configuration[key]);
                }

                //if (!me.excludeProps.includes(configuration[key])) {
                //    withoutExclu = { ...withoutExclu, ...me.getChildConfigs(configuration[key]) }
                //}
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

    getObjectPropertyConfig(propObject) {
        var me = this;
        var propConfig = {};


        Object.keys(configuration).forEach((key) => {
            if (typeof configuration[key] === 'object') {
                //debugger;
                if (Array.isArray(configuration[key])) {
                    //debugger;
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
}
