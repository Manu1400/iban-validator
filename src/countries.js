const isoCountries = require('./isoCountries.json')

function getCountryName (countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return null;
    }
}

module.exports.getCountryName = getCountryName
module.exports.isValidISOCode = function (isoCode) {
  return !!getCountryName(isoCode);
}
