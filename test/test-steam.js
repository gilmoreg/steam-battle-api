/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
const chai = require('chai');
const moxios = require('moxios');
const Steam = require('../steam');
const fakes = require('./fakes');

require('dotenv').config();

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const should = chai.should();

describe('Steam functions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  // Checkid
  it('checkid should validate a known good id', (done) => {
    // Checkid makes up to two API calls (one to resolve a vanity URL if necessary
    // and one to check if the user owns any games)
    moxios.stubRequest(/.*(Summaries).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.profileResponse),
    });
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.ownedGames),
    });
    moxios.wait(() => {
      Steam.checkid('76561198007908897').then((response) => {
        response.id.should.equal('76561198007908897');
        response.profile.should.have.keys(['avatar', 'avatarfull', 'personaname', 'profileurl']);
        done();
      })
      .catch((err) => {
        console.log(err);
        should.fail();
        done();
      });
    });
  });
  it('checkid should validate a known good vanity url', (done) => {
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
    moxios.wait(() => {
      Steam.checkid('solitethos').then((response) => {
        response.id.should.equal('76561198007908897');
        response.profile.should.have.keys(['avatar', 'avatarfull', 'personaname', 'profileurl']);
        done();
      })
      .catch((err) => {
        console.log(err);
        should.fail();
        done();
      });
    });
  });
  it('checkid should return null on a known bad id', (done) => {
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
    moxios.wait(() => {
      Steam.checkid('aaaa').then((res) => {
        console.log(res);
        should.fail(res);
        done();
      })
      .catch((err) => {
        (err === null).should.be.true;
        done();
      });
    });
  });

  // Player
  it('player should return valid data for a known good id', (done) => {
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.ownedGames),
    });
    moxios.stubRequest(/.*(Summaries).*/, {
      status: 200,
      responseText: JSON.stringify(fakes.profileResponse),
    });
    Steam.player('0000')
      .then((player) => {
        player.id.should.equal('0000');
        player.should.have.keys(['id', 'profile', 'score']);
        player.profile.should.have.keys(['avatar', 'personaname', 'profileurl', 'avatarfull']);
        player.score.should.have.keys(['owned', 'playtime', 'recent', 'total']);
        done();
      })
      .catch((err) => {
        console.log(err);
        should.fail(err);
        done();
      });
  });
});
