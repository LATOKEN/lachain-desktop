import api from './api-client'
import {useAnalytics} from '../hooks/use-analytics'

const {setAnalytics} = useAnalytics()
export async function getBalanceClientModel(body) {
  const {data} = await api()
    .post('/', {
      method: 'eth_call',
      params: body,
      id: 1,
    })
    .catch(e => {
      setAnalytics('Error', 'Get balance client model', JSON.stringify(e))
    })
    console.log(111111111111,parseInt("0xf8337be6af0629a1090100000000000000000000000000000000000000000000", 16)/Math.pow(10,18))

  return data
}
