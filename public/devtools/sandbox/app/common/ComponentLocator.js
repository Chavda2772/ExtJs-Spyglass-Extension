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
    includedFunctions = ['initConfig'];
    LEVEL_LIMIT = 4;
    //includeProps = ['initialConfig', 'columns', 'listeners', 'selectable', 'store'];
    constructor(element) {
        var me = this;
        try {

            me.targetDomElement = element;
            me.component = Ext.Component.from(element);
            //debugger;
            var componentListDetails = this.getComponentHierarchy(this.component);

            //var detail = me.getDataWithoutExcludedPropertys(me.component);
            var temp = {
                componentDetails: JSON.stringify([...componentListDetails])
            };
            return temp;
        } catch (e) {
            debugger;
        }
    }

    getComponentHierarchy(targetComponent) {
        var me = this;
        var componentHierarchy = [];

        componentHierarchy.push({
            name: targetComponent.xtype,
            className: targetComponent.$className,
            filePath: Ext.Loader.getPath(targetComponent.$className),
            ...me.getComponentConfiguration(Ext.clone(targetComponent))
        });

        if (targetComponent.up()) {
            componentHierarchy.push(...me.getComponentHierarchy(targetComponent.up()));
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
                //if (me.excludeProps.includes(key)) {
                //    if (Array.isArray(objectNode[key])) {
                //        objectNode[key] = '[[Array]]'
                //    }
                //    else {
                //        objectNode[key] = '[[Object]]'
                //    }
                //}
                //else {
                if (key == 'initConfig') {
                    debugger;
                }
                objDetails[key] = me.stringify(Ext.clone(objectNode[key]))
                //if (objectNode[key] == null) {
                //    objDetails[key] = null;
                //}
                //else if (objectNode[key] == undefined) {
                //    objDetails[key] = undefined;
                //}
                //else if (typeof objectNode[key] === 'object') {
                //    if (Array.isArray(objectNode[key])) {
                //        objDetails[key] = objectNode[key].map(item => {
                //            if (typeof item === 'object' && !Array.isArray(item)) {
                //                return me.getComponentConfiguration(item, keyName + key + '/');
                //            }
                //            return item;
                //        });
                //    } else if (Ext.Object.isEmpty(objectNode[key])) {
                //        objDetails[key] = {};
                //    } else {
                //        objDetails[key] = me.getComponentConfiguration(objectNode[key], keyName + key + '/');
                //    }
                //} else {
                //    objDetails[key] = objectNode[key];
                //}
                //}
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

    stringify(value, level = 0) {
        var me = this;

        if (value === null) {
            return null;
        }

        if (value === undefined) {
            return undefined;
        }

        if (Ext.isPrimitive(value)) {
            return Ext.htmlEncode(value);
        }

        if (Ext.isArray(value)) {
            if (level > this.LEVEL_LIMIT) {
                return "[[Array]]";
            }

            return value.map((item) => {
                return this.stringify(item, level + 1)
            });

        }

        if (Ext.isFunction(value)) {
            if (value.name == 'getId') {
                debugger;
            }
            if (me.includedFunctions.includes(value)) {
                debugger;;
            }
            return "[[Function]]";
        }

        if (Ext.isObject(value)) {
            if (level > this.LEVEL_LIMIT) {
                return "[[Object]]";
            }

            if (value.isBinding || value.$className === "Ext.app.bind.Binding") {
                return {
                    //path: this.getBindPath(value, component, key),
                    path: 'Working on it ....',
                    value: this.stringify(value.getRawValue(), level + 1),
                };
            }

            if (value.isViewModel) {
                return {
                    data: this.stringify(value.getData(), level + 1),
                    formulas: this.stringify(value.getFormulas(), level + 1),
                };
            }

            if (value.isModel) {
                return this.stringify(value.data, level + 1);
            }

            if (value.isSession || value.isInstance) {
                return this.stringify(value.initialConfig, level + 1);
            }

            var res = {};
            Ext.Object.getKeys(value || {}).map((key) => {
                res[key] = this.stringify(value[key], level + 1);
            });

            return res;
        }

        return value;
    }
}
