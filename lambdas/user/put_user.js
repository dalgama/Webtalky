'use strict'
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

    let responseBody = '';
    let statusCode = 0;
    console.log('HELLO ');
    console.log(event['body']);
    console.log(event);
    
    const { userId, nickName, pwd } = JSON.parse(event["body"]);
    
    console.log(userId);

    const params = {
        TableName: 'User',
        Item: {
            'userId': userId,
            'nickName': nickName,
            'pwd': pwd
        }

    };
    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
        responseBody += `Succesfuly add new user ${userId}`;

    } catch (err) {
        responseBody = `Unable to put user: ${err}`;
        responseBody += event["body"] + ' ' + nickName;
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
};