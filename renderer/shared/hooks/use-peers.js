import {useState} from 'react'
import {getPeers} from '../api/peers'

export function usePeers() {
  /**
   * set peers list array
   * * */
  const [peersList, setPeers] = useState()

  /**
   * loading page  for get  validation list
   * * */

  const [isLoading, setIsLoading] = useState(false)

  async function getPeersData() {
    setIsLoading(true)
    await getPeers().then(data => {
      if (data) {
        setPeers(data.result)
        setIsLoading(false)
        console.log(data.result)
      }
    })
  }

  return {
    peersList,
    isLoading,
    getPeersData,
  }
}
