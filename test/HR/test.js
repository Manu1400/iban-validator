'use strict'

const assert = require('assert');
const chai = require('chai')
const validation = require('../../index')

// TODO: check date
// Documentation: https://www.hnb.hr/temeljne-funkcije/platni-promet/vodeci-brojevi-banaka
// see to Vatican for check date

// generated from the official HR website https://www.hnb.hr/temeljne-funkcije/platni-promet/iban-kalkulator
it('HR generated IBAN from hnb.hr with invalid Account Number checksum', function() {
  // bankCode 4133006 : ok
  // 1234567890 : <- invalid Account Number checksum
  chai.expect(validation.isValid('HR8441330061234567890')).to.equal(false)
  //chai.expect(validation.isValid('HR5741330061234567891')).to.equal(false)
  //chai.expect(validation.isValid('HR8941330061234567897')).to.equal(false)
});

// from https://github.com/MiroslavJelaska/iban-hr.js/blob/master/test/test.js
it('HR IBAN with valid checksums', function() {
  // Account Number checksum is valid
  // Bank Code checksum is valid
  // 1863000160
  chai.expect(validation.isValid('HR1210010051863000160')).to.equal(true)
  // from http://www.kaba.hr/en/iban-calculator/
  // checked on https://www.hnb.hr/temeljne-funkcije/platni-promet/iban-kalkulator
  chai.expect(validation.isValid('HR5641330061863000160')).to.equal(true)
});
