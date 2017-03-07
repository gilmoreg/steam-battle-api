/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
require('dotenv').config();

const should = chai.should();
chai.use(chaiHttp);
/* 
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

  it('should should validate a known good vanity url', () =>
    chai.request(app)
      .get('/checkid/solitethos')
      .then((res) => {
        res.should.have.status(200);
        res.body.steamid.should.equal('76561198007908897');
      })
  );

  it('should should return empty on a known bad id', () =>
    chai.request(app)
      .get('/checkid/aaaa')
      .then((res) => {
        res.should.have.status(204);
        res.body.should.eql({});
      })
  );
});

describe('GET /player/:id', () => {
  before(() => runServer());
  after(() => closeServer());

  it('should return valid player object for a known good id', () =>
    chai.request(app)
      .get('/player/76561198007908897')
      .then((res) => {
        res.should.have.status(200);
        res.body.player.should.exist;
        res.body.player.profile.should.exist;
        res.body.player.profile.steamid.should.equal('76561198007908897');
        res.body.player.score.should.exist;
        res.body.player.score.steamid.should.equal('76561198007908897');
      })
  );

  it('should return status 500 for known bad id', () =>
    chai.request(app)
      .get('/player/aaaa')
      .then(() => {
      })
      .catch((res) => {
        res.should.have.status(500);
      })
  );
});
*/
