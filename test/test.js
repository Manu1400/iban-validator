'use strict'

const assert = require('assert');
const chai = require('chai')
const validation = require('../index')

// todo : add timeout https://mochajs.org/#suite-level

describe('#isValid', function() {
  it('IBAN, length, checksum, bank code, account and structure', function() {
    chai.expect(validation.isValid('GB33BUKB20201555555555')).to.equal(true)
  });
  // from https://www.iban.com/calculate-iban
  it('country United Kingdom (UK), Sort Code 200415 and account number 38290008', function() {
    chai.expect(validation.isValid('GB46BUKB20041538290008')).to.equal(true)
  });
  // "Example 1" from https://www.vocalink.com/media/3061/vocalink-validating-account-numbers-v540.pdf
  it('UK: 180002 Account number 98093517', function() {
    chai.expect(validation.isValid('GB59COUT18000298093517')).to.equal(true)
  });

  // https://twitter.com/HSBC_UK/status/1092125192053231617
  // https://www.coursehero.com/file/p50oddp/in-normal-circumstances-be-able-to-pay-to-your-Credit-Card-and-have-the/
  it('Visa Card 454638 or MasterCard: HSBC and Welsh or Gold Visa', function() {
    chai.expect(validation.isValid('GB52HBUK40424699009787')).to.equal(true)
  });

  // case from https://github.com/fourcube/goiban-service/issues/9
  it('BE IBAN', function() {
    // avoid No BIC found for bank code: 001
    chai.expect(validation.isValid('BE29001287409864')).to.equal(true)
  });

  it('LB Valid IBAN', function() {
    // Account number: 000012121234567
    chai.expect(validation.isValid('LB72001000000000012121234567')).to.equal(true)
  });

  // explain from https://www.bpfi.ie/wp-content/uploads/2014/08/MOD-97-Final-May-2013-4.pdf
  it('IR Valid IBAN', function() {
    // National Sort Code (NSC): 92-05-01
    // Account Number: 12345678
    // BIC: IRCEIE2DAPS
    chai.expect(validation.isValid('IE 64 IRCE 92050112345678')).to.equal(true)
  });

  //TODO: implement validation of Sort codes of the Republic of Ireland
  // data: https://en.wikipedia.org/wiki/Sort_code#Sort_codes_of_the_Republic_of_Ireland

  //TODO: implement validation of Sort codes in Poland

  // real IBAN, from https://pl.wikipedia.org/wiki/Numer_rozliczeniowy
  it('PL Valid IBAN', function() {
    // https://github.com/mczuchnowski/polish_banks/blob/master/lib/data/1010.yml :
    // 1010 1023 -> branch: Oddział Okręgowy w Warszawie - Rozliczenia ZUS
    chai.expect(validation.isValid('PL83 1010 1023 0000 2613 9510 0000')).to.equal(true)
  });

  // bank code from list https://bank.gov.ua/control/bankdict/banks?type=369&sort=mfo_code&cPage=1&startIndx=21
  it('UA Valid IBAN', function() {
    // bank code : 312248
    // account number : 1234567890123456789 (19-characters Number or Alphabet)
    chai.expect(validation.isValid('UA463122481234567890123456789')).to.equal(true)
  });

  //TODO: utiliser liste des codes de banque (MFO) https://bank.gov.ua/control/bankdict/banks?type=369&sort=mfo_code&cPage=1&startIndx=21

  // from http://www.swissiban.com/fr.htm
  it('CH Valid IBAN', function() {
    // Account number: 0A1024502601
    chai.expect(validation.isValid('CH78 0055 40A1 0245 0260 1')).to.equal(true)
    // https://twitter.com/Ra2bi/status/612930090419269632
    chai.expect(validation.isValid('CH84 0900 0000 1269 0363 7')).to.equal(true)
  });

  // from http://www.leasing.md/lsmain.nsf/rom/page/payment
  it('Real Moldova Agroindbank Valid IBAN', function() {
    // Valuta MDL: IBAN MD51AG000000000225171584
    chai.expect(validation.isValid('MD51AG000000000225171584')).to.equal(true)

    // Valuta EUR: IBAN MD24AG000000000225171585
    chai.expect(validation.isValid('MD24AG000000000225171585')).to.equal(true)

    // Valuta USD: IBAN MD94AG000000000225171586 -> account number: 225171586
    chai.expect(validation.isValid('MD94AG000000000225171586')).to.equal(true)
  });

  //TODO : call AJAX https://www.maib.md/ro/calculator-iban/ to validate account number
  it('Real Moldova Agroindbank Valid IBAN', function() {
    // 1225100013104168 : wrong acccount number
    // chai.expect(validation.isValid('MD70AG001225100013104168')).to.equal(false)
  });

  // https://www.abl.com/business-banking/home-remittances/generate-iban/
  it('generated IBAN from abl.com', function() {
    // account number: 0010000000000015
    chai.expect(validation.isValid('PK69 ABPA 0010 0000 0000 0015')).to.equal(true)
  });

  // https://www.hellenicbank.com/portalserver/hb-en-portal/useful-tools/iban-converter
  it('generated IBAN from hellenicbank.com', function() {
    // account number: 1234567890123
    chai.expect(validation.isValid('CY22 0050 0123 0001 2345 6789 0123')).to.equal(true)
  });

  // account number: 101501150115
  // https://www.alsalambahrain.com/en/ONLINE-SERVICES/iban
  // see https://www.alsalambahrain.com/Style%20Library/JS/webpart/IBANGenerator.js
  it('IBAN Al Salam Bank with valid account number', function() {
    chai.expect(validation.isValid('BH58ALSA00101501150115')).to.equal(true)
  });

  //TODO: find documentation
  /*
  it('TN invalid IBAN: RIB / Account Number checksum is not valid', function() {
    // generated IBAN
    // two issues: RIB / Account Number checksum (& IBAN structure is incorrect)
    chai.expect(validation.isValid('TN4810001000101000000000')).to.equal(false)
  });
  */

  // https://www.nbs.sk/sk/platobne-systemy/iban/vypocet-iban-pre-sr
  it('SK IBAN with valid prefix, valid account, valid bank number', function() {
    //Numerický kód banky: 0720 (in list)
    // préfixe : 000289
    // Druhá časť čísla účtu - základné číslo účtu: 1987426353 (valid)
    chai.expect(validation.isValid('SK68 0720 0002 8919 8742 6353')).to.equal(true)
  });
  //TODO: find documentation
  /*
  it('SK IBAN with wrong prefix', function() {
    //Numerický kód banky: 0720 (in list)
    // WRONG préfixe : 000281
    // Druhá časť čísla účtu - základné číslo účtu: 1987426353 (valid)
    chai.expect(validation.isValid('SK7907200002811987426353')).to.equal(false)
  });
  */
  //TODO: find documentation
  /*
  it('SK IBAN with wrong account number', function() {
    // Numerický kód banky: 0720 (in list)
    // préfixe : 000289
    // wrong account number: 0000000012
    chai.expect(validation.isValid('SK1607200002890000000012')).to.equal(false)
  });
  */
  it('SK IBAN with wrong bank code', function() {
    // wrong : 0721 (NOT in list - check 2019)
    // préfixe : 000289
    // account number: 00000000121987426353
    chai.expect(validation.isValid('SK4307210002891987426353')).to.equal(false)
  });

  // case from https://github.com/fourcube/goiban-service/issues/19
  it('multiple BICs for a single IBAN', function() {
    chai.expect(validation.isValid('NL42DEUT0466964617')).to.equal(true)
  });

  // from https://www.iban.com/calculate-iban
  it('France (FR) Bank Code (Code Banque) - 30002, Branch Code (Code Guiche) - 00550 and account number (Numéro de Compte) - 0000157841Z', function() {
    chai.expect(validation.isValid('FR3330002005500000157841Z25')).to.equal(true)
  });

  it('France (FR) real IBAN', function() {
    chai.expect(validation.isValid('FR76 3000 3041 2300 0509 4405 264')).to.equal(true)
    chai.expect(validation.isValid('FR76 3000 3030 8500 0372 6144 945')).to.equal(true)
  });

  it('IBAN, bank code not found (bank cannot be identified): Valid length, checksum, bank code, account and structure', function() {
    chai.expect(validation.isValid('GB94BARC10201530093459')).to.equal(true)
  });

  it('IBAN check digits MOD-97-10 as per ISO/IEC 7064:2003', function() {
    chai.expect(validation.isValid('GB94BARC20201530093459')).to.equal(false)
  });

  it('Invalid IBAN length must be "X" characters long!', function() {
    chai.expect(validation.isValid('GB96BARC202015300934591')).to.equal(false)
  });

  it('Invalid account structure', function() {
    chai.expect(validation.isValid('GB12BARC20201530093A59')).to.equal(false)
  });

  it('Bank Code not found and Invalid bank code structure', function() {
    chai.expect(validation.isValid('GB78BARCO0201530093459')).to.equal(false)
  });

  // IBAN invalide et structure de contrôle
  it('Invalid IBAN checksum structure', function() {
    chai.expect(validation.isValid('GB2LABBY09012857201707')).to.equal(false)
  });

  it('Country does not seem to support IBAN!', function() {
    chai.expect(validation.isValid('US64SVBKUS6S3300958879')).to.equal(false)
  });

  // from https://github.com/arhs/iban.js/issues/62
  it('invalid SN IBAN structure', function() {
    chai.expect(validation.isValid('SN08SN0100152001608930008516')).to.equal(false)
  });

  //TODO: https://github.com/symfony/symfony/commit/07b38dea1f76bdba9800e9106b9db2e2d0a65ef2
  //TODO: WF or FR ?! https://www.nordea.dk/erhverv/produkter/konti-betalinger/iban-codes-en.html
  //it('Country: Wallis and Futuna Islands', function() {
    //chai.expect(validation.isValid('WF9120041010050500013M02606')).to.equal(true)
  //});

  // Note: can display bank name with https://github.com/jrasanen/fibank
  it('Valid Finnish IBAN bank account number and reference number', function() {
    chai.expect(validation.isValid('FI9080002627761348')).to.equal(true)
    // Number checksum is valid
    chai.expect(validation.isValid('FI2712345612345673')).to.equal(true)
  });

  it('Account Number checksum is invalid.', function() {
    chai.expect(validation.isValid('FI8112345612345671')).to.equal(false)
  });

  it('Valid Finnish IBAN bank account number and reference number with spaces', function() {
    chai.expect(validation.isValid('FI90 800026 27761348')).to.equal(true)
  });

  // from swift_iban_registry_201812.pdf
  it('Valid IBAN of AE – United Arab Emirates (The)', function() {
    chai.expect(validation.isValid('AE070331234567890123456')).to.equal(true)
  });

  // from https://www.adcb.com/personalbanking/accounts/iban.asp
  it('generated IBAN from adcb.com', function() {
    chai.expect(validation.isValid('AE840030000123456789012')).to.equal(true)
  });

  // https://sebgroup.com/pow/apps/iban/ci/ibancalc.asp?lang=en
  it('generated IBAN from adcb.com', function() {
    // National SEB Account No : 5491 0000003
    chai.expect(validation.isValid('SE3550000000054910000003')).to.equal(true)
    // account number: 12630247 (ex)
    chai.expect(validation.isValid('GB63ESSE40486512630247')).to.equal(true)
  });

  // https://www.emiratesnbd.com/en/iban/ (capcha)
  it('generated IBAN from adcb.com', function() {
    // Account Number : 1234567890123
    chai.expect(validation.isValid('AE980260001234567890123')).to.equal(true)
  });

  // https://www.hsbc.com.mt/1/2/mt//en/useful-information/iban-calculator
  it('HSBC Bank Malta invalid account', function() {
    // '123456789012' is an invalid account
    //TODO: generated this wrong IBAN
  });
  // https://www.hsbc.ae/1/2/common/iban-generator
  it('HSBC UAE IBAN generated', function() {
    // '1-123876-118' -> invalid (not 12 chars)
    // '122-123876-118' -> valid (12 chars)
    chai.expect(validation.isValid('AE580200000122123876118')).to.equal(true)
  });

  // example from https://www.hsbc.fr/1/2/hsbc-france/particuliers/banque-au-quotidien/pays-iban
  it('Maurice (Île)	- 29 chars', function() {
    chai.expect(validation.isValid('MU22BOMM020220204040020000MUR')).to.equal(true)
  });
  // example from https://www.xe.com/ibancalculator/sample/?ibancountry=mauritius
  it('Maurice (Île)	- 30 chars', function() {
    // MUR = OK
    chai.expect(validation.isValid('MU17 BOMM 0101 1010 3030 0200 000M UR')).to.equal(true)
  });
  it('Timor-Leste IBAN Format', function() {
    chai.expect(validation.isValid('TL38 0080 0123 4567 8910 157')).to.equal(true)
  });

  // Invalid currency
  it('Maurice (Île)	- invalid currency', function() {
    // 'NOT' is not a currrency
    chai.expect(validation.isValid('MU12 BOMM 0101 1010 3030 0200 000N OT')).to.equal(false)
  });
  // Currency in ISO 4217 but it's an old code
  // example from https://fr.wikipedia.org/wiki/ISO_4217#BRR
  it('IBAN - old ISO 4217 code', function() {
    // XBA: old
    chai.expect(validation.isValid('MU23 BOMM 0101 1010 3030 0200 000X BA')).to.equal(false)
  });
  //TODO: avoid XTS currency code

  //TODO: find BBAN (two) Check Digit in TL IBAN

  // Longest IBAN: 26 Characters (4 + 22 BBAN):
  it('Futur: India (IN) Longest IBAN', function() {
    // found on https://www.iban.in/structure.html
    chai.expect(validation.isValid('IN68 0027 4324 5672 4672 1968 72')).to.equal(false) // false because it's futur
  });

  it('Iran valid code', function() {
    chai.expect(validation.isValid('IR240150000001177301920207')).to.equal(true)
  });
  it('Iran (mellat iban) invalid check digit', function() {
    chai.expect(validation.isValid('IR680120010000004168450796')).to.equal(false)
  });
  // from https://github.com/rghorbani/iran-sheba/blob/master/test.js
  it('Iran valid IBAN', function() {
    chai.expect(validation.isValid('IR820540102680020817909002')).to.equal(true)
  });

  // https://github.com/globalcitizen/php-iban/issues/39

  // Italy
  // https://fr.scribd.com/doc/10585036/Calculating-CIN
  // https://github.com/globalcitizen/php-iban/commit/757829ca299a4c1bb1a22ea2191d20cce3a1d2bc

  // FI (Finland)
  // https://web.archive.org/web/20150919235348/http://pear.php.net/manual/en/package.validate.validate-fi.validate-fi.bankaccount.php


});

