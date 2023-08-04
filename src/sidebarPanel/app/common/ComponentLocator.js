export class ComponentLocator {
  targetDomElement;
  component;
  constructor(element) {
    this.targetDomElement = element;
    this.component = Ext.Component.from(element);
    return {
      componentDetails: this.getComponentDetails(this.component),
    };
  }

  // Get Component Details
  getComponentDetails() {
    return this.getComponentHierarchy(this.component);
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
