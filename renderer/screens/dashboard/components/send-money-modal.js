import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'
import {useIdentityState} from '../../../shared/providers/identity-context'
import {BASE_API_URL} from '../../../shared/api/api-client'

function SendMoneyModal({close, tokenData}) {
  const {t} = useTranslation()
  const [formData, setFormData] = useState({
    accountToken: '',
    accountAddress: '',
    amount: '',
  })
  const identity = useIdentityState()
  const {address} = identity

  useEffect(() => {
    setFormData({
      accountToken: tokenData.accountToken,
    })
  }, [])

  function inputChange(e) {
    const {name, value} = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  function submitData() {
    // eslint-disable-next-line global-require
    const Web3 = require('web3')
    const web3 = new Web3(Web3.givenProvider || BASE_API_URL)
    web3.eth.sendTransaction(
      {from: address, to: formData.accountAddress, value: formData.amount},
      function(error, hash) {}
    )
  }

  return (
    <div className="P-send-money-modal">
      <button type="button" className="G-close-modal" onClick={close} />
      <div className="P-send-money-block">
        <div className="P-send-money-title">
          <h3>{t('Send money')}</h3>
        </div>
        <div className="G-input-block">
          <p>{t('Token')}</p>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label>
            <input
              disabled
              type="text"
              name="accountToken"
              placeholder="Token"
              value={formData.accountToken}
              onChange={inputChange}
            />
          </label>
        </div>
        <div className="G-input-block">
          <p>{t('Destination')}</p>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label>
            <input
              type="text"
              name="accountAddress"
              placeholder="Destination"
              value={formData.accountAddress}
              onChange={inputChange}
            />
          </label>
        </div>
        <div className="G-input-block">
          <p>{t('Amount')}</p>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={inputChange}
            />
          </label>
        </div>
        <div className="P-send-money-button">
          <button onClick={() => submitData()} type="button">
            {t('Send')}
          </button>
        </div>
      </div>
    </div>
  )
}

SendMoneyModal.propTypes = {
  close: PropTypes.func,
  tokenData: PropTypes.object,
}

export default SendMoneyModal
