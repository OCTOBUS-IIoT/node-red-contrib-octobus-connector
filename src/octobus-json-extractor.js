module.exports = function (RED) {
  function OctobusJsonExtractor(config) {

    RED.nodes.createNode(this, config);
    this.assets = config.assets;
    this.measurements = config.measurements;
    this.useTimestamp = config.useTimestamp;
    this.timestampId = config.timestampId;
    this.timezone = config.timezone;
    var node = this;

    node.on('input', function (messages,send) {
      var messagesObj;
      var outMessages = [];

      if (typeof messages.payload !== "object") {
        try {
          messagesObj = JSON.parse(messages.payload);
        }
        catch(e) {
          node.error("Input Format error: " + e)
        }
      }
      else {
        messagesObj = messages.payload;
      }

      // Multiple Messages in single input
      if(Array.isArray(messagesObj)) {
        try {
          messagesObj.forEach(msg => {
            var res = createOutPayload(msg,this.assets,this.measurements,this.useTimestamp,this.timestampId,this.timezone);
            if (res.error !== undefined) {
              node.error(res.error);
            }
            else {
              outMessages.push(...res.results);
            }
          });
        }
        catch(e) {
          node.error("Input Format error: " + e);
        }    
      }

      // Single Message in single input
      else {
        try {
          var res = createOutPayload(messagesObj,this.assets,this.measurement,this.useTimestamp,this.timestampId,this.timezone);
          if (res.error!=undefined) {
            node.error(res.error);
          }
          outMessages = res.results;
        }
        catch(e)
        {
          node.error("Input Format error: " + e);
        }   
      }

      this.status({fill:"green",shape:"ring",text:"Done"});
      outMessages.forEach(out => send(out))
    });
  }
  function createOutPayload(msg,assets,measurements,useTimestamp,timestampId,timezone) {
    const flatten = require('flat');
    var results = [];
    var error = undefined;

    const flatten_msg = flatten(msg);

    const deviceId = String(flatten_msg['id']); // ** Further development Create more input fill to insert key for deviceId

    var foundMatchAsset = assets.find(asset => asset.deviceId === deviceId);
    if (foundMatchAsset !== undefined) {       
          measurements.forEach(measurement => {
          const strVal = String(flatten_msg[measurement.propertyId]);
          
          if(strVal !== "undefined") { 

            // Create timestamp on Message Payload
            var moment = require('moment-timezone'); // require
            var datCalculator;
            var timestamp;
            // Use timestamp from input data
            if (useTimestamp == true) {
              datCalculator = moment.tz(String(flatten_msg[timestampId]), timezone);
              timestamp = new Date(datCalculator.format()).toISOString();
            }
            else {
              timestamp = new Date().toISOString();
            }

            const value = convertToDataType(strVal,measurement.dataType);
            
            const res = {
              payload : {
                "assetId": foundMatchAsset.assetId,
                "measurementId": measurement.measurementId,
                "dataType": measurement.dataType,
                "timestamp": timestamp,
                "value": value
                }
            }
            results.push(res);
          }
          else {
            error = 'Cannot find value according to: ' + measurement.propertyId;
          }
        })
    }
    else {
      error = 'Cannot find matched deviceId in message: ' + JSON.stringify(msg); 
    }
    return { results, error };
  }
  function convertToDataType(val,type) {
    switch(type) {
      case "integer":
        return +val;
      case "decimal":
        return +val;
      case "boolean":
        return Boolean(val);
      case "string":
        return val;
      case "geolocation":
        ;
      default:
        return val
    }
  }
  RED.nodes.registerType('octobus-json-extractor', OctobusJsonExtractor);
}