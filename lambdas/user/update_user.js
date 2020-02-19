'use strict'
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' })
exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })
    let responseBody = '';
    let statusCode = 0;
    const { userId, conversation } = JSON.parse(event['body']);
    const params = {
        TableName: 'User',
        Key: {
            userId: userId
        },
        UpdateExpression: 'set conversation = :n',
        ExpressionAttributeValues: {
            ':n': conversation
        },
        RetrunValues: 'UPDATED_NEW'
    };
    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (err) {
        responseBody = `Unable to Update user: ${err}`;
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