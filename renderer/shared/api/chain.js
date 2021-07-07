/* eslint-disable import/prefer-default-export */
import api from './api-client'

import {useAnalytics} from '../hooks/use-analytics'

const {setAnalytics} = useAnalytics()

export async function fetchTx(hash) {
  const {data} = await api()
    .post('/', {
      method: 'bcn_transaction',
      params: [hash],
      id: 1,
    })
    .catch(e => {
      setAnalytics('Error', 'Chain fetch Tx', JSON.stringify(e))
    })
  return {hash, ...data}
}

/**
 * Sync status
 * @typedef {Object} SyncStatus
 * @property {boolean} syncing
 * @property {number} currentBlock
 * @property {number} highestBlock
 */

/**
 * Retrieve node sync status
 *
 * @returns {SyncStatus} Sync status
 */
export async function fetchSync() {
  const {data} = await api()
    .post('/', {
      method: 'bcn_syncing',
      params: [],
      id: 1,
    })
    .catch(e => {
      setAnalytics('Error', 'Chain Sync status', JSON.stringify(e))
    })
  const {result, error} = data
  if (error) throw new Error(error.message)
  return result
}
