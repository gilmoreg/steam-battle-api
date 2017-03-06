/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
const chai = require('chai');
const Steam = require('../steam');

const should = chai.should();
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Steam functions', () => {
  it('checkid should validate a known good id', () =>
    Steam.checkid('76561198007908897').should.eventually.to.equal('76561198007908897')
  );
  it('checkid should return null on a known bad id', () => {
    Steam.checkid('aaaa').should.eventually.be.null;
  });
  it('profile should return valid data for a known good id', () => {
    // Cannot test for specific values since they could change on Steam's side
    Steam.profile('76561198007908897')
      .should.eventually.have.keys(['steamid', 'personaname', 'profileurl', 'avatarfull']);
  });
  it('profile should return null for known bad id', () => {
    Steam.profile('aaa').should.eventually.be.null;
  });
  it('score should return a number for a known good id', () => {
    Steam.score('76561198007908897').should.eventually.be.a('number');
  });
  it('score should return null for a known bad id', () => {
    Steam.score('aaa').should.eventually.be.null;
  });
});

