import {useEffect, useState} from 'react'
import {ValidatorsListModel} from '../../models/validators/ValidatorsListModel'

export function useValidators() {
  useEffect(() => {
    start()

    return () => {
      abortFunctions()
    }
  }, [])

  const [dataList, setDataList] = useState([])
  const [maxBlock, setMaxBlock] = useState(0)
  const [validatorsOnline, setValidatorsOnline] = useState(0)
  const [consensusParticipants, setConsensusParticipants] = useState(0)
  const [synced, setSynced] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstLod, setFirstLoad] = useState(false)
  let controller = new AbortController()
  const {signal} = controller

  function abortFunctions(){
    controller.abort()
  }
  async function getConsensusPublicKeysValue(maxBlockNodeId) {
    const {getConsensusPublicKeys} = requester()
    const validatorItem = new ValidatorsListModel()

    let maxHeightValidators
    try {
      maxHeightValidators = (
        await (
          await getConsensusPublicKeys(validatorItem.nodeIps[maxBlockNodeId])
        ).json()
      )[0].result
    } catch (e) {
      maxHeightValidators = []
    }
    return maxHeightValidators
  }

  async function setNodeData(nodeList) {
    if (nodeList.length) {
      let maxBlock = 0
      let maxBlockNodeId = null
      let newNodeList = []

      nodeList.forEach((items, index) => {
        const validatorItem = new ValidatorsListModel()
        validatorItem.ip = validatorItem.nodeIps[index]

        // console.log(items)
        if (
          items &&
          items[0] &&
          items[0].result &&
          items[1] &&
          items[1].result
        ) {
          validatorItem.connections = items[0].result.length
          validatorItem.status = items[1].result.state
          validatorItem.address = items[1].result.address
          validatorItem.publicKey = items[1].result.publicKey
          validatorItem.block = Number(items[2].result)
          if (validatorItem.block > maxBlock) {
            maxBlock = validatorItem.block
            maxBlockNodeId = index
          }
        }
        if (items && items[3] && items[3].result) {
          validatorItem.txes = items[3].result.length
        }
        newNodeList.push(validatorItem)
      })

      let maxHeightValidators = []

      if (maxBlockNodeId) {
        maxHeightValidators = await getConsensusPublicKeysValue(maxBlockNodeId)
      }

      const consensusParticipants = maxHeightValidators.length
      let validatorsOnline = 0
      let synced = 0

      newNodeList = newNodeList.map(x => {
        x.validatorAtMaxHeight = maxHeightValidators.includes(x.publicKey)
          ? true
          : '-'
        delete x.publicKey
        if (x.address && x.validatorAtMaxHeight === true) validatorsOnline++
        if (maxBlock - x.block <= 100) synced++
        return x
      })

      setDataList(newNodeList)
      setMaxBlock(maxBlock)
      setConsensusParticipants(consensusParticipants)
      setValidatorsOnline(validatorsOnline)
      setSynced(synced)
      return Promise.resolve(newNodeList)
    }
  }

  async function start() {
    const nodeList = new ValidatorsListModel()
    const {getPeers} = requester()
    let promises = nodeList.nodeIps.map(x => getPeers(x))
    if (!isFirstLod) {
      setIsLoading(true)
      setFirstLoad(true)
    }
    promises = await Promise.all(promises.map(x => x.catch(e => e)))
    promises = promises.map(x => (x && x.json ? x.json() : {}))
    await Promise.all(promises).then(data => {
      setNodeData(data).then(newData => {
        start()
        setIsLoading(false)
      })
    })
  }

  function requester() {
    let requestId = 0
    return {
      async getPeers(nodeUrl) {
        const data = [
          {
            jsonrpc: '2.0',
            method: 'net_peers',
            params: [],
            id: requestId++,
          },
          {
            jsonrpc: '2.0',
            method: 'fe_account',
            params: [],
            id: requestId++,
          },
          {
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: requestId++,
          },
          {
            jsonrpc: '2.0',
            method: 'getTransactionPool',
            params: [],
            id: requestId++,
          },
        ]

        return r(nodeUrl, data).catch(e => undefined)
      },
      async getConsensusPublicKeys(nodeUrl) {
        const request = [
          {
            jsonrpc: '2.0',
            method: 'bcn_validators',
            params: [],
            id: requestId++,
          },
        ]

        return r(nodeUrl, request).catch(e => undefined)
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

  function timedFetch(url, options, timeout = 2000) {
    return Promise.race([
      fetch(url, {...options, signal},),
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
