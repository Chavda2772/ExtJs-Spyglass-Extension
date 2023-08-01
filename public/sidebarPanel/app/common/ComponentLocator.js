export class ComponentLocator {
  constructor(element) {
    var targetComponent = Ext.Component.from(element);

    console.log('component Id ', targetComponent.id);

    return {
      componentDetails: targetComponent.id,
    };
  }
}
