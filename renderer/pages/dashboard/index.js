import React from 'react'
import {rem} from 'polished'
import {useTranslation} from 'react-i18next'
import Layout from '../../shared/components/layout'
import {Drawer, Box, PageTitle} from '../../shared/components'
import theme from '../../shared/theme'
import MinerStatusSwitcher from '../../screens/dashboard/components/miner-status-switcher'
import UserInfo from '../../screens/dashboard/components/user-info'
import {NetProfile} from '../../screens/dashboard/components/net-profile'
import {useChainState} from '../../shared/providers/chain-context'
import KillForm from '../../screens/wallets/components/kill-form'

function Dashboard() {
  const {syncing, offline, loading} = useChainState()

  const [isWithdrawStakeFormOpen, setIsWithdrawStakeFormOpen] = React.useState(
    false
  )
  const handleCloseWithdrawStakeForm = () => setIsWithdrawStakeFormOpen(false)

  const {t} = useTranslation()

  return (
    <Layout syncing={syncing} offline={offline} loading={loading}>
      <Box
        px={theme.spacings.xxxlarge}
        py={theme.spacings.large}
        w={rem(700, theme.fontSizes.base)}
      >
        <PageTitle>{t('Profile')}</PageTitle>
        <UserInfo />
        <MinerStatusSwitcher />
        <NetProfile />
      </Box>

      <Drawer
        show={isWithdrawStakeFormOpen}
        onHide={handleCloseWithdrawStakeForm}
      >
        <KillForm
          onSuccess={handleCloseWithdrawStakeForm}
          onFail={handleCloseWithdrawStakeForm}
        />
      </Drawer>
    </Layout>
  )
}

export default Dashboard
