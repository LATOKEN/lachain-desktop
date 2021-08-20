import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import TokensList from './tokens-list'
import HistoryList from './history-list'
import {getBalanceClientModel} from '../../../shared/api'
import ModalComponent from '../../../shared/components/modal-component'
import CreateTokenModal from './create-token-modal'

import {useIdentityState} from '../../../shared/providers/identity-context'
import {BASE_API_URL} from '../../../shared/api/api-client'

function MyTokensOptions() {
  const {t} = useTranslation()
  const [activeIndex, setActiveIndex] = useState(1)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [tokensList, setTokensList] = useState([])
  const identity = useIdentityState()
  const {address} = identity

  function changeActiveIndex(index) {
    setActiveIndex(index)
  }
  useEffect(() => {
    updateTokensList()
  }, [])

  function openModalAddToken() {
    setIsOpenModal(true)
  }

  function closeModalAddToken() {
    setIsOpenModal(false)
  }

  function setTokenData(data) {
    if (address) {
      createBalanceApi(data).then(dataResult => {
        if (dataResult && dataResult.result === '0x') {
          data.amount = 0
        } else {
          // eslint-disable-next-line no-restricted-properties,no-shadow
          const amount = parseInt(data.result, 16) / Math.pow(10, 18)
          data.amount = amount.toFixed(15)
        }
        const tokens = JSON.parse(localStorage.getItem('TokensList'))
        if (tokens) {
          tokens.unshift(data)
          localStorage.setItem('TokensList', JSON.stringify(tokens))
        } else {
          localStorage.setItem('TokensList', JSON.stringify([data]))
        }
        setTokensList(tokens)
      })
    }
  }

  function updateTokensList() {
    if (address) {
      const tokens = JSON.parse(localStorage.getItem('TokensList'))
      if (tokens && tokens.length) {
        tokens.forEach(item => {
          createBalanceApi(item).then(data => {
            if (data && data.result === '0x') {
              item.amount = 0
            } else {
              // eslint-disable-next-line no-restricted-properties,no-shadow
              const amount = parseInt(data.result, 16) / Math.pow(10, 18)
              item.amount = amount.toFixed(15)
            }
          })
        })
      }
      setTokensList(tokens)
    }
  }

  function createBalanceApi(item) {
    const hashCode = '0x70a08231000000000000000000000000'
    const body = {
      blockId: '',
      opts: {
        from: address, // current user Address
        to: item.accountAddress, // To  from att token modal
        data: hashCode + address.replace('0x', ''), // current account  address split without 0x
      },
    }
    return getBalanceClientModel(body)
  }

  function deleteTokenList(index) {
    if (index >= 0) {
      tokensList.splice(index, 1)
    }
    setTokensList(tokensList)
    localStorage.setItem('TokensList', JSON.stringify(tokensList))
    updateTokensList()
  }

  return (
    <div className="P-my-tokens-sections">
      <div className="P-my-tokens-header">
        <ul>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <li
            className={`${activeIndex === 1 ? 'P-active-tab' : ''}`}
            onClick={() => changeActiveIndex(1)}
          >
            {t('Tokens')}
          </li>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <li
            className={`${activeIndex === 2 ? 'P-active-tab' : ''}`}
            onClick={() => changeActiveIndex(2)}
          >
            {t('History')}
          </li>
        </ul>
        <button
          type="button"
          onClick={() => openModalAddToken()}
          className="P-add-token"
        >
          {t('Add token')}
        </button>
      </div>
      <div className="P-my-tokens-body">
        {activeIndex === 1 && (
          <TokensList
            tokensList={tokensList}
            updateTokens={updateTokensList}
            deleteTokenList={deleteTokenList}
          />
        )}
        {activeIndex === 2 && <HistoryList />}
      </div>
      {isOpenModal && (
        <ModalComponent close={closeModalAddToken}>
          <CreateTokenModal
            close={closeModalAddToken}
            updateTokens={setTokenData}
          />
        </ModalComponent>
      )}
    </div>
  )
}

export default MyTokensOptions
