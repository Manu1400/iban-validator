'use strict'

const assert = require('assert');
const chai = require('chai')
const validation = require('../../index')

it('AT public IBAN', function() {
  // found in https://github.com/Project60/org.project60.bic/issues/24
  // BLZ: 60000
  chai.expect(validation.isValid('AT696000000092159385')).to.equal(true)
});

// save all blz from parser https://github.com/Project60/org.project60.bic/commit/126aa1a2d4507b3039f0d7fbc0934bc20586645f
// zip : http://www.oenb.at/idakilz/kiverzeichnis?action=downloadAllData

it('AT public IBAN with old BLZ', function() {
  // BLZ: 19043 (old)
  // "IBAN appears to be valid. The bank cannot be identified."
  //chai.expect(validation.isValid('AT611904300234573201')).to.equal(false)
});

it('AT public IBAN with wrong BLZ', function() {
  // BLZ: 99999
  //chai.expect(validation.isValid('AT469999912345678901')).to.equal(false)
});
