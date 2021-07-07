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
  return data
}
