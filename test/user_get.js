const { describe, it } = require('mocha');
const { expect } = require('chai');
var http = require('http');

describe('Testing get user endpoint:', function () {
    var options = {
        host: 'www.google.com',
        path: '/index.html'
    };
    var req = http.get(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));

        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        res.on('data', function (chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
        }).on('end', function () {
            var body = Buffer.concat(bodyChunks);
            console.log('BODY: ' + body);
            // ...and/or process the entire body here.
        })
    });
    req.on('error', function (e) {
        console.log('ERROR: ' + e.message);
    });
    it('Values should be equal', function () {
        expect(1 === 1).to.be.true;
    });
})