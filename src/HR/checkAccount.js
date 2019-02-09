function checkAccount(accountNumber) {

  var mbr9, suma;

  if (accountNumber.substring(0,1) != '1' && accountNumber.substring(0,1) != '3') {
    return false
  }

  mbr9 = accountNumber.substring(0,9);
  suma = 10;

  for (var i = 0; i < mbr9.length; i++) {
    suma += parseInt(mbr9.substring(i,i+1))

    if (suma > 10)
       suma = suma - 10;

    suma *= 2;

     if (suma > 10)
       suma = suma - 11;
  }

  suma = 11-suma;

  if (suma > 10)
      suma = suma-10;

  if (suma == 10)
      suma = 0;

  if (accountNumber == mbr9+suma) {
    return true
  } else {
    console.log('invalid checksum in HR account number')
    return false
  }
}

module.exports.checkAccount = checkAccount
