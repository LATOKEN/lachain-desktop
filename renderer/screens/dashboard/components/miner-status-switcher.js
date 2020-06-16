import React, {useEffect, useReducer} from 'react'
import {useTranslation} from 'react-i18next'

import {margin} from 'polished'
import {
  Box,
  FormGroup,
  Label,
  Switcher,
  Modal,
  Button,
  SubHeading,
  Text,
  Input,
} from '../../../shared/components'
import Flex from '../../../shared/components/flex'
import theme, {rem} from '../../../shared/theme'
import useRpc from '../../../shared/hooks/use-rpc'
import {
  AccountStatus,
  useIdentityState,
} from '../../../shared/providers/identity-context'
import {useNotificationDispatch} from '../../../shared/providers/notification-context'

const defaultState = {
  online: null,
  showModal: false,
  isProcessing: false,
}

function miningReducer(
  state,
  [action, {online, state: accountStatus, isWalletLocked} = defaultState]
) {
  switch (action) {
    case 'init':
      return {
        ...state,
        isWalletLocked,
        online,
        isProcessing:
          accountStatus === AccountStatus.StakeReserved ||
          accountStatus === AccountStatus.SubmittingWithdrawRequest ||
          accountStatus === AccountStatus.WaitingForTheNextCycleToWithdraw,
      }
    case 'open':
      return {
        ...state,
        showModal: true,
      }
    case 'walletLocked':
      return {
        ...state,
        isWalletLocked: true,
      }
    case 'walletUnlocked':
      return {
        ...state,
        isWalletLocked: false,
      }
    case 'close':
      return {
        ...state,
        showModal: false,
      }
    case 'processed':
      return {
        ...state,
        showModal: false,
        isProcessing: false,
      }
    case 'toggle':
      console.log('TOGGLE')
      return {
        ...state,
        isProcessing: true,
      }
    case 'submitted':
      return {
        ...state,
        showModal: false,
      }
    case 'mined':
      console.log('mined')
      return {
        ...state,
        isProcessing: false,
        showModal: false,
      }
    case 'error':
      console.log('error')
      return {
        ...state,
        showModal: false,
        isProcessing: false,
      }
    default:
      return state
  }
}

function MinerStatusSwitcher() {
  const identity = useIdentityState()
  const {t} = useTranslation()

  const [{result, error, isReady}, callRpc] = useRpc()

  const [state, dispatch] = useReducer(miningReducer, defaultState)

  useEffect(() => {
    if (!state.showModal) {
      dispatch(['init', identity])
    }
  }, [identity, state.showModal])

  useEffect(() => {
    if (
      state.isProcessing &&
      (identity.state === AccountStatus.AbleToBeStaker ||
        identity.state === AccountStatus.AbleToBeValidator)
    ) {
      dispatch(['processed'])
    }
  }, [identity, identity.state, state.isProcessing])

  useEffect(() => {
    dispatch([identity.isWalletLocked ? 'walletLocked' : 'walletUnlocked'])
  }, [identity.isWalletLocked])

  const {addError, addNotification} = useNotificationDispatch()

  useEffect(() => {
    if (error) {
      addError({
        title: t('error:Error while unlocking wallet'),
        body: error.toString(),
      })
      return
    }
    if (!isReady) return
    if (result === '0x1') {
      addNotification({
        title: t('Wallet unlocked'),
        body: t('Unlock period is 30 seconds'),
      })
    } else {
      addError({
        title: t('error:Error while unlocking wallet'),
        body: t('Incorrect password'),
      })
    }
  }, [result, error, isReady, addError, t, addNotification])

  const [walletPassword, setWalletPassword] = React.useState()

  if (!identity.canMine) {
    return null
  }

  return (
    <Box m="0 0 24px 0">
      <FormGroup
        onClick={() => {
          console.log(state)
          if (!state.isProcessing) dispatch(['open'])
        }}
      >
        <div className="form-control">
          <Flex align="center" justify="space-between">
            <Label htmlFor="switcher" style={{margin: 0, cursor: 'pointer'}}>
              {t('Validator status')}
            </Label>
            <Box style={{pointerEvents: 'none'}}>
              {state.online !== null && state.online !== undefined && (
                <Switcher
                  withStatusHint
                  isChecked={state.online}
                  isInProgress={state.isProcessing}
                  bgOff={theme.colors.danger}
                  bgOn={theme.colors.primary}
                />
              )}
            </Box>
          </Flex>
        </div>
        <style jsx>{`
          .form-control {
            border: solid 1px ${theme.colors.gray2};
            color: ${theme.colors.input};
            background: ${theme.colors.white};
            border-radius: 6px;
            font-size: 1em;
            padding: 0.5em 1em 0.65em;
            cursor: pointer;
          }
        `}</style>
      </FormGroup>
      <Modal
        show={state.showModal && !state.isWalletLocked}
        onHide={() => dispatch(['close'])}
      >
        <Box m="0 0 18px">
          <SubHeading>
            {!state.online
              ? t('Activate mining status')
              : t('Deactivate mining status')}
          </SubHeading>
          <Text>
            {!state.online ? (
              <span>
                {t(`Submit the form to start mining. Your node has to be online
                unless you completely deactivate your status. Otherwise penalties might be
                charged after being offline for the next cycle.`)}
                <br />
                <br />
                {t('You can deactivate your validator status at any time.')}
              </span>
            ) : (
              <span>
                {t('Submit the form to deactivate your validator status.')}
                <br />
                {t('It will take 2-3 cycles.')}
                <br />
                <br />
                {t('You can activate it again afterwards.')}
              </span>
            )}
          </Text>
        </Box>
        <Flex align="center" justify="flex-end">
          <Box px="4px">
            <Button variant="secondary" onClick={() => dispatch(['close'])}>
              {t('Cancel')}
            </Button>
          </Box>
          <Box px="4px">
            <Button
              onClick={() => {
                dispatch(['toggle'])
                callRpc(state.online ? 'validator_stop' : 'validator_start')
              }}
              disabled={state.isProcessing}
            >
              {state.isProcessing ? t('Waiting...') : t('Submit')}
            </Button>
          </Box>
        </Flex>
      </Modal>
      <Modal
        show={state.showModal && state.isWalletLocked}
        onHide={() => dispatch(['close'])}
      >
        <Box m="0 0 18px">
          <SubHeading>{t('Unlock wallet')}</SubHeading>
          <Text>
            <span>
              {t(`Unlock wallet for 30 sec to make changes.`)}
              <br />
              <br />
              {t('You still need apikey to access private functionality.')}
              <br />
              <br />
              {t('Password')}
              <Input
                value={walletPassword}
                type="password"
                style={{
                  ...margin(0, theme.spacings.normal, 0, 0),
                  width: rem(300),
                }}
                disabled={!state.showModal}
                onChange={e => setWalletPassword(e.target.value)}
              />
            </span>
          </Text>
        </Box>
        <Flex align="center" justify="flex-end">
          <Box px="4px">
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(['close'])
                setWalletPassword('')
              }}
            >
              {t('Cancel')}
            </Button>
          </Box>
          <Box px="4px">
            <Button
              onClick={() => {
                dispatch(['submitted'])
                callRpc('fe_unlock', walletPassword, 30)
                setWalletPassword('')
              }}
              disabled={state.isProcessing}
            >
              {t('Submit')}
            </Button>
          </Box>
        </Flex>
      </Modal>
    </Box>
  )
}

export default MinerStatusSwitcher
