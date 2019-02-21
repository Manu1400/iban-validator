function fetchAccountNumber(bankNumber, accountNumber) {
  //var substr = iban.trim().substr(0, 2)
  //if (substr == "CY") {

    // Promise
    return require('./CY/fetch').fetchAccountNumber(bankNumber, accountNumber)
  //}
  //return true
}

module.exports.fetchAccountNumber = fetchAccountNumber
