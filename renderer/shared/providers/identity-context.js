import React, {useCallback} from 'react'
import deepEqual from 'dequal'
import {useInterval} from '../hooks/use-interval'
import {fetchIdentity, killIdentity} from '../api'
import useRpc from '../hooks/use-rpc'

export const AccountStatus = {
  Undefined: 'Undefined',
  Validator: 'Validator',
  NextValidator: 'NextValidator',
  PreviousValidator: 'PreviousValidator',
  AbleToBeStaker: 'AbleToBeStaker',
  AbleToBeValidator: 'AbleToBeValidator',
  StakeReserved: 'StakeReserved',
  SubmittingWithdrawRequest: 'SubmittingWithdrawRequest',
  WaitingForTheNextCycleToWithdraw: 'WaitingForTheNextCycleToWithdraw',
  Newbie: 'Newbie',
}

export function mapToFriendlyStatus(status) {
  switch (status) {
    case AccountStatus.NextValidator:
      return 'Chosen as next validator'
    case AccountStatus.PreviousValidator:
      return 'Previous validator'
    case AccountStatus.AbleToBeValidator:
      return 'Validator candidate'
    case AccountStatus.AbleToBeStaker:
      return 'Can activate staking'
    case AccountStatus.StakeReserved:
      return 'Stake withdrawing: stake reserved for the current cycle. Waiting...'
    case AccountStatus.SubmittingWithdrawRequest:
      return 'Stake withdrawing: submitting withdraw request'
    case AccountStatus.WaitingForTheNextCycleToWithdraw:
      return 'Stake withdrawing: stake will be withdrawn in the next cycle'
    default:
      return status
  }
}

const IdentityStateContext = React.createContext()
const IdentityDispatchContext = React.createContext()

// eslint-disable-next-line react/prop-types
function IdentityProvider({children}) {
  const [identity, setIdentity] = React.useState(null)
  const [{result: balanceResult}, callRpc] = useRpc()

  React.useEffect(() => {
    let ignore = false

    async function fetchData() {
      try {
        const fetchedIdentity = await fetchIdentity()
        if (!ignore) {
          setIdentity(fetchedIdentity)
        }
      } catch (error) {
        global.logger.error(
          'An error occured while fetching identity',
          error.message
        )
      }
    }

    fetchData()

    return () => {
      ignore = true
    }
  }, [callRpc])

  useInterval(
    async () => {
      async function fetchData() {
        try {
          const nextIdentity = await fetchIdentity()
          if (!deepEqual(identity, nextIdentity)) {
            const state =
              identity &&
              identity.state === AccountStatus.Terminating &&
              nextIdentity &&
              nextIdentity.state !== AccountStatus.Undefined // still mining
                ? identity.state
                : nextIdentity.state
            setIdentity({...nextIdentity, state})
          }
        } catch (error) {
          global.logger.error(
            'An error occured while fetching identity',
            error.message
          )
        }
      }

      await fetchData()
    },
    identity ? 1000 * 5 : 1000 * 10
  )

  useInterval(
    () => callRpc('fe_getBalance', identity.address),
    identity && identity.address ? 1000 * 10 : null,
    true
  )

  const canActivateInvite = false

  const canSubmitFlip = false

  // eslint-disable-next-line no-shadow
  const canValidate = false

  const canTerminate = false

  const canMine = identity && identity.state !== AccountStatus.Newbie

  const killMe = useCallback(
    async ({to}) => {
      const resp = await killIdentity(identity.address, to)
      const {result} = resp

      if (result) {
        setIdentity({...identity, state: AccountStatus.Terminating})
        return result
      }
      return resp
    },
    [identity]
  )

  return (
    <IdentityStateContext.Provider
      value={{
        ...identity,
        balance: balanceResult && balanceResult.balance,
        canActivateInvite,
        canSubmitFlip,
        canValidate,
        canMine,
        canTerminate,
      }}
    >
      <IdentityDispatchContext.Provider value={{killMe}}>
        {children}
      </IdentityDispatchContext.Provider>
    </IdentityStateContext.Provider>
  )
}

function useIdentityState() {
  const context = React.useContext(IdentityStateContext)
  if (context === undefined) {
    throw new Error('useIdentityState must be used within a IdentityProvider')
  }
  return context
}

function useIdentityDispatch() {
  const context = React.useContext(IdentityDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useIdentityDispatch must be used within a IdentityProvider'
    )
  }
  return context
}

export function canValidate(identity) {
  if (!identity) {
    return false
  }

  const {requiredFlips, flips, state} = identity

  const numOfFlipsToSubmit = requiredFlips - (flips || []).length
  const shouldSendFlips = numOfFlipsToSubmit > 0

  return (
    ([
      AccountStatus.Human,
      AccountStatus.Verified,
      AccountStatus.Newbie,
    ].includes(state) &&
      !shouldSendFlips) ||
    [
      AccountStatus.Candidate,
      AccountStatus.Suspended,
      AccountStatus.Zombie,
    ].includes(state)
  )
}

export {IdentityProvider, useIdentityState, useIdentityDispatch}
