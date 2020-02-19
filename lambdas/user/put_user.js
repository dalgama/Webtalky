'use strict'
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' })
exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })

    let responseBody = '';
    let statusCode = 0;

    const {userId, name, conversationId} = JSON.parse(event.body)

    const params = {
        TableName: 'User',
        Key: {
            userId: userId,
            userName: name,
            conversation: conversationId
        }
    }
    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err) {
        responseBody = `Unable to put user: ${err}`;
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