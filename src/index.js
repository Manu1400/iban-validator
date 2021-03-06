const miniban = require('miniban')
const IBAN = require('IBAN')
const ibankit = require('ibankit') //TODO: tsc (typescript)
const fastIban = require('fast-iban')
//const BICFromIBAN = require('bic-from-iban')
const IbanBT = require('banking-toolkit/src/modules/iban')

const Validator = require('validator.js').Validator;
//const is = require('validator.js').Assert.extend(require('validator.js-asserts'));
const validator = new Validator();

// Specific
const Sheba = require('iran-sheba')
const FinnishBankUtils = require('finnish-bank-utils')
const countries = require('./countries')
var BankUtils = require('unified-bank-utils')
//const banksDE = require('fints-institute-db')
const banksDE = require('./DE/blz.json')
//import banksDE from './DE/blz.json'

//TODO : move to use it as a Promise
//export const banksDE = async ()
//   => (await import(`./DE/blz.json`)) // .data;

const isValidNorwegianAccountNumber = require('is-valid-account-number')
const { isSINPE } = require('./CR/isSINPE')
//const isValidIbanSR = require('./SR/SR')
const depositIban = require('deposit-iban')
const isValidIsraelAccountNumber = require('il-bank-account-validator')

// https://github.com/andreicek/oib.js too

// https://stackoverflow.com/questions/34059644/mocha-command-giving-referenceerror-window-is-not-defined
//const oibValidator = require('./../node_modules/oib-validator.js/iban-hr')


//TODO : add njs-tfso-bankaccount-validation
// https://github.com/tfso/njs-tfso-bankaccount-validation/blob/1d669f87f54f378d2645ec8b0f0c431e400ff269/test/SE/testSwedishPlusgiroValidation.ts

// http://www.cnb.cz/cs/platebni_styk/iban/download/TR201.pdf
// check digit: varies

// or download currency data on https://www.currency-iso.org/en/home/tables/table-a1.html
const isCurrencyCode = require('is-currency-code')

// or https://github.com/liamja/modcheck.js
const UkModulusChecking = require('uk-modulus-checking')

//const tryPhp = require('./try-php')

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

function checkCurrency(iban) {
  var substr = iban.trim().substr(0, 2)
  // source: https://cs.wikipedia.org/wiki/International_Bank_Account_Number
  if (substr == "MU" || substr == "SC") {
    // currency on 3 characters
    if (isCurrencyCode(iban.substr(-3)) == false || iban.substr(-3) == "XBA") {
      console.log("wrong (or old) currency code in IBAN")
      return false
    }
  }
  if (substr == "GT") {
    // currency on 2 characters
    // https://bank.codes/iban/generate/guatemala/
    var currency = iban.substr(8, 2)
    if (currency == "01" || currency == "02" || currency == "28") {
      return true
    } else {
      console.log("wrong currency")
      return false
    }
  }

  return true
}

function checkUnitedBankLimited(iban) {
  const substr = iban.trim().substr(0, 2)
  const swift = iban.substr(4,4)
  // https://www.ubldirect.com/corporate/portals/_default/skins/darkknight/_ui/pdf/ibancommunication.pdf
  if (substr == "PK" && swift == "UNIL") {
    if (iban.substr(10, 2) != iban.substr(12).length) {
      return false
    }
  }
  return true
}

function checkBranch(iban) {
  var swift4 = iban.substr(4, 4)
  if (swift4 == "PALS") {
    var branches = ["0446", "0447", "0448", "0449", "0450", "0451", "0452", "0453", "0454", "0455", "0456", "0457", "0458", "0458", "0460", "0466", "0467", "0468", "0469", "0470", "0471", "0472", "0474", "0475", "0481", "0483", "0484"]
    var branch = iban.substr(8, 4)
    if (branches.includes(branch) == false) {
      console.log("unknown branch " + branch + " in IBAN " + iban)
      return false
    }
  }
  return true
}

