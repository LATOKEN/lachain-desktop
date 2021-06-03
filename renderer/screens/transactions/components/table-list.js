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
  const analytics = useAnalytics()

  function openModal(item) {
    analytics.track('buttonClicked', {
      label: 'transactionsView',
    })
    setTransactionDetails(item)
    setIsOpenModal(true)
  }

  function closeModal() {
    setIsOpenModal(false)
  }

  return (
    <div className="table-block">
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

      <style jsx>{`
        .table-tr {
          display: flex;
          margin: 0;
          padding: 0;
          width: 100%;
        }

        .P-edit-icon {
          width: 60px;
          border-radius: 4px;
          height: 25px;
          text-align: center;
          color: rgba(0, 0, 0, 0.8);
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          display: block;
          cursor: pointer;
          outline: none;
          background-color: #71ec71;
          border: none;
          display: flex;
          align-item: center;
          justify-content: center;
        }

        .table-tr li:nth-child(4) {
          min-width: 80px;
          max-width: 50px;
        }

        .table-header .table-tr li {
          font-weight: 600;
          padding: 5px 10px;
          background-color: rgba(0, 0, 0, 0.05);
        }
        .table-body .table-tr:nth-child(even) li {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .table-tr li {
          min-width: 200px;
          max-width: 100%;
          width: 100%;
          list-style: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 7px 10px;
        }
        .table-block {
          overflow: hidden;
          overflow-x: auto;
        }
      `}</style>
    </div>
  )
}

TransactionList.propTypes = {
  dataList: PropTypes.array,
}

export default TransactionList
