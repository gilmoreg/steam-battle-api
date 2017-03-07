/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
const chai = require('chai');
const sinon = require('sinon');
require('sinon-as-promised');
const axios = require('axios');
const Steam = require('../steam');

const should = chai.should();

describe('Steam functions', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => sandbox.restore());

  // Checkid
  it('checkid should validate a known good id', (done) => {
    sandbox.stub(axios, 'get').resolves('76561198007908897');
    Steam.checkid('76561198007908897')
      .then((id) => {
        id.should.equal('76561198007908897');
        done();
      });
  });
  it('checkid should validate a known good vanity url', (done) => {
    sandbox.stub(axios, 'get').resolves('76561198007908897');
    Steam.checkid('76561198007908897')
      .then((id) => {
        id.should.equal('76561198007908897');
        done();
      });
  });
  it('checkid should return null on a known bad id', (done) => {
    sandbox.stub(axios, 'get').rejects(null);
    Steam.checkid('aaaa')
      .then((id) => {})
      .catch((id) => {
        (id === null).should.be.true;
        done();
      });
  });

  // Profile
  it('profile should return valid data for a known good id', (done) => {
    const testProfile = {
      steamid: 'test',
      personaname: 'test',
      profileurl: 'test',
      avatarfull: 'test'
    };
    sandbox.stub(axios, 'get').resolves(testProfile);
    Steam.profile('76561198007908897')
      .then((profile) => {
        profile.should.have.keys(['steamid', 'personaname', 'profileurl', 'avatarfull']);
        done();
      });
  });
  it('profile should return null for known bad id', (done) => {
    sandbox.stub(axios, 'get').rejects(null);
    Steam.profile('aaaa')
      .then((profile) => {})
      .catch((profile) => {
        (profile === null).should.be.true;
        done();
      });
  });
});
