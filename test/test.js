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

  // example from https://www.hsbc.fr/1/2/hsbc-france/particuliers/banque-au-quotidien/pays-iban
  it('Maurice (Île)	- 29 chars', function() {
    chai.expect(validation.isValid('MU22BOMM020220204040020000MUR')).to.equal(true)
  });
  // example from https://www.xe.com/ibancalculator/sample/?ibancountry=mauritius
  it('Maurice (Île)	- 30 chars', function() {
    chai.expect(validation.isValid('MU17 BOMM 0101 1010 3030 0200 000M UR')).to.equal(true)
  });
  it('Timor-Leste IBAN Format', function() {
    chai.expect(validation.isValid('TL38 0080 0123 4567 8910 157')).to.equal(true)
  });

  // Longest IBAN: 26 Characters (4 + 22 BBAN):
  it('Futur: India (IN) Longest IBAN', function() {
    // found on https://www.iban.in/structure.html
    chai.expect(validation.isValid('IN68 0027 4324 5672 4672 1968 72')).to.equal(false) // false because it's futur
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
    chai.expect(validation.isValid('ES06 0030 1235 0903 0005 0273')).to.equal(false)
  });

  it('GB', function() {
    chai.expect(validation.isValid('GB29NWBK60161331926819')).to.equal(true)
  });

  // TODO : IT
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

  it('IBAN generated seb.se but with a unknown blz', function() {
    chai.expect(validation.isValid('DE78352101121004925411')).to.equal(false)
  });

  it('DE valid IBAN with a valid blz', function() {
    // Details for 10050000 - 24290661
    chai.expect(validation.isValid('DE02100500000024290661')).to.equal(true)
  });

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

  // (liste de) Code banque:
  // https://www.nbs.sk/sk/platobne-systemy/iban/vypocet-iban-pre-sr

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
    //chai.expect(validation.isValid('TD8960002000010271091600153')).to.equal(true)
  //});

  // from https://www.sc.com/qa/iban/faq/en/
  // https://en.wikipedia.org/wiki/Standard_Chartered
  it('Standard Chartered Bank QATAR', function() {
    // 29 caractères
    // Invalid IBAN check digit!
    chai.expect(validation.isValid('QA00 SCBL 0000 0000 010122233340 1')).to.equal(false)
  });

  // https://www.ubldirect.com/corporate/portals/_default/skins/darkknight/_ui/pdf/ibancommunication.pdf
  //it('United Bank Limited', function() {
  //  chai.expect(validation.isValid('PK16UNIL0112094910113152')).to.equal(true) // manque un char ?
  //});

  it('United Bank Limited: Valid IBAN but Account Length store in IBAN is wrong', function() {
    chai.expect(validation.isValid('PK03UNIL0000094910113152')).to.equal(false)
  });

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


  // https://fr.wikipedia.org/wiki/International_Bank_Account_Number#Composition
  it('Wrong key', function() {
    // TODO: key not in (02 to 98)
    chai.expect(validation.isValid('FR0111008000010004126302470')).to.equal(false)
  });

  // IBAN from https://github.com/fohlin/unified-bank-utils
  it('SE normal IBAN', function() {
    // 9252 - 0782455
    chai.expect(validation.isValid('SE4792500000092520782455')).to.equal(true)
  });
  it('SE Swedbank (special)', function() {
    chai.expect(validation.isValid('SE5780000829902814958514')).to.equal(true)
  });
  it('SE Account Number checksum is invalid', function() {
    // from https://github.com/fohlin/unified-bank-utils/blob/master/tests/test-swedish.js
    // 8000 - 332452515
    chai.expect(validation.isValid('SE7880000080000332452515')).to.equal(false)
  });
  // can test other values from http://www-2.danskebank.com/link/Bankernaskontonummer

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

  it('Real EE IBAN', function() {
    // compte courant 0733572M027
    // FR422004101006 0733572M027 59
    chai.expect(validation.isValid('EE632200221033498837')).to.equal(true)
  });

  // http://www.ma-neobanque.com/iban-etranger-refuse-est-ce-vraiment-illegal/
  // "N26 dispose à présent du BIC Français qui est NTSBFRM associé au Code Banque 20433"

  //TODO: Validates Norwegian bank account numbers
  // https://github.com/zrrrzzt/is-valid-account-number

  //TODO: New Zealand bank account number validation (++)
  // https://github.com/jayniehaka/nz-account-number-validation
});

// Tester cohérence IBAN et BIC
// https://lavoieclaire.files.wordpress.com/2010/07/rib_lavoieclaire.pdf
// https://github.com/natxet/Bic-from-IBAN ?
