const { describe, it } = require('mocha');
const { expect } = require('chai');
var https = require('https');

let host = 'https://u0bqxo1avb.execute-api.us-east-1.amazonaws.com'

let getUser = (path, email) => {
    return new Promise((resolve, reject) => {
        let data = '';
        https.get(host + path + '/' + email, (resp) => {

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                console.log('helllllo');
                console.log(data)
                data = JSON.parse(data);
                resolve(data)
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err);
        });
    });
}

describe('Testing get user endpoint:', () => {

    let email = 'test@test.com';
    let path = '/prod/user';
    it('Nickname should be equal', async () => {
        let data = await getUser(path, email);
        console.log(data);
        expect(data.Item.nickName === 'test').to.be.true;
    });
    it('Email should be equal', async () => {
        let data = await getUser(path, email);
        console.log(data);
        expect(data.Item.userId === 'test@test.com').to.be.true;
    });

})