import React from 'react'
import {useTranslation} from 'react-i18next'

export default function WarningModal() {
  const {t} = useTranslation()

  function closeProject() {
    global.ipcRenderer.send('close-app')
  }

  return (
    <div className="P-wallet-modal">
      <div className="P-wallet-modal-block">
        <div className="P-wallet-title P-warning-text">
          <h3>{t('Now we will close the app, please restart.')}</h3>
          <div className="P-wallet-brn">
            <button type="button" onClick={() => closeProject()}>
              {t('Confirm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
