/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
const chai = require('chai');
const sinon = require('sinon');
require('sinon-as-promised');
const axios = require('axios');
const moxios = require('moxios');
const Steam = require('../steam');

require('dotenv').config();

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const should = chai.should();

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

describe('Steam functions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  // Checkid
  it('checkid should validate a known good id', (done) => {
    // Checkid makes up to two API calls (one to resolve a vanity URL if necessary
    // and one to check if the user owns any games)
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 200,
      responseText: JSON.stringify(fakeOwnedGames),
    });
    moxios.wait(() => {
      Steam.checkid('76561198007908897').then((response) => {
        response.should.equal('76561198007908897');
        done();
      })
      .catch((err) => {
        console.log('err', err);
        true.should.equal(false);
        done();
      });
    });
  });
  it('checkid should validate a known good vanity url', (done) => {
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 200,
      responseText: JSON.stringify(fakeOwnedGames),
    });
    moxios.stubRequest(/.*(Vanity).*/, {
      status: 200,
      responseText: JSON.stringify(fakeVanityGoodResponse),
    });
    moxios.wait(() => {
      Steam.checkid('solitethos').then((response) => {
        response.should.equal('76561198007908897');
        done();
      })
      .catch((err) => {
        console.log('err', err);
        true.should.equal(false);
        done();
      });
    });
  });
  it('checkid should return null on a known bad id', (done) => {
    moxios.stubRequest(/.*(GetOwnedGames).*/, {
      status: 200,
      responseText: JSON.stringify(fakeOwnedGames),
    });
    moxios.stubRequest(/.*(Vanity).*/, {
      status: 200,
      responseText: JSON.stringify(fakeVanityBadResponse),
    });
    moxios.wait(() => {
      Steam.checkid('aaaa').then(() => {
        done();
      })
      .catch((err) => {
        (err === null).should.be.true;
        done();
      });
    });
  });
/*
  // Player
  it('player should return valid data for a known good id', (done) => {
    const testProfile = {
      steamid: 'test',
      personaname: 'test',
      profileurl: 'test',
      avatarfull: 'test',
    };
    const testScore = {
      appid: 1,
      playtime_forever: 1,
      playtime_2weeks: 1,
    };
    const profileUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=000`;
    const scoreUrl = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=000&format=json`;
    sandbox.stub(axios, 'get')
      .withArgs(profileUrl)
        .resolves(testProfile)
      .withArgs(scoreUrl)
        .resolves(testScore);

    Steam.player('000')
      .then((player) => {
        console.log('player', player);
        player.should.equal('76561198007908897');
        done();
      });
  }); */
});
