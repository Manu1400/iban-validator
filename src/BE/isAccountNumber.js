'use strict'

//const {isValid} = require('./../index')

// short version: http://www.bpost.be/nl/iban/index_fr.htm

const defaults = {
  inputMax1: 3,
  inputMax2: 7,
  inputMax3: 2,
};

var accountNumberObj = {
  part1: '',
  part2: '',
  part3: '',

  // Get a string representation of the account number
  toString: function toString() {
    return this.part1 + this.part2 + this.part3;
  },

  // Get Electronic version of IBAN (Continous string)
  getElectronic: function getElectronic() {
    var accountNumberString = this.toString();
    var ibanStart = '' + (98 - ((accountNumberString.substring(0, 9) % 97 + accountNumberString.substring(9, 13) + '1114') % 97 + '00') % 97);
    return 'BE' + ibanStart.padStart(2, '0') + accountNumberString;
  },

  // Check if it is a valid Account Number
  validate: function validate(part1, part2, part3) {
    this.part1 = part1
    this.part2 = part2
    this.part3 = part3
    return (this.part1.length === defaults.inputMax1
         && this.part2.length === defaults.inputMax2
         && this.part3.length === defaults.inputMax3
         && this.part3 === (this.part1 + this.part2 - 1) % 97 + 1 + '');
  }
}

function isAccountNumber(part1, part2, part3) {
   return accountNumberObj.validate(part1, part2, part3)
}

module.exports.isAccountNumber = isAccountNumber
