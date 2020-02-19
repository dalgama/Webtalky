'use strict'
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' })
exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })

    let responseBody = '';
    let statusCode = 0;
    let path = event.path.split("/");
    let id = path[path.length - 1];

    const params = {
        TableName: 'User',
        Key: {
            userId: id
        }
    };
    try {
        const data = await documentClient.get(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 200;
    } catch (err) {
        let txt = ''
        for (var x in event){
            txt += x + ": " + event[x] + " ";
        }
        responseBody = `Unable to get user: ${err} ${txt}`;
        statusCode = 403;
    }
    const response = {
        statusCode: statusCode,
        headers: {
            'Content-type': 'application/json',
            'access-control-allow-origin': '*'
        },
        body: responseBody
    };
    return response;
}