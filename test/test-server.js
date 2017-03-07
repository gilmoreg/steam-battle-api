/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
const chai = require('chai');
const chaiHttp = require('chai-http');
const moxios = require('moxios');

const { app, runServer, closeServer } = require('../server');
require('dotenv').config();

const should = chai.should();
chai.use(chaiHttp);

const fakeOwnedGames = {
  response: {
    game_count: 2,
    games: [
      {
        appid: 105600,
        playtime_2weeks: 1,
        playtime_forever: 4,
      },
      {
        appid: 282900,
        playtime_forever: 3472,
      },
    ] }
};

const fakeVanityGoodResponse = {
  response: {
    steamid: '76561198007908897',
    success: 1
  }
};

const fakeVanityBadResponse = {
  response: {
    success: 42,
    message: 'No match',
  }
};

const fakeProfileResponse = {
  response: {
    players: [
      {
        steamid: '0000',
        personaname: 'test',
        profileurl: 'test',
        avatarfull: 'test',
      }
    ]
  }
};

describe('GET /checkid/:id', () => {
  before(() => {
    runServer();
    moxios.install();
  });
  after(() => {
    moxios.uninstall();
    closeServer();
  });

  it('should should validate a known good id', (done) => {
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 200,
      responseText: JSON.stringify(fakeOwnedGames),
    });
    return chai.request(app)
      .get('/checkid/76561198007908897')
      .then((res) => {
        res.should.have.status(200);
        res.body.steamid.should.equal('76561198007908897');
      })
      .catch((err) => {
        console.log('err', err);
        true.should.equal(false);
        done();
      });
  });
/* 
  it('should should validate a known good vanity url', (done) =>
    chai.request(app)
      .get('/checkid/solitethos')
      .then((res) => {
        res.should.have.status(200);
        res.body.steamid.should.equal('76561198007908897');
      })
  );

  it('should should return empty on a known bad id', (done) =>
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

  it('should return valid player object for a known good id', (done) =>
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

  it('should return status 500 for known bad id', (done) =>
    chai.request(app)
      .get('/player/aaaa')
      .then(() => {
      })
      .catch((res) => {
        res.should.have.status(500);
      })
  );
  */
});

