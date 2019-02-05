'use strict'
const {isValid} = require('./../index')

//ie: 'CR98015201001027816206'
// (SINPE = bank code + Account number)
function getSINPE(iban) {
  // check IBAN number do check SINPE
  if (isValid(iban)) {
    return iban.substr(5) // SINPE
  }
  console.log('invalid IBAN')
  return false
}

module.exports.getSINPE = getSINPE
