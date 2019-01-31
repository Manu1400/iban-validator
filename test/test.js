const assert = require('assert');
const chai = require('chai')
const validation = require('../index')

// todo : add timeout https://mochajs.org/#suite-level

describe('#isValid', function() {
  it('IBAN, length, checksum, bank code, account and structure', function() {
    chai.expect(validation.isValid('GB33BUKB20201555555555')).to.equal(true)
  });
  // from https://www.iban.com/calculate-iban
  it('country United Kingdom (UK), Sort Code 200415 and account number 38290008', function() {
    chai.expect(validation.isValid('GB46BUKB20041538290008')).to.equal(true)
  });
  // "Example 1" from https://www.vocalink.com/media/3061/vocalink-validating-account-numbers-v540.pdf
  it('UK: 180002 Account number 98093517', function() {
    chai.expect(validation.isValid('GB59COUT18000298093517')).to.equal(true)
  });

  // from https://www.iban.com/calculate-iban
  it('France (FR) Bank Code (Code Banque) - 30002, Branch Code (Code Guiche) - 00550 and account number (Numéro de Compte) - 0000157841Z', function() {
    chai.expect(validation.isValid('FR3330002005500000157841Z25')).to.equal(true)
  });

  it('IBAN, bank code not found (bank cannot be identified): Valid length, checksum, bank code, account and structure', function() {
    chai.expect(validation.isValid('GB94BARC10201530093459')).to.equal(true)
  });

  it('IBAN check digits MOD-97-10 as per ISO/IEC 7064:2003', function() {
    chai.expect(validation.isValid('GB94BARC20201530093459')).to.equal(false)
  });

  it('Invalid IBAN length must be "X" characters long!', function() {
    chai.expect(validation.isValid('GB96BARC202015300934591')).to.equal(false)
  });

  it('Invalid account structure', function() {
    chai.expect(validation.isValid('GB12BARC20201530093A59')).to.equal(false)
  });

  it('Bank Code not found and Invalid bank code structure', function() {
    chai.expect(validation.isValid('GB78BARCO0201530093459')).to.equal(false)
  });

  // IBAN invalide et structure de contrôle
  it('Invalid IBAN checksum structure', function() {
    chai.expect(validation.isValid('GB2LABBY09012857201707')).to.equal(false)
  });

  it('Country does not seem to support IBAN!', function() {
    chai.expect(validation.isValid('US64SVBKUS6S3300958879')).to.equal(false)
  });

  //TODO: https://github.com/symfony/symfony/commit/07b38dea1f76bdba9800e9106b9db2e2d0a65ef2
  it('Country: Wallis and Futuna Islands', function() {
    chai.expect(validation.isValid('WF9120041010050500013M02606')).to.equal(true)
  });

  // Note: can display bank name with https://github.com/jrasanen/fibank
  it('Valid Finnish IBAN bank account number and reference number', function() {
    chai.expect(validation.isValid('FI9080002627761348')).to.equal(true)
  });

  it('Valid Finnish IBAN bank account number and reference number with spaces', function() {
    chai.expect(validation.isValid('FI90 800026 27761348')).to.equal(true)
  });

  // from swift_iban_registry_201812.pdf
  it('Valid IBAN of AE – United Arab Emirates (The)', function() {
    chai.expect(validation.isValid('AE070331234567890123456')).to.equal(true)
  });

  // example from https://www.hsbc.fr/1/2/hsbc-france/particuliers/banque-au-quotidien/pays-iban
  it('Maurice (Île)	- 29 chars', function() {
    chai.expect(validation.isValid('MU22BOMM020220204040020000MUR')).to.equal(true)
  });
  // example from https://www.xe.com/ibancalculator/sample/?ibancountry=mauritius
  it('Maurice (Île)	- 30 chars', function() {
    chai.expect(validation.isValid('MU17 BOMM 0101 1010 3030 0200 000M UR')).to.equal(true)
  });
  it('Timor-Leste IBAN Format', function() {
    chai.expect(validation.isValid('TL38 0080 0123 4567 8910 157')).to.equal(true)
  });
});

//TODO : add DE
// https://www.bundesbank.de/en/tasks/payment-systems/services/bank-sort-codes/download---bank-sort-codes-626218
// https://www.bundesbank.de/en/homepage/search/bank-sort-codes-search

// TODO: check BBAN
// https://github.com/Al-/IbanValidator/blob/master/ibanvalidator.cpp

// TODO: Specific
// see documentation: https://github.com/globalcitizen/php-iban/issues/39
// can use https://github.com/niutech/node.php
// or https://www.npmjs.com/package/node-php

// add https://ssl.ibanrechner.de/sample_accounts.html

// add BR https://github.com/lkraider/iban-generator

describe('#isValid impossible to detect invalid IBAN', function() {

  //TODO : use validate_account_uk (API) https://api.iban.com/clients/api/eiscd/#
  // Invalid IBAN check digit!
  // The IBAN contains an incorrect checksum.
  it('Invalid IBAN checksum (1/2) GB', function() {
    //TODO: use https://www.ibancalculator.com/validate/GB01BARC20714583608387
    chai.expect(validation.isValid('GB01BARC20714583608387')).to.equal(false)
    // good IBAN : GB98BARC20714583608387
  });
  // Invalid IBAN check digit!
  it('Invalid IBAN checksum (2/2) GB', function() {
    chai.expect(validation.isValid('GB00HLFX1101611145365')).to.equal(false)
  });

  it('Bank Code not found and invalid account', function() {
    chai.expect(validation.isValid('GB24BARC20201630093459')).to.equal(false)
  });

  //TODO : use https://github.com/uphold/uk-modulus-checking
  it('Invalid account number (1/2)', function() {
    // Error: Account Number or Sort Code checksum is not valid
    chai.expect(validation.isValid('GB02BARC20201530093451')).to.equal(false)
  });

  it('Invalid account number (2/2)', function() {
      // IBAN complies with the standard (BUT invalid account number)
    chai.expect(validation.isValid('GB68CITI18500483515538')).to.equal(false)
  });

  //TODO: Validates Norwegian bank account numbers
  // https://github.com/zrrrzzt/is-valid-account-number

  //TODO: New Zealand bank account number validation (++)
  // https://github.com/jayniehaka/nz-account-number-validation
});
