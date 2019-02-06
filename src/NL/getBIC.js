'use strict'

const bankList = require('./BIC-lijst-NL')

function check(iban, bic) {
  // "DEUTNL2A est utilisé pour les comptes commençant par 026.5x.xx.xxx de DEUTSCHE BANK AG"
  const accountNumber = iban.substr(8,4)
  if (accountNumber == "0265") {
    return "DEUTNL2A".concat("XXXXXXXXXXX").substring(0,11)
  }
  return bic.concat("XXXXXXXXXXX").substring(0,11)
}

function getBIC(iban) {
  var bankCode = iban.substring(4, 8).replace(/^0+/, '')

  var item = bankList.find((d) => {
      return d.id === bankCode
  });
  var bic = item.bic.concat("XXXXXXXXXXX").substring(0,11)
  if (bankCode == "DEUT") {
    bic = check(iban, bic)
  }
  return bic
}

module.exports.getBIC = getBIC;
