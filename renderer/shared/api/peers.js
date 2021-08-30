import api from './api-client'
import {useAnalytics} from '../hooks/use-analytics'

/**
 * Get  validators lit
 *
 * @returns {string[]} Accounts
 */

const {setAnalytics} = useAnalytics()

export async function getPeers() {
  const response = await api()
    .post('/', {
      method: 'net_peers',
      params: [],
      id: 1,
    })
    .catch(e => {
      setAnalytics('Error', 'Get Peers', JSON.stringify(e))
    })
  if (response) {
    const {data} = response
    return Promise.resolve(data)
  }
}
