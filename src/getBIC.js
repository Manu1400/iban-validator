'use strict'

const BICFromIBAN = require('bic-from-iban')

function getBIC(iban) {
  const BIC = BICFromIBAN.getBIC(iban)
  return BIC
}

module.exports.getBIC = getBIC;
