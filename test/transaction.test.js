import axios from 'axios'

jest.mock('axios')

async function fetchTransactionsTest() {
  // eslint-disable-next-line no-return-await
  return await axios.post('http://localhost:7070', {
    method: 'getTransactionPool',
    params: [],
    id: 1,
    key: 'nf5vlhha1njosy9qeb4goqyy9ctjbfqmo',
  })
}

test('Fetch transaction', async () => {
  const transaction = []
  const responseData = {
    jsonrpc: '',
    result: transaction,
    id: '',
  }
  axios.post.mockResolvedValue(responseData)
  // eslint-disable-next-line no-return-await
  return await fetchTransactionsTest().then(data => {
    expect(data).toEqual(responseData)
  })
})
