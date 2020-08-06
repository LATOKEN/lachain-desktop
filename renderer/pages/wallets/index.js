import React, {useEffect} from 'react'
import {margin, rem} from 'polished'
import {FiChevronRight} from 'react-icons/fi'
import {useTranslation} from 'react-i18next'

import theme from '../../shared/theme'
import Layout from '../../shared/components/layout'
import {
  Box,
  Button,
  Drawer,
  Input,
  Modal,
  PageTitle,
  SubHeading,
  Text,
} from '../../shared/components'
import Flex from '../../shared/components/flex'
import Actions from '../../shared/components/actions'
import IconLink from '../../shared/components/icon-link'

import TotalAmount from '../../screens/wallets/components/total-amount'
import WalletList from '../../screens/wallets/components/wallet-list'
import WalletActions from '../../screens/wallets/components/wallet-actions'
import TransferForm from '../../screens/wallets/components/transfer-form'
import ReceiveForm from '../../screens/wallets/components/receive-form'
import KillForm from '../../screens/wallets/components/kill-form'
import Loading from '../../shared/components/loading'
import {useWallets} from '../../shared/hooks/use-wallets'
import {useChainState} from '../../shared/providers/chain-context'
import {FlatButton} from '../../shared/components/button'
import useRpc from '../../shared/hooks/use-rpc'
import {useIdentityState} from '../../shared/providers/identity-context'
import {useNotificationDispatch} from '../../shared/providers/notification-context'

export default function Index() {
  const {t} = useTranslation()
  const {wallets, totalAmount, txs, status} = useWallets()
  const {addError, addNotification} = useNotificationDispatch()

  const [isReceiveFormOpen, setIsReceiveFormOpen] = React.useState(false)
  const [isTransferFormOpen, setIsTransferFormOpen] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [isWalletLocked, setIsWalletLocked] = React.useState(false)
  const [walletPassword, setWalletPassword] = React.useState()
  const [isWithdrawStakeFormOpen, setIsWithdrawStakeFormOpen] = React.useState(
    false
  )
  const handleCloseWithdrawStakeForm = () => setIsWithdrawStakeFormOpen(false)
  const handleCloseTransferForm = () => setIsTransferFormOpen(false)
  const handleCloseReceiveForm = () => setIsReceiveFormOpen(false)

  const [activeWallet, setActiveWallet] = React.useState()
  const {syncing, offline} = useChainState()
  const {isWalletLocked: walletState} = useIdentityState()

  const [{result, error, isReady}, callRpc] = useRpc()

  useEffect(() => {
    if (!activeWallet && wallets && wallets.length > 0) {
      setActiveWallet(wallets[0])
    }
  }, [activeWallet, wallets])

  useEffect(() => {
    setIsWalletLocked(walletState)
  }, [walletState])

  useEffect(() => {
    if (error) {
      addError({
        title: t('error:Error while unlocking wallet'),
        body: error.toString(),
      })
      return
    }
    if (!isReady) return

    switch (result) {
      case 'unlocked':
        addNotification({
          title: t('Wallet unlocked'),
          body: t('Unlock period is 30 seconds'),
        })
        break
      case 'incorrect_password':
        addError({
          title: t('Incorrect password'),
          body: t('Invalid password provided'),
        })
        break
      default:
        addError({
          title: t('Unknown result'),
          body: t(result),
        })
    }
  }, [result, error, isReady, addError, t, addNotification])

  return (
    <Layout syncing={syncing} offline={offline}>
      <Box px={theme.spacings.xxxlarge} py={theme.spacings.large}>
        <PageTitle>{t('Wallets')}</PageTitle>
        <Box>
          {status === 'fetching' && <Loading color={theme.colors.text} />}
          {['success', 'polling'].includes(status) && (
            <>
              <Flex css={{justifyContent: 'space-between', marginBottom: 24}}>
                <div>
                  <TotalAmount
                    amount={totalAmount}
                    percentChanges={0}
                    amountChanges={0}
                  />
                </div>
                <div>
                  <Actions>
                    <IconLink
                      disabled={activeWallet && activeWallet.isStake}
                      icon={<i className="icon icon--key" />}
                      onClick={() => {
                        setShowModal(!showModal)
                      }}
                    >
                      {t('Unlock')}
                    </IconLink>
                    <IconLink
                      disabled={
                        isWalletLocked || (activeWallet && activeWallet.isStake)
                      }
                      icon={<i className="icon icon--withdraw" />}
                      onClick={() => {
                        setIsTransferFormOpen(!isTransferFormOpen)
                      }}
                    >
                      {t('Send')}
                    </IconLink>
                    <IconLink
                      disabled={activeWallet && activeWallet.isStake}
                      icon={<i className="icon icon--deposit" />}
                      onClick={() => {
                        setIsReceiveFormOpen(!isReceiveFormOpen)
                      }}
                    >
                      {t('Receive')}
                    </IconLink>
                  </Actions>
                </div>
              </Flex>
              <div>
                <WalletList
                  wallets={wallets}
                  activeWallet={activeWallet}
                  onChangeActiveWallet={wallet => setActiveWallet(wallet)}
                  onSend={() => setIsTransferFormOpen(true)}
                  onReceive={() => setIsReceiveFormOpen(true)}
                  onWithdrawStake={() => setIsWithdrawStakeFormOpen(true)}
                />
              </div>
              <h3
                style={{
                  fontWeight: 500,
                  fontSize: rem(24),
                  letterSpacing: 0,
                  marginBottom: 0,
                  marginTop: 0,
                  color: theme.colors.primary2,
                }}
              >
                {t('Recent transactions')}
              </h3>

              <FlatButton
                color={theme.colors.primary}
                onClick={() => {
                  global.openExternal(
                    `https://lachain-blockscout.dev3.nekotal.tech/address/${activeWallet.address}`
                  )
                }}
                style={{
                  marginBottom: rem(19),
                }}
              >
                <span>{t('See Explorer for rewards and penalties')} </span>

                <FiChevronRight
                  style={{
                    position: 'relative',
                    top: '3px',
                  }}
                  fontSize={rem(19)}
                />
              </FlatButton>
              <WalletActions transactions={txs} />
            </>
          )}
        </Box>
        <Drawer show={isTransferFormOpen} onHide={handleCloseTransferForm}>
          <TransferForm
            onSuccess={handleCloseTransferForm}
            onFail={handleCloseTransferForm}
          />
        </Drawer>

        <Drawer show={isReceiveFormOpen} onHide={handleCloseReceiveForm}>
          <ReceiveForm address={wallets[0] && wallets[0].address} />
        </Drawer>

        <Drawer
          show={isWithdrawStakeFormOpen}
          onHide={handleCloseWithdrawStakeForm}
        >
          <KillForm
            onSuccess={handleCloseWithdrawStakeForm}
            onFail={handleCloseWithdrawStakeForm}
          />
        </Drawer>

        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false)
            setWalletPassword('')
          }}
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
                  setShowModal(false)
                  setWalletPassword('')
                }}
              >
                {t('Cancel')}
              </Button>
            </Box>
            <Box px="4px">
              <Button
                onClick={() => {
                  setShowModal(false)
                  callRpc('fe_unlock', walletPassword, 30)
                  setWalletPassword('')
                }}
              >
                {t('Submit')}
              </Button>
            </Box>
          </Flex>
        </Modal>
      </Box>
    </Layout>
  )
}
