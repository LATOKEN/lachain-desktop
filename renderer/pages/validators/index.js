import React from 'react'
import {useTranslation} from 'react-i18next'

import theme from '../../shared/theme'
import Layout from '../../shared/components/layout'
import TableList from '../../screens/validators/components/table-list'
import {Box, PageTitle} from '../../shared/components'
import {useChainState} from '../../shared/providers/chain-context'
import {useInterval} from '../../shared/hooks/use-interval'
import {useValidators} from '../../shared/hooks/use-validators'
import ListInformation from '../../screens/validators/components/list-information'

export default function Index() {
  const {t} = useTranslation()
  const {syncing, offline} = useChainState()
  const {
    validatorsList,
    cycleStage,
    getValidators,
    getCycleStageData,
  } = useValidators()

  useInterval(
    async () => {
      await getValidators()
      await getCycleStageData()
    },
    5000,
    true
  )

  return (
    <Layout syncing={syncing} offline={offline}>
      <Box px={theme.spacings.xxxlarge} py={theme.spacings.large}>
        <PageTitle>{t('Validators')}</PageTitle>
        <TableList dataList={validatorsList} />
        <ListInformation cycleStage={cycleStage} />
      </Box>
    </Layout>
  )
}
