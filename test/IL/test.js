'use strict'

const assert = require('assert');
const chai = require('chai')
const validation = require('../../index')

// generated IBAN
it('generated IBAN IL (Israel)', function() {
  chai.expect(validation.isValid('IL751237891234567890123')).to.equal(false)
})
// based on https://github.com/soryy708/il-bank-account-validator
it('IBAN IL (Israel)', function() {
  // Bank Code	046
  // Branch Code	154
  // Account Number	1234567890121
  chai.expect(validation.isValid('IL450461541234567890121')).to.equal(true)
})
// from https://www.ortra.com/events/isrr10/Registration.aspx
it('IBAN IL real', function() {
  // IL870-106-240000-02622-0012
  // tested with success on iban.com
  // Bank LEUMI
  chai.expect(validation.isValid('IL870106240000026220012')).to.equal(true)
})
// https://www.fidante.com/-/media/Fidante/JPMorgan-Documents/Wyetree/20170313-WyeTree-North-American-ABS-Fund-Dealing-Form.pdf?la=en&hash=A48B7AD22FAB52C30883ECBFE6137BABCBD26933
it('IBAN IL real - BANK LEUMI', function() {
  // Intermediary Bank Name: BANK LEUMI
  // look : https://github.com/soryy708/il-bank-account-validator/issues/5
  // Bank: Bank Leumi Le-Israel B.M
  chai.expect(validation.isValid('IL060108000000022005441')).to.equal(true)
})
