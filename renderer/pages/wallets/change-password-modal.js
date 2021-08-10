import React, {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import PropTypes from 'prop-types'
import {changePassword} from '../../shared/api/wallet'

export default function ChangePasswordModal({close}) {
  const {t} = useTranslation()
  const [errorData, setIsValidateNewPassword] = React.useState({
    isEmptyData: false,
    isOldPassword: false,
    isConfirm: false,
    isValidatePassword: false,
  })
  const [isFirstValidate, setIsFirstValidate] = React.useState(false)
  const [formData, setFormData] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  function inputChange(e) {
    const {name, value} = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function savePassword() {
    const oldPassword = localStorage.getItem('walletPassword')

    setIsValidateNewPassword(state => ({
      ...state,
      isEmptyData: !(
        formData.oldPassword &&
        formData.newPassword &&
        formData.confirmPassword
      ),
      isOldPassword:
        formData.oldPassword && oldPassword !== formData.oldPassword,
      isConfirm:
        formData.newPassword &&
        formData.confirmPassword &&
        formData.newPassword !== formData.confirmPassword,
      isValidatePassword:
        formData.newPassword && formData.newPassword.length < 8,
    }))
    setIsFirstValidate(true)
  }
  useEffect(() => {
    if (
      isFirstValidate &&
      !errorData.isEmptyData &&
      !errorData.isOldPassword &&
      !errorData.isConfirm &&
      !errorData.isValidatePassword
    ) {
      changePassword(formData.oldPassword, formData.newPassword).then(data => {
        if (data) {
          localStorage.setItem('walletPassword', formData.newPassword)
          close()
        }
      })
    }
  }, [errorData])

  return (
    <div className="P-wallet-modal">
      <div className="P-wallet-modal-block">
        <button type="button" className="G-close-modal" onClick={close} />

        <div className="P-wallet-title">
          <h3>{t('Change password')}</h3>
        </div>
        <div
          className={`G-input-block ${
            errorData.isEmptyData || errorData.isOldPassword ? 'G-error' : ''
          }`}
        >
          <p>{t('Old password')}</p>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Password"
              value={formData.oldPassword}
              onChange={inputChange}
            />
          </label>
        </div>
        <div
          className={`G-input-block  ${
            errorData.isEmptyData ||
            errorData.isValidatePassword ||
            errorData.isConfirm
              ? 'G-error'
              : ''
          }`}
        >
          <p>{t('New password')}</p>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={inputChange}
            />
          </label>
        </div>
        <div
          className={`G-input-block ${
            errorData.isEmptyData || errorData.isConfirm ? 'G-error' : ''
          }`}
        >
          <p>{t('Confirm password')}</p>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={inputChange}
            />
          </label>
        </div>
        {errorData.isOldPassword && (
          <p className="P-error-text">{t('Incorrect old password')}</p>
        )}
        {errorData.isConfirm && (
          <p className="P-error-text">
            {t('New password and confirm password does not match.')}
          </p>
        )}
        {errorData.isValidatePassword && (
          <p className="P-error-text">
            {t('You have to enter at least 8 digit.')}
          </p>
        )}
        <div className="P-wallet-brn">
          <button onClick={() => savePassword()} type="button">
            {t('Save')}
          </button>
        </div>
      </div>
    </div>
  )
}

ChangePasswordModal.propTypes = {
  close: PropTypes.func,
}
