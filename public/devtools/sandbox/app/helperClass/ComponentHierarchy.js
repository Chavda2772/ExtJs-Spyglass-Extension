export class ComponentHierarchy {
    constructor(element) {
        try {
            var me = this;
            var component = Ext.Component.from(element);

            if (Ext.Object.isEmpty(component)) {
                return {
                    componentDetails: JSON.stringify({
                        operationType: "emptydetail",
                    }),
                }
            }

            return {
                componentDetails: JSON.stringify([...me.getComponentHierarchy(component)])
            };
        } catch (e) {
            return {
                componentDetails: JSON.stringify({
                    operationType: "error",
                    message: e.message,
                    errorStack: e
                })
            }
        }
    }

    getComponentHierarchy(targetComponent) {
        var me = this;
        var componentHierarchy = [];

        var componentDetail = {
            id: targetComponent.id,
            xtype: targetComponent.xtype,
            xtypes: targetComponent.xtypes,
            className: targetComponent.$className,
        };

        if (targetComponent.superclass.xtype == 'viewport') {
            componentDetail.id = targetComponent.el?.dom?.id;

            if (!componentDetail.id)
                componentDetail.id = targetComponent.id;

        }

        if (!componentDetail.xtype)
            componentDetail.xtype = targetComponent.superclass.xtype;

        if (!componentDetail.xtypes?.length)
            componentDetail.xtypes = componentDetail.superclass.xtypes;

        componentHierarchy.push(componentDetail);

        if (targetComponent.up()) {
            componentHierarchy.push(...me.getComponentHierarchy(targetComponent.up()));
        }

        return componentHierarchy;
    }
}