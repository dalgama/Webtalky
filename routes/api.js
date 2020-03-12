const express = require('express');
const https = require('https');
const router = express.Router();

let host = 'https://u0bqxo1avb.execute-api.us-east-1.amazonaws.com'

router.get('/topics', (req, response, next) => {
    console.log('topic request recived');
    path = '/prod/topics';

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

router.post('/matching', (req, response, next) => {
    console.log('Topic select request body');
    console.log(req.email);
    response.send(req);
    // path = '/prod/topics';

    // https.get(host + path, (resp) => {
    //     let data = '';

    //     resp.on('data', (chunk) => {
    //         data += chunk;
    //     });

    //     resp.on('end', () => {
    //         console.log(data);
    //         response.send(JSON.parse(data));
    //     });

    // }).on("error", (err) => {
    //     console.log("Error: " + err.message);
    // });
});

module.exports = router;