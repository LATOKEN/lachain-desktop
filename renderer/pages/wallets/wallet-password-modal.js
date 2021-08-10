import React from 'react'
import {useTranslation} from 'react-i18next'
import PropTypes from 'prop-types'

export default function WalletPasswordModal() {
  const {t} = useTranslation()
  const [password, setPassword] = React.useState('')
  const [isValidate, setIsValidate] = React.useState(false)

  function savePassword() {
    if (password.length >= 7) {
      setIsValidate(false)
      localStorage.setItem('walletPassword', password)
      global.ipcRenderer.send('reload')
    } else {
      setIsValidate(true)
    }
  }

  function changeInput(e) {
    setPassword(e.target.value)
    console.log(password.length)
    if (password.length >= 7) {
      setIsValidate(false)
    } else {
      setIsValidate(true)
    }
  }

  return (
    <div className="P-wallet-modal">
      <div className="P-wallet-modal-block">
        <div className="P-wallet-title">
          <h3>{t('Enter and save the password for the wallet.')}</h3>
        </div>
        <div className={`G-input-block ${isValidate ? 'G-error' : ''}`}>
          <p>{t('Password')}</p>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label>
            <input
              type="password"
              name="accountAddress"
              placeholder="Password"
              value={password}
              onChange={changeInput}
            />
            <p className="P-small-text">
              {t('You have to enter at least 8 digits')}
            </p>
          </label>
        </div>
        <div className="P-wallet-brn">
          <button onClick={() => savePassword()} type="button">
            {t('Confirm')}
          </button>
        </div>
      </div>
    </div>
  )
}
