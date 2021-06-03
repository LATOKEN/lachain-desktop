import React from 'react'
import PropTypes from 'prop-types'
import {useRouter} from 'next/router'
import {margin, borderRadius, darken, transparentize, padding} from 'polished'
import {useTranslation} from 'react-i18next'
import {Box, List, Link, Text} from '.'
import Flex from './flex'
import theme, {rem} from '../theme'
import Loading from './loading'
import {useIdentityState} from '../providers/identity-context'
import {useEpochState, EpochPeriod} from '../providers/epoch-context'
import {useChainState} from '../providers/chain-context'
import {
  useAutoUpdateState,
  useAutoUpdateDispatch,
} from '../providers/update-context'
import useRpc from '../hooks/use-rpc'
import {usePoll} from '../hooks/use-interval'
import {Tooltip} from './tooltip'

function Sidebar() {
  return (
    <section>
      <Flex direction="column" align="flex-start">
        <NodeStatus />
        <Logo />
        <Nav />
        <ActionPanel />
      </Flex>
      <div>
        <Version />
      </div>
      <style jsx>{`
        section {
          background: ${theme.colors.primary2};
          color: ${theme.colors.white};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100vh;
          padding: ${rem(8)} ${rem(16)};
          width: ${rem(200)};
          position: relative;
          z-index: 2;
        }
      `}</style>
    </section>
  )
}

function NodeStatus() {
  const {
    loading,
    syncing,
    offline,
    currentBlock,
    highestBlock,
  } = useChainState()

  const [{result: peers}] = usePoll(useRpc('net_peers'), 3000)

  let bg = theme.colors.white01
  let color = theme.colors.muted
  let text = 'Getting node status...'

  if (!loading) {
    if (offline) {
      bg = theme.colors.danger02
      color = theme.colors.danger
      text = 'Offline'
    } else {
      bg = syncing ? theme.colors.warning02 : theme.colors.success02
      color = syncing ? theme.colors.warning : theme.colors.success
      text = syncing ? 'Synchronizing' : 'Synchronized'
    }
  }

  return (
    <Box
      bg={bg}
      css={{
        borderRadius: rem(12),
        ...margin(0, 0, 0, rem(-8)),
        ...padding(rem(2), rem(12), rem(4), rem(8)),
      }}
    >
      <Tooltip
        content={
          <div style={{minWidth: rem(90)}}>
            {offline
              ? null
              : [
                  !offline ? `Peers: ${(peers || []).length}` : '',
                  syncing
                    ? `Blocks: ${parseInt(currentBlock, 16)} out of ${parseInt(
                        highestBlock,
                        16
                      )}`
                    : `Current block: ${parseInt(currentBlock, 16)}`,
                ].map((t, idx) => (
                  <div
                    key={idx}
                    style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}
                  >
                    {t}
                  </div>
                ))}
          </div>
        }
        placement="bottom"
      >
        <Flex align="baseline">
          {!offline && (
            <Box css={{...margin(0, rem(4), 0, 0)}}>
              <Bandwidth strength={(peers || []).length} syncing={syncing} />
            </Box>
          )}

          <Text color={color} fontWeight={500} css={{lineHeight: rem(18)}}>
            {text}
          </Text>
        </Flex>
      </Tooltip>
    </Box>
  )
}

export function Logo() {
  return (
    <Box
      css={{
        alignSelf: 'center',
        ...margin(rem(32), 0),
      }}
    >
      <img src="/static/logo.png" alt="Latoken logo" />
      <style jsx>{`
        img {
          width: ${rem(56)};
        }
      `}</style>
    </Box>
  )
}

