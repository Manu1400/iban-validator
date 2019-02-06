'use strict'

const assert = require('assert')
const chai = require('chai')
const validation = require('../../index')

describe('#getSINPE', function() {
  this.slow(1000)

  // real IBAN from https://www.comglobalit.com/en/payments/
  it('Valid real IBAN', function() {
    // SINPE to IBAN:
    //    https://www.mucap.fi.cr/generarIBAN.html#/collapseOne
    // SINPE to IBAN and IBAN to SINPE:
    //    http://www.luncheva.com/IBANSINPE/Cuenta-SINPE-a-IBAN-Costa-Rica.aspx
    chai.expect(validation.getSINPE('CR98015201001027816206')).to.equal("15201001027816206")
  });

  // real IBAN from https://www.comglobalit.com/en/payments/
  it('Valid real IBAN from BAC (a bank)', function() {
    // account number (BAC): 930069448
    chai.expect(validation.getSINPE('CR65010200009300694487')).to.equal("10200009300694487")
    // check BAC account number (here ?)

    chai.expect(validation.getSINPE('CR65010200009300694487').length).to.equal(17)

    // source: http://sinpeamelo.com/como-hacer-una-transferencia-sinpe/
    // "Le compte client comprend 17 chiffres. 3 positions: code de l'entité, 14 positions: données du compte et 1 position: chiffre de contrôle."
    const nbDigit = 1
    //not possible to check if exist on https://www1.sucursalelectronica.com/ebac/module/userrecovery/showUserRecovery.go?selectedCountry=GT without email
    // other country : https://www.sucursalelectronica.com/ebac/module/userrecovery/showUserRecovery.go?selectedCountry=BS
    const bacLength = new String(parseInt(validation.getSINPE('CR65010200009300694487').substr(5), 10)).length
    //TODO: prefer <= 10 ?  -> ok('foo'.length == 3); ie ? 009911459 ?
    chai.expect(bacLength).to.equal(9 + nbDigit)
  });

  // Le compte SINPE 15201001027816205 n'est pas valide. -> check digit ?
  // http://www.bancobcr.com/archivos-de-usuario/bcr/bcr_conversor_sinpe-iban.html
  // http://www.luncheva.com/IBANSINPE/Cuenta-SINPE-a-IBAN-Costa-Rica.aspx

  it('Invalid IBAN', function() {
    //chai.expect(validation.getSINPE('iban_invalid')).to.equal("sinpe")
  });
});
