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
    includedFunctions = ['initConfig', 'formulas', 'getId', 'getColumnsMenuItem', 'getCollapsible'];
    LEVEL_LIMIT = 4;
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

    // Advance Filter
    getComponentConfiguration(objectNode, keyName = '/') {
        var me = this;
        let objDetails = {};

        Object.keys(objectNode).forEach((key) => {
            try {
                objDetails[key] = me.stringify(Ext.clone(objectNode[key]), key, objectNode)
            } catch (e) {
                console.error(e);
            }
        });

        return {
            ...objDetails,
        };
    }

    stringify(value, key, component, level = 0) {
        if (value === null) {
            return null;
        }

        if (value === undefined) {
            return undefined;
        }

        if (Ext.isArray(value)) {
            if (level > this.LEVEL_LIMIT) {
                return "[[Array]]";
            }

            return value.map((item) => {
                return this.stringify(item, key, component, level + 1)
            });

        }

        if (Ext.isFunction(value)) {
            if (this.includedFunctions.includes(key)) {
                return this.stringify(component[key](), key, component, level + 1);
            }
            return "[[Function]]";
        }

        if (Ext.isObject(value)) {
            if (level > this.LEVEL_LIMIT) {
                return "[[Object]]";
            }

            if (value.isBinding || value.$className === "Ext.app.bind.Binding") {
                return {
                    path: this.getBindPath(value, component, key),
                    value: this.stringify(value.getRawValue(), key, component, level + 1),
                };
            }

            if (value.isViewModel) {
                return {
                    data: this.stringify(value.getData(), key, component, level + 1),
                    formulas: this.stringify(value.getFormulas(), key, component, level + 1),
                };
            }

            if (value.isModel) {
                return this.stringify(value.data, key, component, level + 1);
            }

            if (value.isSession || value.isInstance) {
                return this.stringify(value.initialConfig, key, component, level + 1);
            }

            var res = {};
            Ext.Object.getKeys(value || {}).map((key) => {
                res[key] = this.stringify(value[key], key, component, level + 1);
            });

            return res;
        }

        return value;
    }

    getBindPath(bind, component, key) {
        if (bind.isMultiBinding) {
            return component.initialConfig.bind[key];
        }

        if (bind.stub) {
            return bind.stub.linkDescriptor || `{${bind.stub.path}}` || undefined;
        }

        if (bind.tpl) {
            return bind.tpl.text || "";
        }
        return undefined;
    }
}