function Nav() {
  const {t} = useTranslation()
  const {nickname} = useIdentityState()
  return (
    <nav>
      <List m={0}>
        <NavItem
          href="/dashboard"
          active
          icon={<i className="icon icon--user" />}
        >
          {t('My Account') || nickname}
        </NavItem>
        <NavItem
          href="/wallets"
          icon={<i className="icon icon--menu_wallets" />}
        >
          {t('Wallets')}
        </NavItem>
        <NavItem
          href="/validators"
          icon={<i className="icon icon--small_status" />}
        >
          {t('Validators')}
        </NavItem>
        <NavItem
          href="/transactions"
          icon={<i className="icon icon--process" />}
        >
          {t('Transactions')}
        </NavItem>
        <NavItem href="/settings" icon={<i className="icon icon--settings" />}>
          {t('Settings')}
        </NavItem>
      </List>
      <style jsx>{`
        nav {
          align-self: stretch;
        }
        .icon {
          margin-left: -4px;
          margin-top: -4px;
          margin-bottom: -3px;
          position: relative;
          top: 1px;
        }
      `}</style>
    </nav>
  )
}

// eslint-disable-next-line react/prop-types
function NavItem({href, icon, children}) {
  const router = useRouter()
  const active = router.pathname.startsWith(href)
  const bg = active ? transparentize(0.84, theme.colors.black0) : ''
  const bgHover = active
    ? transparentize(0.84, theme.colors.black0)
    : transparentize(0.9, theme.colors.white)
  const color = active ? theme.colors.white : theme.colors.white05
  return (
    <li>
      <Link
        href={href}
        color={color}
        hoverColor={theme.colors.white}
        fontWeight={500}
        width="100%"
        height="100%"
        style={{
          fontWeight: 500,
          lineHeight: rem(20),
          ...padding(rem(6), rem(8)),
        }}
      >
        <Flex align="center">
          {React.cloneElement(icon, {
            color,
            fontSize: theme.fontSizes.normal,
          })}
          <Box w="8px" />
          {children}
        </Flex>
      </Link>
      <style jsx>{`
        li {
          background: ${bg};
          border-radius: ${rem(6)};
          color: ${theme.colors.white05};
          cursor: pointer;
          transition: background 0.3s ease;
        }
        li:hover {
          border-radius: 4px;
          background: ${bgHover};
        }
      `}</style>
    </li>
  )
}

function mapToFriendlyPeriod(period) {
  switch (period) {
    case 'KeyGenPhase':
      return 'Key gen'
    case 'VrfSubmissionPhase':
      return 'VRF challenge'
    case 'AttendanceSubmissionPhase':
      return 'Reward distribution'
    default:
      return period
  }
}

function ActionPanel() {
  const {syncing} = useChainState()
  const epoch = useEpochState()
  const identity = useIdentityState()
  const {t} = useTranslation()

  if (syncing || !epoch) {
    return null
  }

  const {currentPeriod} = epoch
  const {isWalletLocked} = identity
  return (
    <Box
      bg={theme.colors.white01}
      css={{
        minWidth: '100%',
        ...borderRadius('top', rem(6)),
        ...borderRadius('bottom', rem(6)),
        ...margin(rem(24), 0, 0),
      }}
    >
      {currentPeriod !== EpochPeriod.None && (
        <Block title={t('Current phase')}>
          {mapToFriendlyPeriod(currentPeriod)}
        </Block>
      )}
      <Block title={t('Wallet state')}>
        {isWalletLocked ? 'Locked' : 'Unlocked'}
      </Block>
    </Box>
  )
}

function Block({title, children, fallback = <Loading />}) {
  return (
    <Box
      css={{
        borderBottom: `solid 1px ${theme.colors.gray3}`,
        ...margin(0, 0, rem(1)),
        ...padding(rem(8), rem(12)),
      }}
    >
      <Text
        color={theme.colors.white05}
        fontWeight={500}
        css={{lineHeight: rem(19)}}
      >
        {title}
      </Text>
      <Text
        color={theme.colors.white}
        fontWeight={500}
        css={{display: 'block', lineHeight: rem(20)}}
      >
        {children || fallback}
      </Text>
    </Box>
  )
}

