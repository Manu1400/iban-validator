'use strict'

const {isValid} = require('./src/index')
const {fetchAccountNumber} = require('./src/fetchAccountNumber')
const {getBIC} = require('./src/getBIC')
const {getSINPE} = require('./src/CR/getSINPE')
const {isSINPE} = require('./src/CR/isSINPE')

/*
const isSepaMember = function (str) {
  const {isSepaMember} = require('./node_modules/IBAN-JStools/iban-JStools')
  return isSepaMember(str)
}
*/

module.exports.isValid = isValid
module.exports.fetchAccountNumber = fetchAccountNumber
module.exports.getBIC = getBIC
module.exports.getSINPE = getSINPE
module.exports.isSINPE = isSINPE
//module.exports.isSepaMember = isSepaMember
