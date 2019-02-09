'use strict'

const assert = require('assert')
const chai = require('chai')
const validation = require('../../index')

// real, from table https://www.axisbank.com/docs/default-source/default-document-library/nostro-accounts.pdf?sfvrsn=4655c855_0
it('SE real official IBAN', function() {
  // Account No: 39527909384SEK
  // Currency: SEK
  // valid IBAN (tested on iban.com)

  // https://github.com/jop-io/kontonummer.js/blob/master/kontonummer.js
  // validate("7909384", "3952") -> false (use mod10 function)

  chai.expect(validation.isValid('SE5230000000039527909384')).to.equal(true)
})
