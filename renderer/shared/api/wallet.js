/* eslint-disable import/prefer-default-export */
import api from './api-client'
import {strip} from '../utils/obj'
import {useAnalytics} from '../hooks/use-analytics'

/**
 * Fetch account list for a given node
 *
 * @returns {string[]} Accounts
 */
const {setAnalytics} = useAnalytics()
export async function fetchAccountList(address) {
  return [{address}, {address, isStake: true}]
  /*
  const {data} = await api().post('/', {
    method: `account_list`,
    params: [],
    id: 1,
  })
  const {result} = data
  return result
  */
}

/**
 * Fetch balance for an address
 *
 * @returns {number} Balance
 */
export async function fetchBalance(address) {
  const {data} = await api()
    .post('/', {
      method: `fe_getBalance`,
      params: [address],
      id: 1,
    })
    .catch(e => {
      setAnalytics('Error', 'Fetch balance for an address', JSON.stringify(e))
    })
  return data.result
}

export async function fetchTransactions(address, count) {
  const {data} = await api()
    .post('/', {
      method: 'fe_transactions',
      params: [
        strip({
          address,
          count,
        }),
      ],
      id: 1,
    })
    .catch(e => {
      setAnalytics('Error', 'Fetch Transaction Wallet', JSON.stringify(e))
    })
  return data
}

export async function fetchPendingTransactions(address, count) {
  const {data} = await api()
    .post('/', {
      method: 'fe_pendingTransactions',
      params: [
        strip({
          address,
          count,
        }),
      ],
      id: 1,
    })
    .catch(e => {
      setAnalytics(
        'Error',
        'Fetch Pending Transaction Wallet',
        JSON.stringify(e)
      )
    })
  return data
}

/**
 * isUnlock wallet
 * * */

export async function fetchUnlockWallet(password) {
  const {data} = await api()
    .post('/', {
      method: `unlock_wallet`,
      params: {password},
      id: 1,
    })
    .catch(e => {
      setAnalytics('Error', 'Unlock wallet', JSON.stringify(e))
    })
  return data.result
}

/**
 * Change password
 * * */

export async function changePassword(oldPassword, newPassword) {
  const {data} = await api()
    .post('/', {
      method: `fe_changePassword`,
      params: {currentPassword: oldPassword, newPassword},
      id: 1,
    })
    .catch(e => {
      setAnalytics('Error', 'Change password', JSON.stringify(e))
    })
  return data.result
}
