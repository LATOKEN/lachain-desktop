import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'
import ModalComponent from '../../../shared/components/modal-component'
import TransactionModal from './transaction-modal'
import {useAnalytics} from '../../../shared/hooks/use-analytics'

function TransactionList({dataList = []}) {
  const {t} = useTranslation()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [transactionDetail, setTransactionDetails] = useState(null)
  const {setAnalytics} = useAnalytics()

  function openModal(item) {
    setAnalytics(
      'Click',
      'openTransactionViewModal',
      'openTransactionViewModal'
    )
    setTransactionDetails(item)
    setIsOpenModal(true)
  }

  function closeModal() {
    setIsOpenModal(false)
  }

  return (
    <div className="table-block P-transaction-table">
      <div className="table-header">
        <ul className="table-tr">
          <li title={t('From')}>{t('From')}</li>
          <li title={t('To')}> {t('To')}</li>
          <li title={t('Value')}> {t('Value')}</li>
          <li />
        </ul>
      </div>
      <div className="table-body">
        {dataList.map((item, index) => (
          <ul key={index} className="table-tr">
            <li
              title={
                item.transaction.from ? item.transaction.from.toString() : 'x'
              }
            >
              {item.transaction.from || '—'}
            </li>
            <li
              title={item.transaction.to ? item.transaction.to.toString() : 'x'}
            >
              {item.transaction.to || '—'}
            </li>
            <li title={item.value ? Number(item.value) : '0'}>
              {item.value ? Number(item.value) : 0}
            </li>
            <li>
              <button
                type="button"
                className="P-edit-icon"
                onClick={() => openModal(item)}
              >
                {t('View')}
              </button>
            </li>
          </ul>
        ))}
      </div>

      {isOpenModal && (
        <ModalComponent close={closeModal}>
          <TransactionModal
            transactionDetails={transactionDetail}
            close={closeModal}
          />
        </ModalComponent>
      )}
    </div>
  )
}

TransactionList.propTypes = {
  dataList: PropTypes.array,
}

export default TransactionList
