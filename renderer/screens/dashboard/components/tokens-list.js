import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import PropTypes from 'prop-types'
import ModalComponent from '../../../shared/components/modal-component'
import SendMoneyModal from './send-money-modal'
import DeleteTokenModal from './delete-token-modal'

function TokensList({tokensList, deleteTokenList, updateTokens}) {
  const {t} = useTranslation()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [tokenData, setTokenData] = useState(null)
  const [tokenIndex, setTokenIndex] = useState(null)

  function openModal(e, item) {
    setTokenData(item)
    setIsOpenModal(true)
  }

  function closeModal() {
    setIsOpenModal(false)
  }

  function openModalDelete(e, index) {
    setIsOpenModalDelete(true)
    setTokenIndex(index)
  }

  function closeModalDelete() {
    setIsOpenModalDelete(false)
  }

  function deleteToken() {
    deleteTokenList(tokenIndex)
    closeModalDelete()
  }

  return (
    <div className="table-block P-token-table">
      <div className="table-header">
        <ul className="table-tr">
          <li title={t('Token')}>{t('Token')}</li>
          <li title={t('Address')}> {t('Address')}</li>
          <li title={t('Amount')}> {t('Amount')}</li>
          <li />
        </ul>
      </div>
      {tokensList && tokensList.length ? (
        <div className="table-body">
          {tokensList.map((item, index) => (
            <ul key={index} className="table-tr">
              <li>{item.accountToken || '—'}</li>
              <li>{item.accountAddress || '—'}</li>
              <li>{item.amount || item.amount === 0 ? item.amount : '—'}</li>
              <li>
                <div className="P-actions-list">
                  <button
                    type="button"
                    className="P-edit-icon"
                    onClick={e => openModal(e, item)}
                  >
                    {t('Send')}
                  </button>
                  <button
                    type="button"
                    className="icon icon--trash P-delete-icon"
                    onClick={e => openModalDelete(e, index)}
                  />
                </div>
              </li>
            </ul>
          ))}
        </div>
      ) : (
        <p className="P-empty-token-list">{t('Token list is empty')}</p>
      )}

      {isOpenModal && (
        <ModalComponent close={closeModal}>
          <SendMoneyModal
            updateToken={updateTokens}
            tokenData={tokenData}
            close={closeModal}
          />
        </ModalComponent>
      )}

      {isOpenModalDelete && (
        <ModalComponent close={closeModalDelete}>
          <DeleteTokenModal
            deleteToken={deleteToken}
            close={closeModalDelete}
          />
        </ModalComponent>
      )}
    </div>
  )
}

TokensList.propTypes = {
  tokensList: PropTypes.array,
  deleteTokenList: PropTypes.func,
  updateTokens: PropTypes.func,
}

export default TokensList
