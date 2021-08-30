import axios from 'axios'

jest.mock('axios')

async function fetchValidators() {
  // eslint-disable-next-line no-return-await
  return await axios.post('http://localhost:7070', {
    method: 'bcn_validators',
    params: [],
    id: 1,
  })
}
test('Fetch Validators', async () => {
  const validator = []
  const responseData = {
    jsonrpc: '',
    result: validator,
    id: '',
  }

  axios.post.mockResolvedValue(responseData)
  // eslint-disable-next-line no-return-await
  return await fetchValidators().then(data => {
    expect(data).toEqual(responseData)
  })
})
