export class UpdateComponent {
    constructor(config, id) {
        var comp = Ext.getCmp(id);
        var reqData = JSON.parse(config);

        if (!Ext.Object.isEmpty(comp) && !Ext.Object.isEmpty(reqData)) {
            comp.setConfig(reqData);
        }

        return {
            success: true,
        }
    }
}