import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

function TransactionModal({close, transactionDetails}) {
  const {t} = useTranslation()

  useEffect(() => {}, [])
  return (
    <div className="P-transaction-information">
      <button type="button" className="G-close-modal" onClick={close} />
      <div className="P-transaction-block">
        <h3>{t('Transaction details')}</h3>
        <ul>
          <li>
            <p>{t('Transaction Hash')}:</p>
            <p>{transactionDetails.hash}</p>
          </li>
          <li>
            <p>{t('Status')}:</p>
            <p>Pending</p>
          </li>
          <li>
            <p>{t('Block')}:</p>
            <p>{transactionDetails.block}</p>
          </li>
          <li>
            <p>{t('From')}:</p>
            <p className="P-color-blue">
              {transactionDetails.transaction.from}
            </p>
          </li>
          <li>
            <p>{t('To')}:</p>
            <p className="P-color-blue">{transactionDetails.transaction.to}</p>
          </li>
          <li>
            <p>{t('Value')}:</p>
            <p>{Number(transactionDetails.transaction.value)}</p>
          </li>
          <li>
            <p>{t('Gas Price')}:</p>
            <p>{transactionDetails.transaction.gasPrice}</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

TransactionModal.propTypes = {
  close: PropTypes.func,
  transactionDetails: PropTypes.object,
}

export default TransactionModal
