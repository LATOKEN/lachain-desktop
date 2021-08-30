import React from 'react'

import theme from '../../shared/theme'
import TableList from '../../screens/validators/components/table-list'
import {Box} from '../../shared/components'
import {useInterval} from '../../shared/hooks/use-interval'
import {useValidators} from '../../shared/hooks/use-validators'
import ListInformation from '../../screens/validators/components/list-information'
import SettingsLayout from './layout'

export default function Index() {
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
    <SettingsLayout>
      <Box py={theme.spacings.xxxlarge}>
        <TableList dataList={validatorsList} />
        <ListInformation cycleStage={cycleStage} />
      </Box>
    </SettingsLayout>
  )
}
