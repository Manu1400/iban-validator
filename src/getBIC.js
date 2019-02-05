'use strict'

const BICFromIBAN = require('bic-from-iban')
const {isValid} = require('./index')

function getBIC(iban) {
  const bic = BICFromIBAN.getBIC(iban)
  console.log('invalid IBAN')
  if (isValid(iban)) {
      return bic
  }
  console.log('invalid IBAN')
  return false
}

module.exports.getBIC = getBIC;
