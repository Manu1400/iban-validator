'use strict'

const assert = require('assert');
const chai = require('chai')
const validation = require('../../index')

// IBAN from https://github.com/fohlin/unified-bank-utils
it('SE normal IBAN', function() {
  // 9252 - 0782455
  chai.expect(validation.isValid('SE4792500000092520782455')).to.equal(true)
});
it('SE Swedbank (special)', function() {
  chai.expect(validation.isValid('SE5780000829902814958514')).to.equal(true)
});
it('SE Account Number checksum is invalid', function() {
  // from https://github.com/fohlin/unified-bank-utils/blob/master/tests/test-swedish.js
  // 8000 - 332452515
  //chai.expect(validation.isValid('SE7880000080000332452515')).to.equal(false)
});
// can test other values from http://www-2.danskebank.com/link/Bankernaskontonummer

// real, from table https://www.axisbank.com/docs/default-source/default-document-library/nostro-accounts.pdf?sfvrsn=4655c855_0
/*
it('SE real official IBAN', function() {
  // Account No: 39527909384SEK
  // Currency : SEK
  chai.expect(validation.isValid('SE5230000000039527909384')).to.equal(true)
});
*/
