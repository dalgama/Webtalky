const express = require('express');
const https = require('https');
const router = express.Router();

let host = 'https://u0bqxo1avb.execute-api.us-east-1.amazonaws.com'

router.get('/topics', (req, response, next) => {
    console.log('topic request recieved');
    let path = '/prod/topics';

    https.get(host + path, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log(data);
            response.send(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

router.get('/user/:email', (req, response, next) => {
    console.log('user request recieved');
    let email = req.params.email;
    console.log(email + 'email in url')
    let path = '/prod/user';

    https.get(host + path + '/' + email, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log(data);
            response.send(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

module.exports = router;