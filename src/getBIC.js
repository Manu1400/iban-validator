'use strict'

const BICFromIBAN = require('bic-from-iban')
const {isValid} = require('./index')
const NL = require('./NL/NL')

function getBIC(iban) {
  const country = iban.substring(0, 2)
  if (country == "NL") {
    return NL.getBIC(iban)
  }

  var bic = BICFromIBAN.getBIC(iban)
  //TODO : add code for "BE" : https://github.com/TPWeb/iban/commit/e43566cfd8bc1547b6f2780c28546203570e8b0c
  if (isValid(iban) || iban.substring(0, 2) == "DE") {
    // exception for the Commerzbank
    if (bic == 'DRESDEFF307') {
      bic = 'COBADEFFXXX'
    }
    // need to change IBAN and then calculate BIC ?
    if (bic == 'DEUTDEDB393' || bic == 'DEUTDEDK396') {
      bic = 'BOTKDEH1XXX'
    }
    return bic
  }
  console.log('invalid IBAN')
  return false
}

module.exports.getBIC = getBIC;
