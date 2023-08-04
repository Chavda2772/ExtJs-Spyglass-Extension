export class ComponentLocator {
  constructor(element) {
    var extElement = Ext.Component.from(element);
    return {
      componentDetails: this.getComponentDetails(extElement),
    };
  }

  // Get Component Details
  getComponentDetails(component) {
    return this.getComponentHierarchy(component);
  }

  getComponentHierarchy(targetComponent) {
    var componentHierarchy = [];

    componentHierarchy.push({
      name: targetComponent.xtype,
      className: targetComponent.$className,
      componentConfiguration: this.getComponentConfiguration(
        Ext.clone(targetComponent)
      ),
    });

    if (targetComponent.up()) {
      componentHierarchy.push(
        ...this.getComponentHierarchy(targetComponent.up())
      );
    }

    return componentHierarchy;
  }

  getComponentConfiguration(component) {
    return component.$className;
  }
}
