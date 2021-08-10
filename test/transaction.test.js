import axios from 'axios'

import {fetchTransactionsTest} from '../renderer/shared/api'

jest.mock('axios')

test('Fetch transaction', async () => {
  const transaction = []
  const responseData = {
    jsonrpc: '',
    result: transaction,
    id: '',
  }
  axios.post.mockResolvedValue(responseData)
  return fetchTransactionsTest().then(data => {
    expect(data).toEqual(responseData)
  })
})
