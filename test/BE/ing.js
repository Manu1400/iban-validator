'use strict'

const assert = require('assert');
const chai = require('chai')
const validation = require('../../index')

// real account number, from http://soeasy.sodexo.be/espi_ms/be/_pdf/numeros_de_compte_fr.pdf
// checked on https://www.ing.be/fr/business/saving-and-investing/iban-calculator
it('Real IBAN from a account number', function() {
  // '310-1959582-74'
  chai.expect(validation.isValid('BE16310195958274')).to.equal(true)
});

it('Wrong IBAN from a wrong account number checksum', function() {
  // wrong (as 5 fev. 2019)
  //'111-1234567-8'
  chai.expect(validation.isValid('BE73111123456708')).to.equal(false)
  chai.expect(validation.isValid('BE59310195958276')).to.equal(false)
});
