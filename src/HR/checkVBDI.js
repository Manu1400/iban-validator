// from IBAN calculator http://www.kaba.hr/en/iban-calculator/
function getVBDIs() {
  return ['2489004', '2340009', '4133006', '2485003', '2402006', '2493003', '1001005', '2390001',
          '2492008', '2380006', '2411006', '2400008', '2481000', '2407000', '2408002', '2386002',
          '4132003', '2484008', '2403009', '2412009',  '2360000', '2381009', '6717002', '2330003',
          '2503007', '4124003', '2500009', '2488001']
}

//TODO : Update -> https://elementa.otpbanka.hr/gradjani/demo/lista_vbdi.html (54 VBDI)

// 33 VDBI (old) with BIC : http://old.hnb.hr/platni-promet/vodeci-brojevi-depozitnih-institucija.htm

// strange : https://bank.codes/iban/structure/hungary/
function checkVBDIInIban(iban) {
  const VBDI = iban.substr(4, 7) // 117 73016
  const arr = getVBDIs()
  return arr.includes(VBDI)
}

module.exports.checkVBDIInIban = checkVBDIInIban
