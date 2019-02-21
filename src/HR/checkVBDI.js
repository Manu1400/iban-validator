//TODO : Update -> https://elementa.otpbanka.hr/gradjani/demo/lista_vbdi.html (54 VBDI)

// 33 VDBI (old) with BIC : http://old.hnb.hr/platni-promet/vodeci-brojevi-depozitnih-institucija.htm

// strange : https://bank.codes/iban/structure/hungary/
function checkVBDIInIban(iban) {
  // from IBAN calculator http://www.kaba.hr/en/iban-calculator/
  const VBDIs = require('./VBDI.json')

  const VBDI = iban.substr(4, 7) // 117 73016
  return VBDIs.includes(VBDI)
}

module.exports.checkVBDIInIban = checkVBDIInIban
