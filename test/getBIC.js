'use strict'

const assert = require('assert');
const chai = require('chai')
const validation = require('../index')

// can use regex ? https://stackoverflow.com/questions/15920008/regex-for-bic-check

describe('#getBIC', function() {
  it('Invalid IBAN (Algeria)', function() {
    chai.expect(validation.getBIC('DZ4000400174401001050486')).to.equal(false)
  });

  // https://github.com/fourcube/goiban-service/issues/17
  it('rule exception for the Commerzbank', function() {
    chai.expect(validation.getBIC('DE12120400000052065002')).to.equal("COBADEFFXXX")

    // other example 30040005 (contient aussi 400) : COBADEDDXXX -> COBADEFFXXX
  });

  // https://www.bankleitzahlen.ws/20110700
  it('rule exception not supported', function() {
    // with BLZ 20110700 (old)
    chai.expect(validation.getBIC('DE71201107000532013000')).to.equal("BOTKDEH1XXX")
    // with BLZ 30010700 (other generated IBAN: DE66300107000532013000)
    //chai.expect(validation.getBIC('DE10300107000001234567')).to.equal("BOTKDEH1XXX")
  });

  it('Valid NL IBAN', function() {
    //Note: Numéro de compte (banque INGB) 0004585272: La somme de contrôle du compte n'a pas été recalculée.
    chai.expect(validation.getBIC('NL72INGB0004585272')).to.equal("INGBNL2A" + "XXX")
  });

  // Real BIC, from https://github.com/alexelshamouty/python-learning/blob/master/test.out
  it('Special case: Account 026.5x.xx.xxx', function() {
    // "DEUTNL2A est utilisé pour les comptes commençant par 026.5x.xx.xxx de DEUTSCHE BANK AG" (source: 29 november 2012)
    // can use https://github.com/nizarayari/qonto-iban-checker/blob/master/getBic.go
    var bic = "DEUTNL2A".concat("XXXXXXXXXXX").substring(0,11)
    chai.expect(validation.getBIC('NL08DEUT0265121809')).to.equal(bic)
  });

  /*
  Les plages de préfixes peuvent se chevaucher (si le pourcentage est inférieur à 100).
  Pour déterminer le code BIC le plus probable pour un compte néerlandais,
  renseignez d'abord le numéro de compte avec des zéros à 10 chiffres,
  puis coupez les 6 premiers chiffres.
  Si les deux premiers chiffres sont "00", il s'agit d'un compte de l'ancienne Postbank, devenue ING.
  Le code BIC est alors INGBNL2A.
  Si les deux premiers caractères ne sont pas "00",
  vous déterminerez tous les enregistrements pour lesquels les 6 premiers chiffres sont compris dans la plage de préfixes.
  Le code BIC (ou, si vous êtes malchanceux, plusieurs BIC pensables) peut ensuite être extrait de la colonne BIC de ces enregistrements,
  ainsi que les pourcentages pouvant être utilisés pour estimer la probabilité d'être vrai.
    -- http://www.iban-bic.com/data.html?L=3
  */

  // case from https://github.com/fourcube/goiban-service/issues/19

  // Real BIC, from https://github.com/alexelshamouty/python-learning/blob/master/test.out
  it('BIC DEUST double value', function() {
    var bic = validation.getBIC('NL48DEUT0319887774')
    chai.expect(bic == "DEUTNL2NXXX" || bic == 'DEUTNL2AXXX').to.equal(true)
  });

  it('BIC DEUST double value 2', function() {
    // real, from https://github.com/marcocom/Quince_Website/blob/f85ed3ec657339c31854633f8b1c24a063817c59/index.php
    // "Swift: DEUTNL2N"
    var bic = validation.getBIC('NL15DEUT0319822893')
    console.log(bic) // DEUTNL2AXXX
    chai.expect(bic == "DEUTNL2NXXX" || bic == 'DEUTNL2AXXX').to.equal(true)
  });

});
