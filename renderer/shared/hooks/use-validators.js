import {useEffect, useState} from 'react'
import {getValidatorsList, getCycleStage} from '../api/validators'

export function useValidators() {
  /**
   * set validation list array
   * * */
  const [validatorsList, setValidators] = useState()

  /**
   * set Cycle Stage
   * * */
  const [cycleStage, setCycleStage] = useState()
  /**
   * loading page  to get  validation list
   * * */

  const [isLoading, setIsLoading] = useState(false)

  async function getValidators() {
    setIsLoading(true)
    await getValidatorsList().then(data => {
      if (data) {
        setValidators(data.result)
        setIsLoading(false)
      }
    })
  }

  async function getCycleStageData() {
    await getCycleStage().then(data => {
      if (data) {
        setCycleStage(data.result.cycle)
      }
    })
  }

  return {
    validatorsList,
    cycleStage,
    isLoading,
    getValidators,
    getCycleStageData,
  }
}
