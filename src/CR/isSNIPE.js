'use strict'

function CalcularDigitoVerificador(a) {
    const c = "91234567891234567"
    var e = 0
    for (var i = 0; i < a.length; i++) {
      e += parseInt(a.charAt(i)) * parseInt(c.charAt(i + 1))
    }
    var d = e % 11;
    if (d == 10) {
      d = 1
    }
    return d
}

function ValidarDigitos(a) {
    var c = new RegExp("([1-9]d*|0)")
    return a.toString().match(c)
}

function ValidarDigitoVerificador(a) {
    if (ValidarDigitos(a)) {
        var b = a.substring(a.length - 1, a.length);
        var c = CalcularDigitoVerificador(a.substring(0, a.length - 1));
        return parseInt(c) == parseInt(b)
    }
    return false
}

// CuentaClienteOkay
function isSNIPE(sinpe) {
    if (sinpe.toString().length == 17 && ValidarDigitoVerificador(sinpe.toString())) {
      return true
    }
    return false
}

module.exports.isSNIPE = isSNIPE
