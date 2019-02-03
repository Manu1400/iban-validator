'use strict'

const assert = require('assert');
const chai = require('chai')
const validation = require('../index')

describe('#getBIC', function() {
  it('Valid IBAN', function() {
    chai.expect(validation.getBIC('DZ4000400174401001050486')).to.equal("BEXADZAL100")
  });
});
