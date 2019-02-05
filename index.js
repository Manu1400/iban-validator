'use strict'

const {isValid} = require('./src/index')
const {getBIC} = require('./src/getBIC')
const {getSINPE} = require('./src/CR/getSINPE')
const {isSINPE} = require('./src/CR/isSINPE')

module.exports.isValid = isValid
module.exports.getBIC = getBIC
module.exports.getSINPE = getSINPE
module.exports.isSINPE = isSINPE
