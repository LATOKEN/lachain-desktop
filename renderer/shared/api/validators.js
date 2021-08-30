import api from './api-client'
import {useAnalytics} from '../hooks/use-analytics'

/**
 * Get  validators lit
 *
 * @returns {string[]} Accounts
 */

const {setAnalytics} = useAnalytics()

export async function getValidatorsList() {
  const response = await api()
    .post('/', {
      method: 'bcn_validators',
      params: [],
      id: 1,
    })
    .catch(e => {
      setAnalytics('Error', 'Get Validation List', JSON.stringify(e))
    })
  if (response) {
    const {data} = response
    return Promise.resolve(data)
  }
}

export async function getCycleStage() {
  const response = await api()
    .post('/', {
      method: 'bcn_cycle',
      params: [],
      id: 1,
    })
    .catch(e => {
      setAnalytics('Error', 'Get Cycle Stages', JSON.stringify(e))
    })
  if (response) {
    const {data} = response
    return Promise.resolve(data)
  }
}
