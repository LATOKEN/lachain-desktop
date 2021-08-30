import React from 'react'

import theme from '../../shared/theme'
import {Box} from '../../shared/components'
import {useInterval} from '../../shared/hooks/use-interval'
import {usePeers} from '../../shared/hooks/use-peers'
import TableList from '../../screens/peers/table-list'
import SettingsLayout from './layout'

export default function Index() {
  const {peersList, getPeersData} = usePeers()
  useInterval(
    async () => {
      await getPeersData()
    },
    5000,
    true
  )

  return (
    <SettingsLayout>
      s{' '}
      <Box py={theme.spacings.xxxlarge}>
        <TableList dataList={peersList} />
      </Box>
    </SettingsLayout>
  )
}
