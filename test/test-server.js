/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
const chai = require('chai');
const chaiHttp = require('chai-http');
const moxios = require('moxios');

const { app, runServer, closeServer } = require('../server');
const fakes = require('./fakes');
require('dotenv').config();

const should = chai.should();
chai.use(chaiHttp);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

describe('GET /checkid/:id', () => {
  beforeEach(() => {
    runServer();
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    closeServer();
  });

  it('should should validate a known good id', (done) => {
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.ownedGames),
    });
    chai.request(app)
      .get('/checkid/76561198007908897')
      .then((res) => {
        res.should.have.status(200);
        res.body.steamid.should.equal('76561198007908897');
        done();
      })
      .catch((err) => {
        should.fail(err);
        done();
      });
  });

  it('should should validate a known good vanity url', (done) => {
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.ownedGames),
    });
    moxios.stubRequest(/.*(Vanity).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.vanityGoodResponse),
    });
    chai.request(app)
      .get('/checkid/solitethos')
      .then((res) => {
        res.should.have.status(200);
        res.body.steamid.should.equal('76561198007908897');
        done();
      })
      .catch((err) => {
        should.fail(err);
        done();
      });
  });

  it('should should return a 404 status and an error on a known bad id', (done) => {
    moxios.stubRequest(/.*(Vanity).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.vanityBadResponse),
    });
    chai.request(app)
      .get('/checkid/00zaz000')
      .then((res) => {
        should.fail(res);
        done();
      })
      .catch((err) => {
        err.should.have.status(404);
        err.response.body.error.should.exist;
        done();
      });
  });
});

describe('GET /player/:id', () => {
  beforeEach(() => {
    runServer();
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    closeServer();
  });

  it('should return valid player object for a known good id', (done) => {
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.ownedGames),
    });
    moxios.stubRequest(/.*(Summaries).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.profileResponse),
    });
    chai.request(app)
      .get('/player/76561198007908897')
      .then((res) => {
        res.should.have.status(200);
        res.body.player.should.exist;
        res.body.player.profile.should.exist;
        res.body.player.profile.should.have.keys(['steamid', 'personaname', 'profileurl', 'avatarfull']);
        res.body.player.score.should.exist;
        res.body.player.score.should.have.keys(['steamid', 'owned', 'playtime', 'recent', 'total']);
        done();
      })
      .catch((err) => {
        should.fail(err);
        done();
      });
  });

  it('should return status 404 and an error for known bad id', (done) => {
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 204,
      responseText: JSON.stringify({}),
    });
    moxios.stubRequest(/.*(Summaries).*/, {
      status: 204,
      responseText: JSON.stringify({}),
    });
    chai.request(app)
      .get('/player/00zaz000')
      .then(() => {
        should.fail();
        done();
      })
      .catch((err) => {
        err.should.have.status(404);
        err.response.body.error.should.exist;
        done();
      });
  });
});
