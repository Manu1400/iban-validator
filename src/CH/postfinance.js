'use strict'

//const {isValid} = require('./../index')

async function isAccountNumber(accountnumber) {
  var first = '30'
  // exclude orange ESR
  if (first != "01" && first != "03") {
    // fetch webpage https://www.postfinance.ch/de/privat/support/tools-rechner/iban-rechner.html/calculator/iban/Index.do
    // https://www.postfinance.ch/de/privat/support/tools-rechner/iban-rechner.html/calculator/iban/Index.do?account.firstDigitsStr=30&account.midDigitsStr=3090&account.lastDigitStr=1

  }
}

module.exports.isAccountNumber = isAccountNumber
