import React from 'react'
import {fetchCeremonyIntervals} from '../api'
import {useInterval} from './use-interval'
import {useAnalytics} from './use-analytics'

const initialTiming = {
  validation: null,
  flipLottery: null,
  shortSession: null,
  longSession: null,
  afterLongSession: null,
  none: null,
}

function useTiming() {
  const [timing, setTiming] = React.useState(initialTiming)
  const [interval, setInterval] = React.useState(1000 * 60)
  const {setAnalytics} = useAnalytics()
  useInterval(
    async () => {
      try {
        const {
          ValidationInterval: validation,
          FlipLotteryDuration: flipLottery,
          ShortSessionDuration: shortSession,
          LongSessionDuration: longSession,
          AfterLongSessionDuration: afterLongSession,
          AttendanceSubmissionPhase: attendanceSubmissionPhase,
          VrfSubmissionPhase: vrfSubmissionPhase,
          KeyGenPhase: keyGenPhase,
        } = await fetchCeremonyIntervals()

        setTiming({
          validation,
          flipLottery,
          shortSession,
          longSession,
          afterLongSession,
          attendanceSubmissionPhase,
          vrfSubmissionPhase,
          keyGenPhase,
        })
        setInterval(1000 * 60 * 1)
      } catch (error) {
        setInterval(1000 * 5 * 1)
        setAnalytics(
          'Error',
          ' error occured while fetching ceremony intervals',
          JSON.stringify(error)
        )
        global.logger.error(
          'An error occured while fetching ceremony intervals',
          error.message
        )
      }
    },
    interval,
    true
  )

  return timing
}

export default useTiming
