import axios from 'axios'
import api from './api-client'
import {useAnalytics} from '../hooks/use-analytics'

/**
 * Get  transaction lit
 *
 * @returns {string[]} Accounts
 */

const {setAnalytics} = useAnalytics()
export async function fetchTransactionsDetails(address) {
  const response = await api()
    .post('/', {
      method: 'getTransactionPoolByHash',
      params: [address],
      id: 1,
    })
    .catch(e => {
      setAnalytics('Error', 'Fetch Transactions Details', JSON.stringify(e))
    })
  if (response) {
    const {data} = response
    return Promise.resolve(data)
  }
}

export function fetchTransactionsTest() {
  return axios
    .post('http://localhost:7070', {
      method: 'getTransactionPool',
      params: [],
      id: 1,
    })
    .then(resp => resp)
}

export async function fetchTransactions() {
  const {data} = await api()
    .post('/', {
      method: 'getTransactionPool',
      params: [],
      id: 1,
    })
    .catch(e => {
      setAnalytics('Error', 'Fetch Transaction list', JSON.stringify(e))
    })
  return data
}
