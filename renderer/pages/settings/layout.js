import React from 'react'
import PropTypes from 'prop-types'
import {useRouter} from 'next/router'
import {useTranslation} from 'react-i18next'
import Layout from '../../shared/components/layout'
import {Box, PageTitle} from '../../shared/components'
import theme from '../../shared/theme'
import Flex from '../../shared/components/flex'
import Toolbar, {ToolbarItem} from '../../screens/toolbar'

function SettingsLayout({children}) {
  const router = useRouter()
  const {t} = useTranslation()

  return (
    <Layout>
      <Box px={theme.spacings.xxxlarge} py={theme.spacings.large}>
        <Box>
          <PageTitle>{t('Settings')}</PageTitle>
          <Toolbar>
            <Flex>
              <ToolbarItem
                key="privateKey"
                onClick={() => {
                  router.push('/settings')
                }}
                isCurrent={router.pathname === '/settings'}
              >
                {t('General')}
              </ToolbarItem>
              <ToolbarItem
                key="node"
                onClick={() => {
                  router.push('/settings/node')
                }}
                isCurrent={router.pathname === '/settings/node'}
              >
                {t('Node')}
              </ToolbarItem>

              <ToolbarItem
                key="validators"
                onClick={() => {
                  router.push('/settings/validators')
                }}
                isCurrent={router.pathname === '/settings/validators'}
              >
                {t('Validators')}
              </ToolbarItem>
              <ToolbarItem
                key="peer"
                onClick={() => {
                  router.push('/settings/peer')
                }}
                isCurrent={router.pathname === '/settings/peer'}
              >
                {t('Peer')}
              </ToolbarItem>
              <ToolbarItem
                key="transactions"
                onClick={() => {
                  router.push('/settings/transactions')
                }}
                isCurrent={router.pathname === '/settings/transactions'}
              >
                {t('Transaction Pool')}
              </ToolbarItem>
            </Flex>
          </Toolbar>
        </Box>
        {children}
      </Box>
    </Layout>
  )
}

SettingsLayout.propTypes = {
  children: PropTypes.node,
}

export default SettingsLayout
