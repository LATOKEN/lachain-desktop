import api from './api-client'

/**
 * Get  transaction lit
 *
 * @returns {string[]} Accounts
 */

export async function fetchTransactionsDetails(address) {
  const {data} = await api().post('/', {
    method: 'getTransactionPoolByHash',
    params: [address],
    id: 1,
  })
  return Promise.resolve(data)
}

export async function fetchTransactions() {
  const {data} = await api().post('/', {
    method: 'getTransactionPool',
    params: [],
    id: 1,
  })
  return data
}
