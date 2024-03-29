import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

function CreateTokenModal({close, updateTokens}) {
  const {t} = useTranslation()
  const [formData, setFormData] = useState({
    accountToken: '',
    accountAddress: '',
    amount: '',
  })
  const [iValidate, setIsValidate] = useState(false)

  function inputChange(e) {
    const {name, value} = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  function submitData() {
    if (
      formData.accountToken.trim().length &&
      formData.accountAddress.trim().length
    ) {
      setIsValidate(false)
      updateTokens(formData)
      close()
    } else {
      setIsValidate(true)
    }
  }

  return (
    <div className="P-send-money-modal">
      <button type="button" className="G-close-modal" onClick={close} />
      <div className="P-send-money-block">
        <div className="P-send-money-title">
          <h3>{t('Add Token')}</h3>
        </div>
        <div className="G-input-block">
          <p>{t('Token')}</p>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label>
            <input
              type="text"
              className={`${iValidate ? 'P-error-input' : ''} `}
              name="accountToken"
              placeholder={t('Token')}
              value={formData.accountToken}
              onChange={inputChange}
            />
          </label>
        </div>
        <div className="G-input-block">
          <p>{t('Address text')}</p>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label>
            <input
              type="text"
              className={`${iValidate ? 'P-error-input' : ''} `}
              name="accountAddress"
              placeholder={t('Address text')}
              value={formData.accountAddress}
              onChange={inputChange}
            />
          </label>
        </div>
        <div className="P-send-money-button">
          <button onClick={() => submitData()} type="button">
            {t('Add token')}
          </button>
        </div>
      </div>
    </div>
  )
}

CreateTokenModal.propTypes = {
  close: PropTypes.func,
  updateTokens: PropTypes.func,
}

export default CreateTokenModal
