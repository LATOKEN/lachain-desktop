import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'

import PropTypes from 'prop-types'
import theme from '../../shared/theme'
import Layout from '../../shared/components/layout'
import TableList from '../../screens/validators/components/table-list'
import {Box, PageTitle} from '../../shared/components'
import ListInformation from '../../screens/validators/components/list-information'
import Loading from '../../shared/components/loading'

export default function Index() {
  const {t} = useTranslation()
  const nodeIps = [
    '116.203.75.72:7070',
    '178.128.113.97:7070',
    '165.227.45.119:7070',
    '206.189.137.112:7070',
    '157.245.160.201:7070',
    '95.217.6.171:7070',
    '88.99.190.191:7070',
    '94.130.78.183:7070',
    '94.130.24.163:7070',
    '94.130.110.127:7070',
    '94.130.110.95:7070',
    '94.130.58.63:7070',
    '88.99.86.166:7070',
    '88.198.78.106:7070',
    '88.198.78.141:7070',
    '88.99.126.144:7070',
    '88.99.87.58:7070',
    '95.217.6.234:7070',
    '95.217.12.226:7070',
    '95.217.14.117:7070',
    '95.217.17.248:7070',
    '95.217.12.230:7070',
  ]

  // ;(async () => {
  //   start()
  // })()
  useEffect(() => {
    start()
  }, [start])
  const [dataList, setDataList] = useState([])
  const [maxBlock, setMaxBlock] = useState(0)
  const [validatorsOnline, setValidatorsOnline] = useState(0)
  const [consensusParticipants, setConsensusParticipants] = useState(0)
  const [synced, setSynced] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstLod, setFirstLoad] = useState(false)

  const columns = {
    connections: 'connections',
    status: 'status',
    block: 'block',
    address: 'address',
    txes: 'pool',
  }

  async function start(removeLinesCount) {
    let nodes = []
    try {
      const {getPeers, getConsensusPublicKeys} = requester()
      let promises = nodeIps.map(x => getPeers(x))
      if (!isFirstLod) {
        setIsLoading(true)
        setFirstLoad(true)
      }
      promises = await Promise.all(promises.map(x => x.catch(e => e)))
      promises = promises.map(x => (x && x.json ? x.json() : {}))
      const results = await Promise.all(promises)

      let maxBlock = 0
      let maxBlockNodeId

      results.forEach((res, i) => {
        const node = {
          ip: nodeIps[i],
          connections:
            res && res[0] && res[1].result ? res[0].result.length : 'X',
          status: res && res[1] && res[1].result ? res[1].result.state : 'X',
          // pubKeys: res.result.map(x => x.publicKey),
        }
        if (res && res[0] && res[0].result && res[1] && res[1].result) {
          node[columns.connections] = res[0].result.length
          node[columns.status] = res[1].result.state
          node[columns.address] = res[1].result.address
          node.publicKey = res[1].result.publicKey
          node[columns.block] = Number(res[2].result)
          if (node[columns.block] > maxBlock) {
            maxBlock = node[columns.block]
            maxBlockNodeId = i
          }
          if (res && res[3] && res[3].result) {
            node[columns.txes] = res[3].result.length
          }
          setIsLoading(false)
        } else {
          Object.values(columns).forEach(x => {
            node[x] = 'X'
          })
        }
        nodes.push(node)
        setIsLoading(false)
      })

      let maxHeightValidators
      try {
        maxHeightValidators = (
          await (await getConsensusPublicKeys(nodeIps[maxBlockNodeId])).json()
        )[0].result
      } catch (e) {
        maxHeightValidators = []
      }
      const consensusParticipants = maxHeightValidators.length
      let validatorsOnline = 0
      let synced = 0

      nodes = nodes.map(x => {
        x.validatorAtMaxHeight = maxHeightValidators.includes(x.publicKey)
          ? true
          : '-'
        delete x.publicKey
        if (x.address && x.validatorAtMaxHeight === true) validatorsOnline++
        if (maxBlock - x.block <= 100) synced++
        return x
      })

      if (JSON.stringify(dataList) !== JSON.stringify(nodes)) {
        setDataList(nodes)
        setMaxBlock(maxBlock)
        setConsensusParticipants(consensusParticipants)
        setValidatorsOnline(validatorsOnline)
        setSynced(synced)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setTimeout(() => {
        start(nodes.length + 4)
      }, 2000)
    }
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
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), timeout)
      ),
    ])
  }

  return (
    <Layout>
      <Box px={theme.spacings.xxxlarge} py={theme.spacings.large}>
        <PageTitle>{t('Validators')}</PageTitle>
        {isLoading && (
          <div>
            <Loading color={theme.colors.text} />
          </div>
        )}
        {!isLoading ? <TableList dataList={dataList} /> : null}
        {!isLoading && (
          <ListInformation
            consensusParticipants={consensusParticipants}
            maxBlock={maxBlock}
            nodes={dataList.length}
            synced={synced}
            validatorsOnline={validatorsOnline}
          />
        )}
      </Box>
    </Layout>
  )
}
