import {useEffect, useState} from 'react'
import {ValidatorsListModel} from '../../models/validators/ValidatorsListModel'
import {useAnalytics} from './use-analytics'

export function useValidators() {
  const [dataList, setDataList] = useState([])
  const [maxBlock, setMaxBlock] = useState(0)
  const [validatorsOnline, setValidatorsOnline] = useState(0)
  const [consensusParticipants, setConsensusParticipants] = useState(0)
  const [synced, setSynced] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstLod, setFirstLoad] = useState(false)
  const {setAnalytics} = useAnalytics()
  useEffect(() => {
    start()
  }, [dataList])

  function getConsensusPublicKeysValue(maxBlockNodeId) {
    const {getConsensusPublicKeys} = requester()
    const validatorItem = new ValidatorsListModel()
    let maxHeightValidators
    try {
      maxHeightValidators = getConsensusPublicKeys(
        validatorItem.nodeIps[maxBlockNodeId]
      )
    } catch (e) {
      setAnalytics(
        'Error',
        'Get consensus public keys value',
        JSON.stringify(e)
      )
      maxHeightValidators = []
    }

    return maxHeightValidators
  }

  function setNodeData(nodeList) {
    if (nodeList.length) {
      let maxBlocks = 0
      let maxBlockNodeId = null
      let newNodeList = []
      nodeList.forEach((nodeLists, index) => {
        const validatorItem = new ValidatorsListModel()
        validatorItem.ip = validatorItem.nodeIps[index]
        if (
          nodeLists[0] &&
          nodeLists[1] &&
          nodeLists[0].result &&
          nodeLists[1].result
        ) {
          validatorItem.connections = nodeLists[0]
            ? nodeLists[0].result.length
            : '-'
          validatorItem.status = nodeLists[1] ? nodeLists[1].result.state : '-'
          validatorItem.address = nodeLists[1]
            ? nodeLists[1].result.address
            : '-'
          validatorItem.publicKey = nodeLists[1]
            ? nodeLists[1].result.publicKey
            : '-'
          validatorItem.block = nodeLists[2] ? Number(nodeLists[2].result) : '-'
          if (validatorItem.block >= maxBlock) {
            maxBlocks = validatorItem.block
            maxBlockNodeId = index
          }
          if (nodeLists && nodeLists[3] && nodeLists[3].result) {
            validatorItem.txes = nodeLists[3].result.length
          }
          newNodeList.push(validatorItem)
        }
      })

      let maxHeightValidators = []
      maxHeightValidators = getConsensusPublicKeysValue(maxBlockNodeId)

      maxHeightValidators = Promise.resolve(maxHeightValidators)
        .then(response => {
          if (response) {
            return response.json()
          }
        })
        .then(response => {
          maxHeightValidators = response[0].result
          let validatorsOnlines = 0
          let synceds = 0

          newNodeList = newNodeList.map(x => {
            x.validatorAtMaxHeight = maxHeightValidators.includes(x.publicKey)
              ? true
              : '-'
            delete x.publicKey
            if (x.address && x.validatorAtMaxHeight === true)
              validatorsOnlines += 1
            if (maxBlock - x.block <= 100) synceds += 1
            return x
          })
          setDataList(newNodeList)
          setMaxBlock(maxBlocks)
          setConsensusParticipants(maxHeightValidators.length)
          setValidatorsOnline(validatorsOnlines)
          setSynced(synceds)
        })
      return Promise.resolve(newNodeList)
    }
  }

  function start() {
    if (!isFirstLod) {
      setIsLoading(true)
      setFirstLoad(true)
    }
    const nodeList = new ValidatorsListModel()
    const {getPeers} = requester()
    const promises = nodeList.nodeIps.map(x => getPeers(x))
    Promise.all(promises)
      .then(response => {
        const array = response.map(x => (x && x.json ? x.json() : {}))
        return array
      })
      .then(response => {
        Promise.all(response).then(data => {
          setNodeData(data).then(() => {
            setIsLoading(false)
          })
        })
      })
  }

  function requester() {
    let requestId = 0
    return {
      getPeers(nodeUrl) {
        const data = [
          {
            jsonrpc: '2.0',
            method: 'net_peers',
            params: [],
            id: (requestId += 1),
          },
          {
            jsonrpc: '2.0',
            method: 'fe_account',
            params: [],
            id: (requestId += 1),
          },
          {
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: (requestId += 1),
          },
          {
            jsonrpc: '2.0',
            method: 'getTransactionPool',
            params: [],
            id: (requestId += 1),
          },
        ]
        return r(nodeUrl, data).catch(() => undefined)
      },
      getConsensusPublicKeys(nodeUrl) {
        const request = [
          {
            jsonrpc: '2.0',
            method: 'bcn_validators',
            params: [],
            id: (requestId += 1),
          },
        ]

        return r(nodeUrl, request).catch(() => undefined)
      },
    }
  }

  function r(nodeUrl, data) {
    const url = `http://${nodeUrl}`
    return timedFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  function timedFetch(url, options) {
    return Promise.race([
      fetch(url, {...options}).catch(error => {
        setAnalytics('Error', 'Time fetch validators', JSON.stringify(error))
      }),
      // new Promise((_, reject) =>
      //   setTimeout(() => reject(new Error('timeout')), timeout)
      // ),
    ])
  }

  return {
    dataList,
    maxBlock,
    validatorsOnline,
    consensusParticipants,
    synced,
    isLoading,
  }
}
