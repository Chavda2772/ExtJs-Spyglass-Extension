export class NewComponentDetails {
    LEVEL_LIMIT = 4;

    constructor(element, config) {
        var targetComponent = Ext.Component.fromElement(element);
        var componentStore = [];

        while (targetComponent) {
            componentStore.unshift(this.getComponentInfo(targetComponent));

            targetComponent = this.getParentComponent(targetComponent);
        }

        return {
            componentDetails: JSON.stringify(componentStore),
        };
    }

    getComponentInfo(component) {
        return {
            id: component.getId(),
            className: component.$className,
            hasVM: !!component.getViewModel(),
            hasRecord: component.isXType("gridrow") && !!component.getRecord(),
            record: JSON.stringify(
                this.stringify(
                    component.isXType("gridrow") ? component.getRecord() : null,
                    component
                ),
                null,
                2
            ),
            xtypes: component.xtypesChain || [],
            isHidden: component.isHidden(),
            isVisible: component.isVisible(),
            path: `${location.origin}${location.pathname
                }/${Ext.ClassManager.getPath(component.$className || "")}`,
            bind: JSON.stringify(
                this.stringify(component.getBind(), component),
                null,
                2
            ),
            initialConfig: this.stringify(component.initialConfig, component),
            defaultConfig: this.stringify(component.defaultConfig, component),
            viewModel: this.stringify(component.getViewModel(), component),
        };
    }

    getParentComponent(target) {
        if (target.ownerCmp) return target.ownerCmp;

        if (target.ownerCt) return target.ownerCt;

        if (target.isXType("gridcellbase")) {
            return target.getColumn();
        }

        // if (target.isMenuItem) {
        //   return target.parentMenu || target.menu;
        // }

        if (Ext.isFunction(target.getParent)) {
            return target.getParent();
        }
    }

    getBindPath(bind, cmp, key) {
        if (bind.isMultiBinding) {
            return cmp.initialConfig.bind[key];
        }

        if (bind.stub) {
            return bind.stub.linkDescriptor || `{${bind.stub.path}}` || "undefined";
        }

        if (bind.tpl) {
            return bind.tpl.text || "";
        }
        return "undefined";
    }

    stringify(value, component, key, level = 0) {
        if (value === null) return value;
        if (value === undefined) return "undefined";
        if (Ext.isPrimitive(value)) return Ext.htmlEncode(value);
        if (Ext.isArray(value)) {
            if (level > this.LEVEL_LIMIT) return "[[Array]]";

            return value.map((item) => this.stringify(item, component, undefined, level + 1));
        }
        if (Ext.isFunction(value)) return "[[Function]]";

        if (Ext.isObject(value)) {
            if (level > this.LEVEL_LIMIT) return "[[Object]]";

            if (value.isBinding || value.$className === "Ext.app.bind.Binding") {
                return {
                    path: this.getBindPath(value, component, key),
                    value: this.stringify(value.getRawValue(), component, level + 1),
                };
            }
            if (value.isViewModel) {
                return {
                    data: this.stringify(value.getData(), component, key, level + 1),
                    formulas: this.stringify(value.getFormulas(), component, key, level + 1),
                };
            }

            if (value.isModel) {
                return this.stringify(value.data, component, key, level + 1);
            }

            if (value.isSession || value.isInstance) {
                return this.stringify(value.initialConfig, component, key, level + 1);
            }

            var res = {};
            Ext.Object.getKeys(value || {}).map((key) => {
                res[key] = this.stringify(value[key], component, key, level + 1);
            });

            return res;
        }

        return value;
    }
}
