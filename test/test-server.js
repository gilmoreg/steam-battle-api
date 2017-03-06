/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
require('dotenv').config();

const should = chai.should();
chai.use(chaiHttp);

describe('GET /checkid/:id', () => {
  before(() => runServer());
  after(() => closeServer());

  it('should should validate a known good id', () =>
    chai.request(app)
      .get('/checkid/76561198007908897')
      .then((res) => {
        res.should.have.status(200);
        res.body.steamid.should.equal('76561198007908897');
      })
  );
});

// Test Routes

// GET checkid - check if no id is sent - does the route even fire?
// maybe check that in postman
