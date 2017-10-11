'use strict';
const chai = require('chai');

// chai config
const expect = chai.expect;

// test files
const jstate = require('../dist/jstate');


describe('Store', () => {

  it('keys', () => {
    expect(jstate).to.include.keys('state', 'setState', 'register');
    expect($).to.include.keys('state', 'setState', 'register');
  });
  it('shorthand', () => {
    expect(jstate.state).to.deep.equal($._);
  });
  it('setState', () => {
    $.setState({a:1});
    expect(jstate.state).to.deep.equal({a:1});
    expect($._.a).to.equal(1);
  });
  it('setState merge', () => {
    $.setState({a:{b:1}, b: 2});
    expect($._.a).to.deep.equal({b:1});
  });
  it('setState error', () => {
    expect(() => $.setState(1)).to.throw();
  });
  it('register', () => {
    const tester = next => action => {
      expect($._.c).to.be.undefined;
      next(action);
      expect($._.c).to.equal(3);
    }
    $.register(tester);
    $.setState({c: 3});
  });
  it('register error', () => {
    expect(() => $.register(1)).to.throw();
  });

});
