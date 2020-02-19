'use strict'
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' })
exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })

    let responseBody = '';
    let statusCode = 0;

    const params = {
        TableName: 'User',
        Key: {
            userId: '123'
        }
    }
    try {
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
    } catch (err) {
        responseBody = `Unable to get users: ${err}`;
        statusCode = 403;
    }
    const response = {
        statusCode: statusCode,
        headers: {
            'Content-type': 'application/json'
        },
        body: responseBody
    };
    return response;
}