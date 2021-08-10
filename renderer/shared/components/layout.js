import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

import Sidebar from './sidebar'
import Notifications from './notifications'
import SyncingApp, {OfflineApp, LoadingApp} from './syncing-app'
import {GlobalModals} from './modal'
import {useDebounce} from '../hooks/use-debounce'
import {addWheelHandler} from '../utils/mouse'
import {loadPersistentStateValue, persistItem} from '../utils/persist'
import {DnaSignInDialog, DnaSendDialog, DnaLinkHandler} from './dna-link'
import {useNotificationDispatch} from '../providers/notification-context'
import {useAnalytics} from '../hooks/use-analytics'
import {usePath} from '../hooks/use-path'
import ModalComponent from './modal-component'
import WalletPasswordModal from '../../pages/wallets/wallet-password-modal'

global.getZoomLevel = global.getZoomLevel || {}

const AVAILABLE_TIMEOUT = global.isDev ? 0 : 1000 * 5

export default function Layout({loading, syncing, offline, ...props}) {
  const debouncedSyncing = useDebounce(syncing, AVAILABLE_TIMEOUT)
  const debouncedOffline = useDebounce(offline, AVAILABLE_TIMEOUT)
  const [isOpenModalWallet, setOpenModalWallet] = React.useState(false)

  const {path} = usePath()

  const [zoomLevel, setZoomLevel] = React.useState(
    () => loadPersistentStateValue('settings', 'zoomLevel') || 0
  )
  React.useEffect(() => addWheelHandler(setZoomLevel), [])
  React.useEffect(() => {
    if (Number.isFinite(zoomLevel)) {
      global.setZoomLevel(zoomLevel)
      persistItem('settings', 'zoomLevel', zoomLevel)
    }
  }, [zoomLevel])

  const {addError} = useNotificationDispatch()
  const {setAnalyticBasePath} = useAnalytics()
  if (path) {
    setAnalyticBasePath(path)
  }

  function closeModalWallet() {
    setOpenModalWallet(false)
  }

  React.useEffect(() => {
    const walletPassword = localStorage.getItem('walletPassword')
    if (!walletPassword) {
      setOpenModalWallet(true)
    }
  }, [])
  return (
    <main>
      <Sidebar />
      {isOpenModalWallet && (
        <ModalComponent close={() => {}}>
          <WalletPasswordModal close={closeModalWallet} />
        </ModalComponent>
      )}
      {loading && <LoadingApp />}
      {!loading && debouncedSyncing && !debouncedOffline && <SyncingApp />}
      {!loading && debouncedOffline && !debouncedSyncing && <OfflineApp />}
      {}
      {!loading &&
        !debouncedOffline &&
        !debouncedSyncing &&
        !isOpenModalWallet && <NormalApp {...props} />}

      {!debouncedOffline && !loading && (
        <DnaLinkHandler>
          <DnaSignInDialog
            isOpen={url => new URL(url).pathname.includes('signin')}
            onSigninError={error =>
              addError({
                title: error,
              })
            }
          />
        </DnaLinkHandler>
      )}

      <style jsx>{`
        main {
          display: flex;
          padding: 0;
          margin: 0;
          max-height: 100vh;
          overflow: hidden;
        }
        section {
          flex: 1;
          overflow-y: auto;
        }
      `}</style>
    </main>
  )
}

Layout.propTypes = {
  loading: PropTypes.bool,
  syncing: PropTypes.bool,
  offline: PropTypes.bool,
  children: PropTypes.node,
}

function NormalApp(props) {
  const {t} = useTranslation()

  const {addNotification, addError} = useNotificationDispatch()

  return (
    <section style={{flex: 1, overflowY: 'auto'}}>
      <div {...props} />

      <Notifications />

      <GlobalModals />

      <DnaLinkHandler>
        <DnaSendDialog
          isOpen={url => new URL(url).pathname.includes('send')}
          onDepositSuccess={hash =>
            addNotification({
              title: t('Transaction sent'),
              body: hash,
            })
          }
          onDepositError={error =>
            addError({
              title: error,
            })
          }
        />
      </DnaLinkHandler>
    </section>
  )
}
