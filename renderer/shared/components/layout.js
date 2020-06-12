import React from 'react'
import PropTypes from 'prop-types'
import {useRouter} from 'next/router'
import {useTranslation} from 'react-i18next'
import Sidebar from './sidebar'
import Notifications from './notifications'
import SyncingApp, {OfflineApp, LoadingApp} from './syncing-app'
import {GlobalModals} from './modal'
import {useDebounce} from '../hooks/use-debounce'
import {EpochPeriod, useEpochState} from '../providers/epoch-context'
import {useIdentityState} from '../providers/identity-context'
import {addWheelHandler} from '../utils/mouse'
import {loadPersistentStateValue, persistItem} from '../utils/persist'
import {DnaSignInDialog, DnaSendDialog, DnaLinkHandler} from './dna-link'
import {useNotificationDispatch} from '../providers/notification-context'

global.getZoomLevel = global.getZoomLevel || {}

const AVAILABLE_TIMEOUT = global.isDev ? 0 : 1000 * 5

export default function Layout({loading, syncing, offline, ...props}) {
  const debouncedSyncing = useDebounce(syncing, AVAILABLE_TIMEOUT)
  const debouncedOffline = useDebounce(offline, AVAILABLE_TIMEOUT)

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

  return (
    <main>
      <Sidebar />
      {loading && <LoadingApp />}
      {!loading && debouncedSyncing && !debouncedOffline && <SyncingApp />}
      {!loading && debouncedOffline && !debouncedSyncing && <OfflineApp />}
      {!loading && !debouncedOffline && !debouncedSyncing && (
        <NormalApp {...props} />
      )}

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
  const router = useRouter()

  const epoch = useEpochState()
  const identity = useIdentityState()

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

function showWindowNotification(title, notificationBody, onclick) {
  const notification = new window.Notification(title, {
    body: notificationBody,
  })
  notification.onclick = onclick
  return true
}