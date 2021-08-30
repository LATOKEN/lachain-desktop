import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

function DeleteTokenModal({close, deleteToken}) {
  const {t} = useTranslation()

  return (
    <div className="P-send-money-modal">
      <div className="P-send-money-block">
        <h3>{t('Are you sure you want to delete this Token')}</h3>
      </div>
      <div className="P-delete-content">
        <button type="button" className="P-cancel-btn" onClick={close}>
          {t('Cancel')}
        </button>
        <button type="button" className="P-delete-btn" onClick={deleteToken}>
          {t('Delete')}
        </button>
      </div>
    </div>
  )
}

DeleteTokenModal.propTypes = {
  close: PropTypes.func,
  deleteToken: PropTypes.func,
}

export default DeleteTokenModal
