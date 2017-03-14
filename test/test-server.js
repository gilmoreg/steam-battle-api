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
    moxios.stubRequest(/.*(Summaries).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.profileResponse),
    });
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.ownedGames),
    });
    chai.request(app)
      .get('/checkid/76561198007908897')
      .then((res) => {
        res.should.have.status(200);
        res.body.id.should.equal('76561198007908897');
        res.body.profile.should.exist;
        done();
      })
      .catch((err) => {
        console.error(err);
        should.fail();
        done();
      });
  });

  it('should should validate a known good vanity url', (done) => {
    moxios.stubRequest(/.*(Summaries).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.profileResponse),
    });
    moxios.stubRequest(/.*(Vanity).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.vanityGoodResponse),
    });
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.ownedGames),
    });
    chai.request(app)
      .get('/checkid/aaaa')
      .then((res) => {
        res.should.have.status(200);
        res.body.id.should.equal('76561198007908897');
        res.body.profile.should.exist;
        done();
      })
      .catch((err) => {
        console.error(err);
        should.fail();
        done();
      });
  });

  it('should should return a 200 status and an error on a known bad id', (done) => {
    moxios.stubRequest(/.*(Summaries).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.profileResponse),
    });
    moxios.stubRequest(/.*(Vanity).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.vanityBadResponse),
    });
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.ownedGames),
    });
    chai.request(app)
      .get('/checkid/00zaz000')
      .then((res) => {
        res.should.have.status(200);
        res.body.error.should.exist;
        done();
      })
      .catch((err) => {
        console.error(err);
        should.fail();
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
        res.body.player.should.have.keys(['id', 'profile', 'score']);
        res.body.player.profile.should.have.keys(['personaname', 'profileurl', 'avatarfull']);
        res.body.player.score.should.have.keys(['owned', 'playtime', 'recent', 'total']);
        done();
      })
      .catch((err) => {
        console.error(err);
        should.fail();
        done();
      });
  });

  it('should return status 200 and an error for known bad id', (done) => {
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
      .then((res) => {
        res.should.have.status(200);
        res.text.should.have.string('error');
        done();
      })
      .catch((err) => {
        console.error(err);
        should.fail();
        done();
      });
  });
});
