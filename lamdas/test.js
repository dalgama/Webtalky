'use strict'
const AWS = require('aws-sdk');
AWS.config.update({region:"us-west-1"});
exports.handler = function (event, context, callback) {
    console.log(JSON.stringify(`Event: event`))
    const ddb = AWS.Dy
}