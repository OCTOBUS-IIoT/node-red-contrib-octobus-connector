module.exports = function (RED) {
    function OctobusPayload(config) {
        RED.nodes.createNode(this, config);
        this.dataType = config.dataType;
        this.assetId = config.assetId;
        this.measurementId = config.measurementId;
        var node = this;
        node.on('input', function (msg) {
            value = msg.payload
            msg.payload = {
                "assetId": node.assetId,
                "measurementId": node.measurementId,
                "dataType": node.dataType,
                "timestamp": new Date(),
                "value": value
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("octobus-payload", OctobusPayload);
}
