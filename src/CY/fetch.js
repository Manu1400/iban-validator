const fetchAccountNumber = function (bankNumber, accountNumber) {
  //if (typeof fetch === "undefined")  {
    //const fetch = require('cross-fetch');
  //}

  // return a Promise
  /*
  return fetch('https://www.ccb.coop/Handlers/FindBBANIBAN.ashx', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      bbannumber: accountNumber,
      bank_selected: bankNumber,
    })
  }).then(res => res.text())
  */
  const url = `https://www.ccb.coop/Handlers/FindBBANIBAN.ashx?bbannumber=${accountNumber}&bank_selected=${bankNumber}`
  return fetch(url, {method: 'POST', mode: 'no-cors'})
    .then(res => res.text())
    .then(body => body);
}

module.exports.fetchAccountNumber = fetchAccountNumber
