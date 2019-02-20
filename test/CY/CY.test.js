'use strict'

const assert = require('assert');
const chai = require('chai')
const validation = require('../../index')

describe('without fetch', () => {
  // https://www.ccb.coop/tools/iban/#!prettyPhoto
  it('Invalid account number from ccb.coop not detect without fetch', function() {
    //TODO: check account number : query AJAX -> fetch
    // 10110 + 77777777 -> invalid number : account number 0000000077777777
    chai.expect(validation.isValid('CY47007101100000000077777777')).to.equal(true)
  });
})

describe('testing fetch ccb.coop', () => {
  const URL_ccb_coop = 'https://www.ccb.coop/Handlers/FindBBANIBAN.ashx'

  beforeEach(() => {
    fetch.resetMocks()
  })

  it('check valid (bankNumber, accountNumber) on ccb.coop', () => {
    const IBAN = 'CY05007101100000000000011111'
    fetch.mockResponseOnce(IBAN)

    const bankNumber = '10110'
    const accountNumber = '00011111'
    validation.fetchAccountNumber(bankNumber, accountNumber).then(data => {
      expect(data).toEqual(IBAN)
    })

    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(URL_ccb_coop + '?bbannumber=00011111&bank_selected=10110')
  })

  it('check invalid (bankNumber, accountNumber) on ccb.coop', () => {
    fetch.mockResponseOnce('error')

    const bankNumber = '10110'
    const accountNumber = '77777777'
    validation.fetchAccountNumber(bankNumber, accountNumber).then(res => {
      expect(res.data).toEqual('error')
    })

    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(URL_ccb_coop + '?bbannumber=77777777&bank_selected=10110')
  })

  // after
})
