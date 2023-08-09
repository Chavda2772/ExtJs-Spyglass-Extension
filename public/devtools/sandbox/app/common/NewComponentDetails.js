export class NewComponentDetails {
    LEVEL_LIMIT = 4;

    constructor(element) {
        var targetComponent = Ext.Component.fromElement(element);
        var componentStore = [];

        while (targetComponent) {
            componentStore.unshift(this.getComponentInfo(targetComponent));

            targetComponent = this.getParentComponent(targetComponent);
        }

        debugger;
        return {
            componentStore: JSON.stringify(componentStore),
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
                }/../${Ext.ClassManager.getPath(component.$className || "")}`,
            bind: JSON.stringify(
                this.stringify(component.getBind(), component),
                null,
                2
            ),
            initialConfig: JSON.stringify(
                this.stringify(component.initialConfig, component),
                null,
                2
            ),
            defaultConfig: JSON.stringify(
                this.stringify(component.defaultConfig, component),
                null,
                2
            ),
            viewModel: JSON.stringify(
                this.stringify(component.getViewModel(), component),
                null,
                2
            ),
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

    stringify(val, cmp, key, level = 0) {
        if (val === null) return val;
        if (val === undefined) return "undefined";
        if (Ext.isPrimitive(val)) return Ext.htmlEncode(val);
        if (Ext.isArray(val)) {
            if (level > this.LEVEL_LIMIT) return "[[Array]]";

            return val.map((i) => this.stringify(i, cmp, undefined, level + 1));
        }
        if (Ext.isFunction(val)) return "[[Function]]";

        if (Ext.isObject(val)) {
            if (level > this.LEVEL_LIMIT) return "[[Object]]";

            if (val.isBinding || val.$className === "Ext.app.bind.Binding") {
                return {
                    path: this.getBindPath(val, cmp, key),
                    value: this.stringify(val.getRawValue(), cmp, level + 1),
                };
            }
            if (val.isViewModel) {
                return {
                    data: this.stringify(val.getData(), cmp, key, level + 1),
                    formulas: this.stringify(val.getFormulas(), cmp, key, level + 1),
                };
            }

            if (val.isModel) {
                return this.stringify(val.data, cmp, key, level + 1);
            }

            if (val.isSession || val.isInstance) {
                return this.stringify(val.initialConfig, cmp, key, level + 1);
            }

            var res = {};
            Ext.Object.getKeys(val || {}).map((k) => {
                res[k] = this.stringify(val[k], cmp, k, level + 1);
            });

            return res;
        }

        return Ext.toString(val);
    }
}
