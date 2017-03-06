/*
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const {PORT, TEST_DATABASE_URL} = require('../config');

const should = chai.should();
chai.use(chaiHttp);

describe('Server Status', function() {

    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it('should give a 200 status', function() {
        return chai.request(app)
        .get('/')
        .then(function(res) {
            res.should.have.status(200);
        });
    });
});
*/

// Test Routes

// GET checkid - check if no id is sent - does the route even fire?
// maybe check that in postman