//TODO : add DE
// https://www.bundesbank.de/en/tasks/payment-systems/services/bank-sort-codes/download---bank-sort-codes-626218
// https://www.bundesbank.de/en/homepage/search/bank-sort-codes-search

// TODO: check BBAN
// https://github.com/Al-/IbanValidator/blob/master/ibanvalidator.cpp

// TODO: Specific
// see documentation: https://github.com/globalcitizen/php-iban/issues/39
// can use https://github.com/niutech/node.php
// or https://www.npmjs.com/package/node-php

// add https://ssl.ibanrechner.de/sample_accounts.html

// add BR https://github.com/lkraider/iban-generator

describe('#isValid impossible to detect invalid IBAN', function() {

  //TODO : use validate_account_uk (API) https://api.iban.com/clients/api/eiscd/#
  // Invalid IBAN check digit!
  // The IBAN contains an incorrect checksum.
  it('Invalid IBAN checksum (1/2) GB', function() {
    //TODO: use https://www.ibancalculator.com/validate/GB01BARC20714583608387
    chai.expect(validation.isValid('GB01BARC20714583608387')).to.equal(false)
    // good IBAN : GB98BARC20714583608387
  });
  // Invalid IBAN check digit!
  it('Invalid IBAN checksum (2/2) GB', function() {
    chai.expect(validation.isValid('GB00HLFX1101611145365')).to.equal(false)
  });

  it('Bank Code not found and invalid account', function() {
    chai.expect(validation.isValid('GB24BARC20201630093459')).to.equal(false)
  });

  //TODO : use https://github.com/uphold/uk-modulus-checking
  it('Invalid account number (1/2)', function() {
    // Error: Account Number or Sort Code checksum is not valid
    chai.expect(validation.isValid('GB02BARC20201530093451')).to.equal(false)
  });

  it('Invalid account number (2/2)', function() {
      // IBAN complies with the standard (BUT invalid account number)
    chai.expect(validation.isValid('GB68CITI18500483515538')).to.equal(false)
  });

  // from https://github.com/epreviati/iban-lib/blob/20aec02c9e988dfd7917a8639cb6b5a195b34b1a/IbanLib.Countries.Test/Countries/VGTest.cs
  it('VG - Virgin Islands IBAN', function() {
    chai.expect(validation.isValid('VG96VPVG0000012345678901')).to.equal(true)
  });

  it('PT - IBAN', function() {
    chai.expect(validation.isValid('PT50 0002 0123 1234 5678 9015 4')).to.equal(true)
  });
  it('PT - invalid IBAN - not PT50', function() {
    chai.expect(validation.isValid('PT77 0002 0123 1234 5678 9015 3')).to.equal(false)
  });

  // from https://github.com/arhs/iban.js/issues/61
  it('IBAN structure is incorrect', function() {
    chai.expect(validation.isValid('VG4835Q30660010096333091')).to.equal(false)
  });

  it('IBAN incorrect!', function() {
    chai.expect(validation.isValid('FI@ +425*000*151=0 == #000$ 0° 23€€€!!!!!')).to.equal(false)
  });

  // from https://github.com/go-pascal/iban/issues/6
  it('ST valid IBAN', function() {
    chai.expect(validation.isValid('ST23000200000289355710148')).to.equal(true)
  });

  it('IBAN lowercase', function() {
    chai.expect(validation.isValid('Sk2683300000002700890226')).to.equal(true)
  });

  it('ES with Account Number checksum is invalid', function() {
    // X   Check Digit (Dígito de Control) you entered (09) does not match with the calculated figure (01).
    chai.expect(validation.isValid('ES06 0030 1235 0903 0005 0273')).to.equal(false)
  });

  it('GB', function() {
    chai.expect(validation.isValid('GB29NWBK60161331926819')).to.equal(true)
  });

  // TODO : IT

  // https://it.wikipedia.org/wiki/Coordinate_bancarie#Codice_BBAN -> BBAN -> CAB
  // CAB list https://www.italianbankcodes.com/ -> fetch

  // generator
  // https://www.ibancalculator.com/bic_und_iban.html

  it('SA', function() {
    chai.expect(validation.isValid('SA0380000000608010167519')).to.equal(true)
  });

  it('MC', function() {
    chai.expect(validation.isValid('MC5813488000010051108001292')).to.equal(true)
  });
  // from https://www.ecb.europa.eu/paym/retpaym/paymint/sepa/shared/pdf/iban_registry.pdf
  it('QA', function() {
    chai.expect(validation.isValid('QA58DOHB00001234567890ABCDEFG')).to.equal(true)
  });
  // Invalid IBAN check digit!
  it('LC false', function() {
    chai.expect(validation.isValid('LC62HEMM000100010012001200023015')).to.equal(false)
  });
  // from https://github.com/jDTAUS/ISO-13616/commit/590936a4d8b855a475830040d1cda8f9783b7af2
  it('Saint Lucia [LC] valid', function() {
    chai.expect(validation.isValid('LC55HEMM000100010012001200023015')).to.equal(true)
  });

  it('AZ', function() {
    chai.expect(validation.isValid('AZ21NABZ00000000137010001944')).to.equal(true)
  });

  it('Account number contains a valid checksum but the IBAN contains an incorrect checksum.', function() {
    chai.expect(validation.isValid('NO9370580671290')).to.equal(false)
  });

  //SEYCHELLES et dépendances: SC 355
  it('SC', function() {
    chai.expect(validation.isValid('SC 18 SSCB 1101 0000000000001497 USD')).to.equal(true)
  });

  // https://bank.codes/iban/structure/seychelles/
  it('SC with invalid currency', function() {
    // ABC is not a valid currency
    chai.expect(validation.isValid('SC74SSCB11010000000000001497ABC')).to.equal(false)
  });

  // https://www.alhilalbank.ae/iban-generator/
  it('alhilalbank.ae', function() {
    // 12 chars for account number
    chai.expect(validation.isValid('AE950530000123456789012')).to.equal(true)
    chai.expect(validation.isValid('AE950530009123456789012')).to.equal(false)
  });

  // https://www.nbad.com/en-ae/personal-banking/accounts/iban.html
  it('nbad.com', function() {
    // "9-10" chars for account number
    chai.expect(validation.isValid('AE750350000000123456789')).to.equal(true)
    chai.expect(validation.isValid('AE160350000001000000000')).to.equal(true)
  });

  //TODO : use https://www.bankaletihad.com/en/about-the-site/iban-generator
  //The Account Number You Entered Appears To Be Incorrect. Please Double-Check It And Try Again.

  // https://www.bankofjordan.com/iban_generator?branch=0020&accountNumber=1111111111111111
  it('bankofjordan.com', function() {
    chai.expect(validation.isValid('JO52BJOR0020001111111111111111')).to.equal(true)
  });

  // https://www.bankalhabib.com/iban/
  it('PK generated bankalhabib.com', function() {
    chai.expect(validation.isValid('PK86BAHL1111111111111111')).to.equal(true)
    // Your Conventional Account Number is: 12345678901234567
    chai.expect(validation.isValid('PK68BAHL1234567890123456')).to.equal(true)
  });

  // https://www.meezanbank.com/iban-generator/
  it('PK generated meezanbank.com', function() {
    // Abbottabad, Abbottabad Branch, 1234567890 -> Branch Code 1501
    // city -> list of branch possible -> branch (but don't use code for city)
    chai.expect(validation.isValid('PK54MEZN0015011234567890')).to.equal(true)
    // Branch code 5201
    chai.expect(validation.isValid('PK59MEZN0052011234567890')).to.equal(true)
    // Real https://twitter.com/alkhidmatkp/status/1075379660475809792
    chai.expect(validation.isValid('PK39MEZN0007010100716354')).to.equal(true)
  });

  // https://bankofpalestine.com/en/iban * Great form *
  it('IBAN generated bankofpalestine.com', function() {
    chai.expect(validation.isValid('PS03PALS044612345670013102009')).to.equal(true)
    chai.expect(validation.isValid('PS19PALS048412345670993000000')).to.equal(true)
  });
  it('Inexistant branch', function() {
    chai.expect(validation.isValid('PS93PALS050012345670993000000')).to.equal(false)
  });

  // http://www.ajmanbank.ae/site/uae-iban-format.html
  it('IBAN generated ajmanbank.ae', function() {
    // Ajman Bank Account Number : 12 digits
    chai.expect(validation.isValid('AE920570000123456789012')).to.equal(true)
  });

  // https://www.jsbl.com/iban-converter/ * great form*
  it('IBAN generated jsbl.com', function() {
    // Account Number : 6 digits ?
    chai.expect(validation.isValid('PK67JSBL9030000000123456')).to.equal(true)
  });
  // https://www.bankalfalah.com/iban
  it('IBAN generated bankalfalah.com', function() {
    // 1111-9123456789
    chai.expect(validation.isValid('PK38ALFH1111009123456789')).to.equal(true)
  });

  // http://www.arabbank.ps/en/ibangenerator.aspx
  it('IBAN generated arabbank.ps', function() {
    chai.expect(validation.isValid('PS35 ARAB 0000 0000 1234 1234 5612 3')).to.equal(true)
  });

  // https://www.qnb.com/cs/Satellite/QNBQatar/en_QA/enIBANBSCalculator
  it('IBAN generated qnb.com', function() {
    chai.expect(validation.isValid('QA85QNBA000000001234567890123')).to.equal(true)
  });

  // https://abk.eahli.com/abk/IBANValidate.aspx
  it('IBAN generated abk.eahli.com', function() {
    // account number : 0612345678901
    chai.expect(validation.isValid('KW47ABKK0000000000612345678901')).to.equal(true)
    //0812345678901 =  * Not Correct account number
  });
  // https://www.kib.com.kw/EnIBAN.cms
  it('IBAN generated kib.com.kw', function() {
    // account number : 012345678901
    chai.expect(validation.isValid('KW14KWIB0000000000012345678901')).to.equal(true)
  });
  // http://smebank.org/iban-generator/
  it('IBAN generated abk.eahli.com', function() {
    // account number : 1234123456781234
    chai.expect(validation.isValid('PK90SMES1234123456781234')).to.equal(true)
  });
  // https://seb.se/pow/wave/apps/iban/ibancalc.asp?lang=en
  it('IBAN generated seb.se', function() {
    // account number : 0004 126302470
    chai.expect(validation.isValid('FR7611008000010004126302470')).to.equal(true)
    //TODO : 0001 126302470 accountnumber is incorrect. (France)
    //TODO : 0004 126302471 accountnumber is incorrect. (France)
    // account number : 5295 0010004357
    chai.expect(validation.isValid('DK8052950010004357')).to.equal(true)
    chai.expect(validation.isValid('PL42237000080000000020001034')).to.equal(true)
  });

  // real, from https://www.eilersen.com/bank-information/
  it('DK real IBAN', function() {
    // (BIC: NDEADKKK)
    // Registration No: 2230
    // Account No: 50 36 08 21 45 -> 5036 0821 45
    // Currency : EUR
    chai.expect(validation.isValid('DK 83 2000 5036 0821 45')).to.equal(true)
  });

  it('IBAN generated seb.se but with a unknown blz', function() {
    chai.expect(validation.isValid('DE78352101121004925411')).to.equal(false)
  });

  it('DE valid IBAN with a valid blz', function() {
    // Details for 10050000 - 24290661
    chai.expect(validation.isValid('DE02100500000024290661')).to.equal(true)
  });

  // https://www.mobilefish.com/services/elfproef/elfproef.php
  it('DE valid with valid account number', function() {
    // account number: 755490975, blz: 10050000
    chai.expect(validation.isValid('DE69100500000755490975')).to.equal(true)
  });
  // https://www.mobilefish.com/services/elfproef/elfproef.php
  //TODO: implement this rule
  /*
  it('DE valid with invalid account number', function() {
    // 10050000 - 7584955151
    // "Kontonummer/Account Number is not valid"
    chai.expect(validation.isValid('DE95100500007584955151')).to.equal(false)
  });
  */

  // from https://github.com/zrrrzzt/is-valid-account-number
  it('NO IBAN valid with valid account', function() {
    // Account : 12345678903
    chai.expect(validation.isValid('NO7112345678903')).to.equal(true)
  });
  it('NO with invalid account', function() {
    // Account : 12345678902
    // Account Number Checksum is Invalid
    chai.expect(validation.isValid('NO9812345678902')).to.equal(false)
  });

  // https://www.winbank.gr/sites/idiwtes/en/Pages/Structure/WinbankIBANCalculator.aspx
  // doc : https://www.piraeusbank.gr/en/idiwtes/logariasmos-iban
  it('IBAN generated winbank.gr', function() {
    // account number :
    chai.expect(validation.isValid('GR7701720110005011000009849')).to.equal(true)
  });

  // https://www.rietumu.com/accounts-iban
  it('IBAN generated rietumu.com', function() {
    // account number : Account length must be either 9 or 15 characters.
    // 123456789012345 ne peut pas etre un compte valide
    chai.expect(validation.isValid('LV24 RTMB 0000 1234 5678 9')).to.equal(true)
    // Real
    chai.expect(validation.isValid('LV57 RTMB 0000 0048 01721')).to.equal(true)
    chai.expect(validation.isValid('LV47 RTMB 0000 6008 0404 5')).to.equal(true)
  });

  // https://www.byblosbank.com/LightBoxForms/Iban.aspx
  it('IBAN generated byblosbank.com', function() {
    // account number : 13 digits
    chai.expect(validation.isValid('CY50110009500001234567890123')).to.equal(true)
    chai.expect(validation.isValid('LB31003900000001234567890123')).to.equal(true)
  });

  // GOV http://mf.gov.md/ro/iban
  it('Real IBAN generated mf.gov.md', function() {
    //parms: year 2016, 111110, 1200, 1201
    chai.expect(validation.isValid('MD63TRGAAA11111001130000')).to.equal(true)
    // pick in CSV file downloaded
    chai.expect(validation.isValid('MD91TRGDAV11324010390000')).to.equal(true)
  });

  // https://www.kb.cz/en/other/calc/iban
  // 100001 prefix is OK

  // https://www.cnb.cz/cs/platebni_styk/iban/iban.html
  it('IBAN generated by calculator', function() {
    //TODO: check modulo 10 twice (modulo 10 ?! -> 19 OK)
    // view-source:https://www.cnb.cz/cs/platebni_styk/iban/iban.html -> Číslo není modulo 11
    chai.expect(validation.isValid('CZ38 0710 0000 1900 0000 0019')).to.equal(true)
  });

  // https://www.teb.com.tr/iban-hesaplama/
  it('IBAN generated by teb.com.tr', function() {
    chai.expect(validation.isValid('TR170003200000000012345678')).to.equal(true)
  });

  // TR : check reserve code
  // documentation : https://www.teb.com.tr/for-you/iban/
  it('TR wrong reserve digit', function() {
    // reserve : set 9 as reserve digit (wrong)
    // ->  IBAN structure is incorrect
    chai.expect(validation.isValid('TR830003290000000012345678')).to.equal(false)
  });

  // https://www.isbank.com.tr/EN/IBAN-calculator/Pages/iban-calculator.aspx
  // TR58 0006 4000 0021 0011 2345 67
  // TR53 0006 4000 0019 9991 2345 67

  // from https://github.com/sinkien/IBAN4Net/issues/10
  it('issue 10', function() {
    chai.expect(validation.isValid('BH14SCBLBHD18905826101')).to.equal(true)
    chai.expect(validation.isValid('BG80BNBG96611020345678')).to.equal(true)
    chai.expect(validation.isValid('KZ86125KZT5004100100')).to.equal(true)
  });

  // Vatican, real IBAN http://www.vatican.va/roman_curia/pontifical_councils/corunum/corunum_en/profilo_en/aiuto_en.html
  it('Vatican (IT) real IBAN', function() {
    chai.expect(validation.isValid('IT 20 S 07601 03200 000000 603035')).to.equal(true)

    // UNICREDIT - Pontifical Council "Cor Unum"
    chai.expect(validation.isValid('IT 46 H 02008 05008 00010 19157 64')).to.equal(true)
  })

  // On 1 March 2019 Andorra and Vatican City join SEPA.
  // Un code IBAN spécifique au Saint-Siège et à l'État du Vatican sera utilisé
  it('Vatican (VA) exemple IBAN (from swift iban registry 2018 12 20)', function() {
    // IBAN format effective date: Nov-19 -> false
    chai.expect(validation.isValid('VA59 001 1230 0001 2345 678')).to.equal(false)
  })

  // https://www.noorbank.com/info/iban/generator
  it('generated noorbank.com', function() {
    chai.expect(validation.isValid('AE730520012345678901234')).to.equal(true)
  });

  // Old data: https://www.ibanvalidator.com/en/support/bank/221/pancretan-cooperative-bank.html
  // https://e.pancretabank.gr/iban/index_eng.php

  // https://www.slsp.sk/en/calculators/iban-kalkulacka-validator
  // -> missing check Account Number checksum on website

  // (liste de) Code banque:
  // https://www.nbs.sk/sk/platobne-systemy/iban/vypocet-iban-pre-sr

  // http://www.iban.pk/
  // Bank Al Habib: BBBBTTTTBBBBBBRRC
  // C is the Check Digit (1 digit)

  //TODO: generated a wrong account number
  it('PK real IBAN', function() {
    // this account is on bank: HABIB METROPOLITAN BANK LIMITED
    chai.expect(validation.isValid('PK67MPBL1209027140138927')).to.equal(true)
    // found on Twitter (account number: 6-1-1-20311-714-559861)
    chai.expect(validation.isValid('PK11 MPBL 0101 0271 4055 9861')).to.equal(true)
  });
  it('FR real IBAN', function() {
    // BIC : CRLYFRPP
    chai.expect(validation.isValid('FR37 3000 2073 0000 0071 0321 V45')).to.equal(true)
  });

  // https://www.ibancalculator.com/bic_und_iban.html
  it('FR full wrong IBAN', function() {
    chai.expect(validation.isValid('FR7000001000010000000000101')).to.equal(false)
  });

  //TODO complexe : Mauvais compte. Les 2 premiers chiffres doivent être l’un des groupes 20, 22, 23 ou 24.
  // https://www.victoriabank.md/IBANGen/

  // https://www.faysalbank.com/en/iban-calculator/
  it('PK generated faysalbank.com', function() {
    chai.expect(validation.isValid('PK80FAYS0001101010012345')).to.equal(true)
    chai.expect(validation.isValid('PK34FAYS0330000123456789')).to.equal(true)
  });

  it('PK generated riyadbank.com', function() {
    // Riyad Bank
    chai.expect(validation.isValid('SA7620000000000123456789')).to.equal(true) // not sure
    // Saudi Banks: Samba
    chai.expect(validation.isValid('SA3140000000000123456789')).to.equal(true) // not sure
    // Byblos Bank
    chai.expect(validation.isValid('LB95003900000000000000000001')).to.equal(true) // not sure
  });

  it('IBAN (from Guatemala) with valid currency (28) and valid Account Type (07)', function() {
    // ABC is not a valid currency
    chai.expect(validation.isValid('GT68BARC28071234567890123456')).to.equal(true)
  });

  //TODO: check branch of Bank of Ireland
  // https://www.bankofireland.com/help-centre/iban-calculator/
  // Branch : Tyrone - Strabane 905010

  // Tchad https://fr.iban.com/structure
  //it('TD - Chad', function() {
    // "CM + 23 caractères" d'après https://virements-internationaux.bnpparibas.fr/rsc/websites/virements-internationaux/documents/pdf/fiche-info-2-liste-pays-structure-compte.pdf
    // fail : [ 'IBAN', 'banking-toolkit' ]
    //chai.expect(validation.isValid('TD8960002000010271091600153')).to.equal(true)
  //});

  // from https://www.sc.com/qa/iban/faq/en/
  // https://en.wikipedia.org/wiki/Standard_Chartered
  it('Standard Chartered Bank QATAR', function() {
    // 29 caractères
    // Invalid IBAN check digit!
    chai.expect(validation.isValid('QA00 SCBL 0000 0000 010122233340 1')).to.equal(false)

    //TODO: check currency
  });

  // http://www.qiib.com.qa/Tools/IBAN
  it('generated IBAN QA from qiib.com.qa', function() {
    // account number: 1234567890123
    chai.expect(validation.isValid('QA37QIIB000000001234567890123')).to.equal(true)

    //TODO: check currency
  });

  // https://www.eurobank.com.cy/en/tools/ibanGenerator
  it('generated IBAN QA from eurobank.com.cy', function() {
    // banking Centre : 009
    // account number: 524952495249
    chai.expect(validation.isValid('CY36018000090000524952495249')).to.equal(true)

    //TODO: check banking center
  });

  // https://www.ubldirect.com/corporate/portals/_default/skins/darkknight/_ui/pdf/ibancommunication.pdf
  //it('United Bank Limited', function() {
  //  chai.expect(validation.isValid('PK16UNIL0112094910113152')).to.equal(true) // manque un char ?
  //});

  it('United Bank Limited: Valid IBAN but Account Length store in IBAN is wrong', function() {
    chai.expect(validation.isValid('PK03UNIL0000094910113152')).to.equal(false)
  });

  // https://www.ccb.coop/tools/iban/#!prettyPhoto
  it('generated from ccb.coop', function() {
    // Sociétés coopératives: 10110
    // Non (8 chiffres): 00011111
    chai.expect(validation.isValid('CY05007101100000000000011111')).to.equal(true)
    // invalid
    chai.expect(validation.isValid('CY05007101100000000100011111')).to.equal(false)
  });

  // https://www.ccb.coop/tools/iban/#!prettyPhoto
  /*
  it('Invalid account number from ccb.coop', function() {
    //TODO: check account number : query AJAX -> fetch
    // 10110 + 77777777 -> invalid number : account number 0000000077777777
    chai.expect(validation.isValid('CY47007101100000000077777777')).to.equal(false)
  });
  */

  // http://akbl.com.pk/services/iban-account/iban-generator/
  it('IBAN generated from account number 0010110203819', function() {
    chai.expect(validation.isValid('PK12ASCM0000010110203819')).to.equal(true)
  });

  // Many examples around world:
  // https://www.bindb.com/iban-generator.html
  it('SM', function() {
    chai.expect(validation.isValid('SM86 U032 2509 8000 0000 0270 100')).to.equal(true)
  });

  // https://www.mobilefish.com/services/random_iban_generator/random_iban_generator.php
  it('PS by a generic generator', function() {
    chai.expect(validation.isValid('PS22SMMV570372782137535200167')).to.equal(true)
  });
  // demo https://www.mobilefish.com/services/random_iban_generator/random_iban_generator.php
  it('NL invalid account numbers', function() {
    // Invalid account number: 0312285503
    // TODO add a warning: Account Number does not support check digit validation
    chai.expect(validation.isValid('NL14ABNA0312285503')).to.equal(true)
    // Invalid account number: 0000055555
    //chai.expect(validation.isValid('NL11ABNA0000055555')).to.equal(true)
  });

  // from official swift_iban_registry_201812.pdf
  it('IBAN SV official example', function() {
    // Not in https://en.wikipedia.org/wiki/International_Bank_Account_Number
    chai.expect(validation.isValid('SV 62 CENR 00000000000000700025')).to.equal(true)
  })

  //TODO: check BIC (4 chars) and check sort codes of Malta IBANs
  // file from https://www.centralbankmalta.org/iban

  //TODO : FR codes interbancaires (CIB) (old list) https://intendancezone.net/IMG/pdf/eccib.pdf


  // https://fr.wikipedia.org/wiki/International_Bank_Account_Number#Composition
  it('Wrong key', function() {
    // TODO: key not in (02 to 98)
    chai.expect(validation.isValid('FR0111008000010004126302470')).to.equal(false)
  });

  it('Real LBP La Banque Postale (French bank) IBAN', function() {
    // real, from http://www.yvesmichel.org/editions/wp-content/uploads/2016/04/RIB-GERM-BP.pdf
    chai.expect(validation.isValid('FR61 2004 1000 0126 6916 1T02 094')).to.equal(true)
    // real, from https://lavoieclaire.files.wordpress.com/2010/07/rib_lavoieclaire.pdf
    chai.expect(validation.isValid('FR86 2004 1010 0819 8107 0B02 937')).to.equal(true)
    // real, from http://proxy.siteo.com.s3.amazonaws.com/www.agapevillage.com/file/ccp-ribseuliban_1.pdf
    chai.expect(validation.isValid('FR71 2004 1010 0104 2823 1M02 235')).to.equal(true)

    // real, from https://books.google.fr/books?id=RmxUDwAAQBAJ&pg=PA94&lpg=PA94&dq=iban+m+la+banque+postale&source=bl&ots=jfT0_nupRH&sig=ACfU3U0LdjIrWxdJws1qDcN-_I5e-e0myA&hl=fr&sa=X&ved=2ahUKEwjKsOriqp7gAhVKQhoKHfKdAyc4RhDoATAAegQIChAB#v=onepage&q=iban%20m%20la%20banque%20postale&f=false
    chai.expect(validation.isValid('FR14 2004 1000 0150 2708 0Y02 035')).to.equal(true)

    // real, from https://www.aequitaz.org/wp-content/uploads/2018/01/RIB_Aequitaz.pdf
    chai.expect(validation.isValid('FR88 2004 1010 0715 9320 0M03 821')).to.equal(true)
    chai.expect(validation.isValid('FR52 2004 1010 0204 8335 3J02 370')).to.equal(true)
    chai.expect(validation.isValid('FR47 2004 1010 0118 0765 9R02 222')).to.equal(true)
    // real, from http://sambhava.net/wp-content/uploads/2016/03/ribFR.pdf
    chai.expect(validation.isValid('FR65 2004 1010 0720 2588 7Z03 890')).to.equal(true)
    chai.expect(validation.isValid('FR18-2004-1010-1106-2358-8X03-297')).to.equal(true)
    // 7072150112 M

    //TODO : use SWIFT data
    // from https://github.com/search?q=%22centre+financier%22+LIMOGES&type=Code
  });

  it('La Banque Postale old', function() {
    // real old IBAN, from https://www.persee.fr/doc/ahrf_0003-4436_2007_num_350_1_3166
    chai.expect(validation.isValid('FR4730041000010156527U020')).to.equal(false)

    // old IBAN CCP: FR 33 30041 00001 1336992H020 97
    chai.expect(validation.isValid('FR 3330041000011336992H02097')).to.equal(false)
  })

  // Limoges (code guichet : 01006 ; le numéro de compte se termine par 27)
  it('La Banque Postale wrong letter', function() {
    // generated, Checksum OK, Check Digits OK, but wrong letter
    chai.expect(validation.isValid('FR8720041010060733572F02773')).to.equal(false)
  });

  // Real, Banque Populaire de L’Ouest
  //chai.expect(validation.isValid('FR76 16707001 1341 0218 1647 497')).to.equal(true)

  // from https://www.mcb.com.pk/quick_links/international-bank-account-number-iban
  it('Real PK IBAN', function() {
    // Example of Existing Bank Account Number: 0646609971000177
    chai.expect(validation.isValid('PK24 MUCB 0646 6099 7100 0177')).to.equal(true)
  });

  it('Real EE IBAN', function() {
    // compte courant 0733572M027
    // FR422004101006 0733572M027 59
    chai.expect(validation.isValid('EE632200221033498837')).to.equal(true)
  });

  // https://www.cbiuae.com/en/personal/contact-and-support/iban-and-swift-code
  it('generated AE IBAN CBI with a default account number', function() {
    // 1234567890123456
    chai.expect(validation.isValid('AE880221234567890123456')).to.equal(true)
  })

  // http://www.ma-neobanque.com/iban-etranger-refuse-est-ce-vraiment-illegal/
  // "N26 dispose à présent du BIC Français qui est NTSBFRM associé au Code Banque 20433"
});

// Tester cohérence IBAN et BIC
// https://lavoieclaire.files.wordpress.com/2010/07/rib_lavoieclaire.pdf
// https://github.com/natxet/Bic-from-IBAN ?
