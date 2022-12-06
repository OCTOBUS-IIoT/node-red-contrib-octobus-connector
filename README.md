# node-red-contrib-octobus-connector
A set of nodes to connect between the data from different sources and OCTOBUS cloud
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/octobus_logo.png?raw=true "Optional Title")

## Installing OCTOBUS connector using npm
```bash
# change to your ~./node-red/ folder
cd ~/.node-red/
npm install npm i @octobus/node-red-contrib-octobus-connector
```

## Installing OCTOBUS connector via Node-RED palette
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/node_red_pallete.png "Optional Title")

You can install the node also via the Manage palette feature in the Node-RED administration UI.
## Connecting to OCTOBUS via OPC UA using Generated Flow function on OCTOBUS
### 1: Create Client on OCTOBUS
- Go to Clients Tab create new Client.
- On Client Type select Node-RED.
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-01.png)
### 2: Create Data Flow on Client
The data flow on OCTOBUS doesn't the same definition on Node-RED. If you have multiple data flow on client it will be created on the same flow on Node-RED. 
- Names data flow and select protocol to OPC UA.
- Go to Setting/Parameters 
    - Fill the setting and parameters for OPC UA.
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-02.png)
- Go to Measurement Mapping tab
    - Add and select asset.
    - Select measurement that you want to map varaible/tag inside of OPC Server to OCTOBUS.
    - Fill the NodeId from OPC server then select Sampling Method. ( Subscribe interval will be fixed to 300 ms)
    - Select more assets or measurements if it's needed then click create.
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-03.png)
### 3: Deploy to Node-RED
- Generate Flow for Node-RED.
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-04.png)

- Copy or Download the configuration.
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-05.png)

- Open Node-RED web application.
- Click the hamburger button and then select import.
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-06.png)


- Paste the configuration or select the downloaded configuration file then click import.
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-07.png)

- You will see the pop up that show the flow has been imported then DEPLOY it!
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-08.png)

## Connecting to OCTOBUS using MQTT Client and OCTOBUS payload node.
### 1: Create Client on OCTOBUS
- Go to Clients Tab create new Client.
- On Client Type select Generic MQTT.
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-09.png)

- Select any assets which you want to add to the client.
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-10.png)

### 2: Preparing nodes on Node-RED
- Prepare the OCTOBUS payload node
    - For each OCTOBUS payload reserve for each measurement in OCTOBUS
    - On OCTOBUS you will see the message payload format for each measurement.
    - Copy Asset Id and Measurement Id from OCTOBUS and paste to OCTOBUS payload on Node-RED.
    - Select the Data type which have to match on OCTOBUS.
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-11.png)

- Prepare the MQTT Client node
    - On mqtt out node, fill the topic and set the QoS to 1.
    ![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-12.png)
    - Fill the MQTT Endpoints, username and password on Connection and Security tab accordingly
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-13.png)
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-14.png)
- The wire for OCTOBUS payload node and mqtt out node will be look like this.
![Alt text](https://iworks-public-assets.s3.ap-southeast-1.amazonaws.com/npm/tutorial-15.png)
## FAQ

- Install to the .node-red folder if you have installed node-red globally
- Install to the userDir directory if you have custom userDir
- Make sure that your nodejs version is relatively current