function vote(iban) {
  iban = IBAN.printFormat(iban, '')
  var substr = iban.trim().substr(0, 2)
  if (substr == "WF") {
    return fastIban.validateIBAN(iban)
  }
  if (checkCurrency(iban) == false) {
    return false
  }
  if (checkUnitedBankLimited(iban) == false) {
    return false
  }
  if (checkBranch(iban) == false) {
    return false
  }
  if (substr == "IL") {
    var bankCode = iban.substr(4, 3)
    var branchCode = iban.substr(7, 3)
    var accountNumber = iban.substr(-13)
    console.log({
      bankCode: bankCode,
      branchCode: branchCode,
      accountNumber: accountNumber
    })
    // quick fix for LEUMI
    if (isValidIsraelAccountNumber(bankCode, branchCode, accountNumber) == false && bankCode != '010') {
      console.log("not a valid Israel iban")
      return false
    }
  }
  if (substr == "PK") {
    if (iban.substr(4, 4) == "MEZN") {
      // "Next two digits will be zeroes: 00" https://www.meezanbank.com/iban-generator/
      if (iban.substr(8, 2) != "00") {
        console.log("need 00 for Meezan Bank")
        return false
      }
      //TODO : check branch
      // 'bannu' in view-source:https://www.meezanbank.com/iban-generator/
    }
  }

  if (substr == "AT") {
    //TODO: check BLZ
  }

  if (substr == "GT") {
    var codes = ["BAGU", "CHNA", "TRAJ", "BINM", "INDL", "BRRL", "DIBI", "CITI", "VIVB", "FCOH", "BPRC", "ANTG", "AMCN", "AGRO", "GTCO", "BDCT", "AZTK", "FIVN", "FIOC", "FSCG", "FCOO"]
    if (codes.includes(iban.substr(4, 4)) == false) {
      return false
    }
  }

  // https://www.nbs.sk/en/payment-systems/iban/iban-slovak-republic -> ??
  if (substr == "SK") {
    const bankCode = iban.substr(4, 4)
    // 39 codes bank from this form https://podnikam.sk/kalkulacky/kalkulacka-iban/
    const codeBankSK = ["0200", "0720", "0900", "1100", "1111", "3000", "3100", "5200", "5600", "5900", "6500", "7300", "7500", "7930", "8020", "8050", "8100", "8120", "8130", "8160", "8170", "8180", "8191", "8300", "8320", "8330", "8340", "8350", "8360", "8370", "8380", "8390", "8400", "8410", "8420", "8430", "9950", "9951", "9952"]
    if (codeBankSK.includes(bankCode) == false) {
      console.log("SK: bank code not found " + bankCode)
      return false
    }
  }
  if (substr == "IR") {
    if (depositIban.util.isValidIban(iban) == false) {
      console.log("Wrong IBAN (source: depositIban)")
      return false
    }
  }
  //TODO : add test coverage
  //TODO : check digit "2 digits represent checksum number, calculated using ISO 7064 MOD 97-10"
  //  see https://github.com/todorowww/banking-srb/blob/master/tests/BankingSRBTest.php
  if (substr == "RS") {
    var bankCode = iban.substr(4, 3)
    // as 9 fev. 2019 https://www.nbs.rs/internet/latinica/20/plp/pu_jedinstveni_id_brojevi.pdf
    var bankCodesRS = require('./RS/bankCodeArr.json')
    if (bankCodesRS.includes(bankCode) == false) {
      console.log('code bank (in RS country) not found')
      return false
    }
  }

  if (substr == "CZ") {
    var bankCode = iban.substr(4,4)
    // download as 22 fev. 2019 https://www.cnb.cz/en/payment_systems/accounts_bank_codes/
    var bankCodesCZ = require('./CZ/bankCodes.json')
    if (bankCodesCZ.includes(bankCode) == false) {
      console.log('code bank (in CZ country) not found')
      return false
    }
  }

  //TODO : add test coverage
  if (substr == "HR") {
    const { checkAccount } = require('./HR/checkAccount')
    if (checkAccount(iban.substr(-10)) == false) {
      return false
    }

    var bankCode = iban.substr(4, 7)
    console.log(bankCode)
    // as 9 fev. 2019 https://www.hnb.hr/temeljne-funkcije/platni-promet/vodeci-brojevi-banaka
    var bankCodesRS = require('./HR/bankCodeArr.json')
    if (bankCodesRS.includes(bankCode) == false) {
      console.log('code bank (in HR country) not found')
      return false
    }
  }

  // https://github.com/MiroslavJelaska/iban-hr.js
  /*
  if (substr == "HR") {
    if (oibValidator.getDetails().bankName.length <= 1) {
      console.log("bank name too short")
      return false
    }
  }
  */

  //FR: CIB data https://www.banque-france.fr/bdf_tcn/issuers
  // from https://www.banque-france.fr/politique-monetaire.html

  //TODO: add https://github.com/fhoeben/hsac-fitnesse-plugin/issues/23 ?
  // https://www.credit-et-banque.com/codes-cib-des-banques-en-france/
  // old list: https://intendancezone.net/IMG/pdf/eccib.pdf
  if (substr == "FR") {
    const bankCode = iban.substr(4, 5)
    const branchCode = iban.substr(9, 5) // code guichet
    const accountNumber = iban.substr(14, 11)
    // La Banque Postale (shortname: LBP) (old name: La Poste)
    // source: http://www.banksfrance.com/la-banque-postale
    if (bankCode === "30041") {
      // source: https://fr.misc.finance.banque.narkive.com/CnMhuXjp/le-code-banque-de-la-banque-postale-change
      console.log("Old bank code")
      return false
    }
    if (bankCode === "20041") {
      var letter = accountNumber.substr(7, 1)
      //TODO: add a test in test coverage
      if (/[A-Z]/.exec(letter) === null) {
        return false
      }
      // - F ? U (ancien ?)
      if (/[MPTBJYRZXU]/.exec(letter) === null) {
        console.log("letter " + letter)
      }
      if (branchCode == "01006" && letter != "M") {
        console.log("wrong letter")
        return false
      }
      // https://fr.wikipedia.org/wiki/Centre_de_ch%C3%A8ques_postaux
      if (branchCode == "00001" && accountNumber.substr(9) != "20") {
        console.log("wrong code")
        return false
      }
    }
  }
  if (substr == "NO") {
    const BBAN = iban.substr(4)
    if (isValidNorwegianAccountNumber(BBAN) == false) {
      console.log("wrong account number")
      return false
    }
  }
  if (substr == "DE") { // for DE02100500000024290661
    var bankCode = iban.substr(4, 8)
    //var accountNumber = parseInt(iban.substr(12), 10) // à vérifier (12)
    console.log(banksDE)
    return banksDE.includes(bankCode)
    /*
    var bank = banksDE.filter( function( bank ) {
      return bank.blz === bankCode
    })
    if (bank.length > 1) {
      console.warn("Plusieurs banques allemandes correspondent")
    }
    if (bank.length == 0) {
      return false
    }
    */
  }
  if (substr == "TR") {
    const reserveDigit = iban.substr(9, 1)
    if (reserveDigit != '0') {
      // no source
      console.log('wrong reserve digit')
      return false
    }
  }
  if (substr == "SE") {
    /*
    // see https://github.com/jop-io/kontonummer.js
    // fork: https://github.com/ajgarn/kontonummer.js/commits/master
    const is8 = (iban.substr(9, 1) == "8") // "0" -> false
    var sortCode = is8 ? iban.substr(9, 5) : iban.substr(13, 4)
    var accountNumber = is8 ? iban.substr(14) : iban.substr(17)
    console.log({sortCode: sortCode, accountNumber: accountNumber})
    var account = BankUtils.SE.account(sortCode, accountNumber)
    console.log({account: account})
    //console.log(account.bankName)
    //Note: can use kontonummer.js too
    if (account.validateClearingNumber() == false) {
      console.log("erreur numéro 1 présente")
    }
    if (account.validateAccountNumber() == false) {
      console.log("erreur numéro 2 présente")
    }
    if (account.isValid() == false) {
      console.log("erreur numéro 3 présente")
    }

    if (account.validateClearingNumber() == false || account.validateAccountNumber() == false || account.isValid() == false) {
      console.log("error")
      return false
    }
    */
  }
  if (substr == "CR") {
    const sinpe = iban.substr(5)
    // check SNIPE
    if (isSINPE(sinpe) == false) {
      console.log("sinpe invalid")
      return false
    }
  }
  if (substr == "BE") {
    // % 97 :
    //isAccountNumber(iban.substr(...), iban.substr(,), iban.substr(,))
  }

  // from https://virements-internationaux.bnpparibas.fr/rsc/websites/virements-internationaux/documents/pdf/fiche-info-2-liste-pays-structure-compte.pdf
  //MALTE MT 046 MTkk BBBB SSSS SCCC CCCC CCCC CCCC B = premiers caractères du code SWIFT), S = code groupe de
  if (substr == "MT") {
    //TODO: check SWIFT
  }
  if (substr == "MT") {
    // check BIC 4 https://www.centralbankmalta.org/iban

    // get sortCodes from BIC 4

    // APS Bank
    if (iban.substr(4,4) == "APSB") {
      var accountNumber = iban.substr(-11)
      // TODO: check with fetch() if accountnumber is OK and check IBAN generated
      // use https://www.apsbank.com.mt/en/iban
    }
    // Bank of Valletta (BOV)
    if (iban.substr(4, 4) == "VALL") {
      var accountNumber = iban.substr(-11)
      // TODO: check with fetch() if accountnumber is OK and check IBAN generated
      // use https://www.bov.com/ibanvalidator.aspx
    }
  }
  if (substr == "SA") {
    var accountNumber = iban.substr(-12)
    // Alawwal Bank)
    if (true) { // check code bank
      // TODO: fetch https://www.alawwalbank.com/en/personal/accounts/iban-calculator
      // 010195510159 (validate) -> SA26 5000 0000 0101 9551 0159
      // from real, www.ajib.com/ar/node/313
    }
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
  if (IBAN.isValid(iban) == false && substr != "VA") {
    votes.push('IBAN')
  }
  if (substr == "VA" && isVaticanAccepted() == false) {
    return false
  }

  // could add https://github.com/uphold/validator.js-asserts#internationalbankaccountnumber-iban ?
  //if (validator.validate(iban, is.internationalBankAccountNumber()) == false) {
  //  votes.push('validator.js-asserts_is_iban_function')
  //}

  //if (BICFromIBAN.validateIBAN(iban) == false) {
  //  votes.push("BICFromIBAN")
  //}

  //TODO: utiliser aussi le module sortCode
  if (IbanBT.isValid(iban) == false) {
    //TODO : run only on simples (larges) countries
    if (substr != "LC" && substr != "ST" && substr != "SC" && substr != "DE"
      && substr != "IR" && substr != "UA" && substr != "SV" && substr != "VA") {
      votes.push("banking-toolkit")
    }
  }

  //var letter = tryPhp.verify_iban(iban)
  //console.log(letter)
  //if (letter !== "ok") {
  //  votes.push("tryPhp")
  //}


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
    console.log(substr + " is not a valid ISO code")
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
      }).isValid() && miniban.isValidIBAN(iban) // && validator.validate(iban, is.internationalBankAccountNumber())
      //note: can check sortCode on webpage http://www.fasterpayments.org.uk/consumers/sort-code-checker
      break
    case 'IR':
      var recognize = Sheba.recognize(iban)
      bool = (typeof(recognize) !== "boolean" && recognize !== false)
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

function isVaticanAccepted() {
  return new Date() >= new Date("01/11/22019")
}

// for passing a test (in test.js)
function beforeVote(iban) {
  const FORMAT_IBAN = /^[A-Z]{2}[0-9]{2}[0-9A-Z]{11,30}$/;

  iban = IBAN.printFormat(iban, '')
  // Validate global IBAN format
  if (!iban.match(FORMAT_IBAN)) {
    console.log('! Invalid IBAN format; expecting: \'' + FORMAT_IBAN + '\', found: \'' + iban + '\'');
    return false
  }
  return vote(iban)
}

module.exports.isValid = beforeVote; // hack
