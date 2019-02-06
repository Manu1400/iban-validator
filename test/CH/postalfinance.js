'use strict'

const assert = require('assert')
const chai = require('chai')
const validation = require('../../index')

describe('#isAccountNumber', function() {
  this.slow(1000)

  // real account number, from https://www.recherchecancer.ch/soutenez-nous/don-dentreprises/
  // AYNC ?
  it('Valid account number', function() {
    //chai.expect(validation.isAccountNumber('30-3090-1')).to.equal(true)

    // real IBAN
    chai.expect(validation.isValid('CH67 0900 0000 3000 3090 1')).to.equal(true)
  });

});