Block.propTypes = {
  title: PropTypes.string,
  fallback: PropTypes.node,
  children: PropTypes.node,
}

function UpdateButton({text, version, ...props}) {
  return (
    <>
      <button type="button" {...props}>
        <span>{text}</span>
        <br />
        {version}
      </button>
      <style jsx>{`
        button {
          background: ${theme.colors.white};
          border: none;
          border-radius: 6px;
          color: ${theme.colors.muted};
          cursor: pointer;
          padding: ${`0.5em 1em`};
          outline: none;
          transition: background 0.3s ease, color 0.3s ease;
          width: 100%;
          margin-bottom: ${theme.spacings.medium16};
        }
        button span {
          color: ${theme.colors.text};
        }
        button:hover {
          background: ${darken(0.1, theme.colors.white)};
        }
        button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}</style>
    </>
  )
}

UpdateButton.propTypes = {
  text: PropTypes.string,
  version: PropTypes.string,
}

export function Version() {
  const autoUpdate = useAutoUpdateState()
  const {uiUpdate, nodeUpdate} = useAutoUpdateDispatch()

  return (
    <>
      <Box
        css={{
          ...margin(rem(theme.spacings.small8)),
        }}
      >
        <Flex direction="column">
          <Text
            color={theme.colors.white05}
            fontWeight={500}
            css={{lineHeight: rem(20)}}
          >
            Client version: {global.appVersion}
          </Text>
          <Text
            color={theme.colors.white05}
            fontWeight={500}
            css={{lineHeight: rem(20)}}
          >
            Node version: {autoUpdate.nodeCurrentVersion}
          </Text>
        </Flex>
      </Box>
      <Box
        css={{
          ...margin(0, 0, rem(theme.spacings.small8)),
        }}
      >
        {autoUpdate.nodeUpdating && (
          <Text
            color={theme.colors.white05}
            css={{...margin(0, rem(theme.spacings.small8), 0)}}
          >
            Updating Node...
          </Text>
        )}
        {autoUpdate.uiCanUpdate ? (
          <UpdateButton
            text="Update Client Version"
            version={autoUpdate.uiRemoteVersion}
            onClick={uiUpdate}
          />
        ) : null}
        {!autoUpdate.uiCanUpdate &&
        autoUpdate.nodeCanUpdate &&
        (!autoUpdate.nodeProgress ||
          autoUpdate.nodeProgress.percentage === 100) ? (
          <UpdateButton
            text="Update Node Version"
            version={autoUpdate.nodeRemoteVersion}
            onClick={nodeUpdate}
          />
        ) : null}
      </Box>
    </>
  )
}

// eslint-disable-next-line react/prop-types
function Bandwidth({strength, syncing}) {
  return (
    <div>
      <div>
        {Array.from({length: 4}).map((_, idx) => (
          <BandwidthItem
            key={`bw-${idx}`}
            active={idx < strength}
            variant={syncing ? 'warning' : 'success'}
            height={(idx + 1) * 3}
          />
        ))}
      </div>
      <style jsx>{`
        div {
          display: inline-block;
          padding: ${rem(2, theme.fontSizes.base)}
            ${rem(1, theme.fontSizes.base)} ${rem(3, theme.fontSizes.base)};
          height: ${rem(16, theme.fontSizes.base)};
          width: ${rem(16, theme.fontSizes.base)};
        }
        div > div {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
      `}</style>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
function BandwidthItem({active, variant, height}) {
  return (
    <div>
      <style jsx>{`
        background-color: ${theme.colors[`${variant}${active ? '' : '04'}`]};
        border-radius: ${rem(1, theme.fontSizes.base)};
        height: ${rem(height, theme.fontSizes.base)};
        width: ${rem(2, theme.fontSizes.base)};
        transition: background 0.3s ease;
      `}</style>
    </div>
  )
}

export default Sidebar
