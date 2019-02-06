'use strict'

const assert = require('assert')
const chai = require('chai')
const validation = require('../../index')

describe('#isSINPE', function() {
  this.slow(1000)

  it('Invalid account number', function() {
    // https://www.promerica.fi.cr/banca-de-personas/cuentas/cuenta-iban/
    // "CUENTA CLIENTE 10200009300694482 NO ES UNA CUENTA CLIENTE VÁLIDA"
    chai.expect(validation.isSINPE('10200009300694482')).to.equal(false)

    chai.expect(validation.isSINPE('15201001027816205')).to.equal(false)
  });

  it('Valid account number', function() {
    chai.expect(validation.isSINPE('15201001027816206')).to.equal(true)
  });
});
