const miniban = require('miniban')
const IBAN = require('IBAN')
const ibankit = require('ibankit') //TODO: tsc (typescript)
const fastIban = require('fast-iban')

const Validator = require('validator.js').Validator;
const is = require('validator.js').Assert.extend(require('validator.js-asserts'));
const validator = new Validator();

// Specific
const Sheba = require('iran-sheba')
const FinnishBankUtils = require('finnish-bank-utils')
const countries = require('./countries')

// or https://github.com/liamja/modcheck.js
const UkModulusChecking = require('uk-modulus-checking')

// edit the script
// https://github.com/MiroslavJelaska/iban-hr.js/blob/master/iban-hr.js

function validate(iban) {
  //TODO : fix IR820540102680020817909002 on miniban
  //TODO : fix MG4600005030071289421016045 on miniban
  // return miniban.isValidIBAN(iban)
  //return IBAN.isValid(iban)
  // prefer ibankit to pass "Bank Code not found and Invalid bank code structure" test
  return ibankit.IBAN.isValid(iban)
}

function validateConsole(iban) {
  //console.log('miniban (bad)', miniban.isValidIBAN(iban))
  console.log('IBAN.js', IBAN.isValid(iban))
  console.log('ibankit', ibankit.IBAN.isValid(iban))
  console.log('validateSpecific', validateSpecific(iban))
  console.log('checkCountry', checkCountry(iban))
  console.log('fast-iban', fastIban.validateIBAN(iban))
  console.log('all', all(iban))
  return all(iban)
}

function all(iban) {
  // du plus specifique au moins specifique et fiable
  return fastIban.validateIBAN(iban) && checkCountry(iban) && validateSpecific(iban) && ibankit.IBAN.isValid(iban) && IBAN.isValid(iban) && miniban.isValidIBAN(iban)
}

function vote(iban) {
  iban = IBAN.printFormat(iban, '')
  var substr = iban.trim().substr(0, 2)
  if (substr == "WF") {
    return fastIban.validateIBAN(iban)
  }
  if (substr == "MU") {
    // TODO: https://www.xe.com/ibancalculator/sample/?ibancountry=mauritius
    // BBAN Check Digit(s) example:	MUR
    // IBAN Check Digits exemple:	17

    // source: https://www.hsbc.fr/1/2/hsbc-france/particuliers/banque-au-quotidien/pays-iban
    return (iban.length <= 30)
  }
  var votes = []
  if (fastIban.validateIBAN(iban) == false) {
    votes.push('fastIban')
  }

  // PLEASE USE https://github.com/uphold/validator.js-asserts#iso3166country
  if (miniban.isValidIBAN(iban) == false) {
    if (checkCountry(iban) == false) {
      votes.push('miniban')
    }
  }

  if (checkCountry(iban) == false) {
    votes.push('checkCountry')
  }
  if (validateSpecific(iban) == false) {
    votes.push('validateSpecific')
  }
  if (ibankit.IBAN.isValid(iban) == false) {
    votes.push('ibankit')
  }
  if (IBAN.isValid(iban) == false) {
    votes.push('IBAN')
  }

  // could add https://github.com/uphold/validator.js-asserts#internationalbankaccountnumber-iban ?
  if (validator.validate(iban, is.internationalBankAccountNumber()) == false) {
    votes.push('validator.js-asserts_is_iban_function')
  }


  // other lib ? : http://simplify.github.io/ibantools/module-ibantools.html#.extractIBAN
  // var bban = IBAN.toBBAN(iban, ' ') // NOOOOOO
  //votes.push(IBAN.isValidBBAN(substr, bban))
  console.log(votes.length)
  if (votes.length >= 1) {
    //validateConsole(iban)
    console.log(votes)
    return false
  } else {
    return true
  }
}

function checkCountry(iban) {
  var substr = iban.trim().substr(0, 2)
  if (countries.isValidISOCode(substr)) {
    console.log(countries.getCountryName(substr))
    return true
  } else {
    console.error(substr + " is not a valid ISO code")
    return false
  }
}

function validateSpecific(iban) {
  var bool = true
  var isSpecific = true
  switch (iban.trim().substr(0, 2)) {
    // can reuse https://github.com/uphold/validator.js-asserts/pull/71/files ?

    case 'GB':
      // exceptions for GB https://www.vocalink.com/media/3061/vocalink-validating-account-numbers-v540.pdf
      //TODO: FinnishBankUtils.isValidIBAN(iban) (or Sheba.isValid(iban) ) for avoid a test failing
      try {
          bool = (IBAN.fromBBAN('GB', iban.substr(4)) == iban)
      } catch(error) {
         //console.error(error);
         bool = false
      }
      bool = bool && new UkModulusChecking({
        // GB46BUKB 200415 38290008
        accountNumber: iban.substr(8+6), // 15764273 = Account Number check digit is incorrect (from https://www.iban.com/calculate-iban )
        sortCode: iban.substr(8, 6) // 6 characters (aka. Bankleitzahl or bank code)
      }).isValid() && miniban.isValidIBAN(iban) && validator.validate(iban, is.internationalBankAccountNumber())
      //note: can check sortCode on webpage http://www.fasterpayments.org.uk/consumers/sort-code-checker
      break
    case 'IR':
      bool = Sheba.isValid(iban)
      break
    case 'FI':
      bool = FinnishBankUtils.isValidFinnishIBAN(iban)
      break
    //case 'FR':
      // RIB (partie) https://github.com/lingtalfi/jquery-validation-rib/blob/master/rib_fr_validity.js
      //break
    case 'MG': // Madagascar
      // "this format is identical to the French format"
      bool = IBAN.isValid(iban) && ibankit.IBAN.isValid(iban)
      break
    default:
      //bool = validate(iban)
      isSpecific = false
  }
  //return {isSpecific: isSpecific, isValid: bool}
  return bool
}

// for passing a test (in test.js)
function beforeVote(iban) {
  const FORMAT_IBAN = /^[A-Z]{2}[0-9]{2}[0-9A-Z]{11,30}$/;

  iban = IBAN.printFormat(iban, '')
  // Validate global IBAN format
  if (!iban.match(FORMAT_IBAN)) {
    console.error('! Invalid IBAN format; expecting: \'' + FORMAT_IBAN + '\', found: \'' + iban + '\'');
    return false
  }
  return vote(iban)
}

module.exports.isValid = beforeVote; // hack
