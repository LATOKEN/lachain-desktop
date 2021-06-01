import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'

import theme from '../../shared/theme'
import Layout from '../../shared/components/layout'
import TableList from '../../screens/validators/components/table-list'
import {Box, PageTitle} from '../../shared/components'
import ListInformation from '../../screens/validators/components/list-information'
import Loading from '../../shared/components/loading'
import {useValidators} from '../../shared/hooks/use-validators'

export default function Index() {
  const {t} = useTranslation()
  const {
    dataList,
    maxBlock,
    validatorsOnline,
    consensusParticipants,
    synced,
    isLoading,
  } = useValidators()

  return (
    <Layout>
      <Box px={theme.spacings.xxxlarge} py={theme.spacings.large}>
        <PageTitle>{t('Validators')}</PageTitle>
        {isLoading && (
          <div>
            <Loading color={theme.colors.text}/>
          </div>
        )}
        {!isLoading ? <TableList dataList={dataList}/> : null}
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
