'use strict'

const assert = require('assert');
const chai = require('chai')
const validation = require('../../index')

describe('MT IBAN', () => {
  // real, from https://www.cc.com.mt/wp-content/uploads/2016/10/BANK-DETAILS-CC.pdf
  it('Real APS Bank IBAN', function() {
    // account number: 20001148606
    chai.expect(validation.isValid('MT48APSB77024003660720001148606')).to.equal(true)
  });

  // real, from https://www.cc.com.mt/wp-content/uploads/2016/10/BANK-DETAILS-CC.pdf
  it('Real Bank of Valletta (BOV)', function() {
    // account number: 40012572078
    chai.expect(validation.isValid('MT65VALL22013000000040012572078')).to.equal(true)
  });
})
