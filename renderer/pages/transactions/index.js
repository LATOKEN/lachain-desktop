import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import Layout from '../../shared/components/layout'
import {Box, PageTitle} from '../../shared/components'
import theme from '../../shared/theme'
import Loading from '../../shared/components/loading'
import TransactionList from '../../screens/transactions/components/table-list'
import {fetchTransactionsDetails, fetchTransactions} from '../../shared/api'

export default function Index() {
  const {t} = useTranslation()

  const [transactionList, setTransactionLst] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    start()
  }, [])

  async function start() {
    fetchTransactions().then(resultData => {
      if (resultData) {
        let sum = 0
        setIsLoading(true)
        const array = []
        resultData.result.forEach((item, index) => {
          fetchTransactionsDetails(item)
            .then(data => {
              if (data) {
                array.push(data.result)
              setDataTransactions(resultData.result.length - 1, sum, array)
                sum += 1
              }
            })
            .catch(error => {
              console.log(error)
            })

        })
      }
    })
  }

  function setDataTransactions(transactionsList, index, array) {
    if (index === transactionsList) {
      setTransactionLst(array)
      setIsLoading(false)
    }

  }

  return (
    <Layout>
      <Box px={theme.spacings.xxxlarge} py={theme.spacings.large}>
        <PageTitle>{t('Transactions')}</PageTitle>
        {isLoading ? (
          <div>
            <Loading color={theme.colors.text}/>
          </div>
        ) : null}
        {transactionList.length && !isLoading ? (
          <TransactionList dataList={transactionList}/>
        ) : null}
      </Box>
    </Layout>
  )
}
