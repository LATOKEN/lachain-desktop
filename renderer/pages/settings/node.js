/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useEffect, useReducer, useRef, useState} from 'react'
import {margin, rem, padding, borderRadius} from 'polished'
import {useTranslation} from 'react-i18next'
import Ansi from 'ansi-to-react'
import {FiEye, FiEyeOff} from 'react-icons/fi'
import {
  Box,
  Input,
  Label,
  Button,
  Switcher,
  Text,
  SubHeading,
  Modal,
} from '../../shared/components'
import theme from '../../shared/theme'
import {FlatButton} from '../../shared/components/button'
import Divider from '../../shared/components/divider'
import Flex from '../../shared/components/flex'
import {useNotificationDispatch} from '../../shared/providers/notification-context'
import {BASE_API_URL} from '../../shared/api/api-client'
import SettingsLayout from './layout'
import {
  useSettingsState,
  useSettingsDispatch,
} from '../../shared/providers/settings-context'
import {
  useNodeState,
  useNodeDispatch,
} from '../../shared/providers/node-context'
import {NODE_EVENT, NODE_COMMAND} from '../../../main/channels'

const purgeData = () => {
  const modeData = localStorage.getItem('nodeMode')
  global.ipcRenderer.send(NODE_COMMAND, 'purge-node', modeData)
}

function NodeSettings() {
  const {addNotification} = useNotificationDispatch()
  const {t} = useTranslation()
  const settings = useSettingsState()
  const {
    saveExternalUrl,
    toggleUseExternalNode,
    toggleRunInternalNode,
    saveExternalApiKey,
  } = useSettingsDispatch()

  const [showConfirmModal, setConfirmModalShow] = useState(false)
  const [nodeMode, setNodeMode] = useState(1)
  const {nodeFailed} = useNodeState()
  const {tryRestartNode} = useNodeDispatch()
  const logsRef = useRef(null)

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SET_URL':
          return {
            ...prevState,
            url: action.data,
          }
        case 'SET_API_KEY': {
          return {
            ...prevState,
            apiKey: action.data,
          }
        }
        case 'NEW_LOG': {
          const prevLogs =
            prevState.logs.length > 200
              ? prevState.logs.slice(-100)
              : prevState.logs
          return {
            ...prevState,
            logs: [...prevLogs, ...action.data],
          }
        }
        case 'SET_LAST_LOGS': {
          return {
            ...prevState,
            logs: action.data,
          }
        }
        default:
      }
    },
    {
      logs: [],
      url: settings.url,
      apiKey: settings.externalApiKey,
    }
  )

  useEffect(() => {
    const onEvent = (_sender, event, data) => {
      switch (event) {
        case 'node-log':
          if (!settings.useExternalNode) dispatch({type: 'NEW_LOG', data})
          break
        case 'last-node-logs':
          dispatch({type: 'SET_LAST_LOGS', data})
          break
        default:
      }
    }

    global.ipcRenderer.on(NODE_EVENT, onEvent)

    return () => {
      global.ipcRenderer.removeListener(NODE_EVENT, onEvent)
    }
  })

  useEffect(() => {
    if (!settings.useExternalNode) {
      global.ipcRenderer.send(NODE_COMMAND, 'get-last-logs')
    }
  }, [settings.useExternalNode])

  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = 9999
    }
  })

  const notify = () =>
    addNotification({
      title: t('Settings updated'),
      body: t('Connected to url', {url: state.url}),
    })

  function setNodeModeData(modeData) {
    setNodeMode(modeData)
    localStorage.setItem('nodeMode', modeData)
    global.ipcRenderer.send(NODE_COMMAND, 'stop-local-node')
    dispatch('node-failed')
    global.ipcRenderer.send('reload')
  }

  useEffect(() => {
    const nodeModeValue = +localStorage.getItem('nodeMode')
    if (nodeModeValue) {
      setNodeMode(nodeModeValue)
    }
  })

  const [revealApiKey, setRevealApiKey] = useState(false)
  // {/*<Button onClick={() => setConfirmModalShow(true)} danger>*/}
  // {/*Purge local node*/}
  // {/*</Button>*/}
  //  first Div
  return (
    <SettingsLayout>
      <Box py={theme.spacings.large}>
        <div
          style={{
            ...margin(rem(theme.spacings.small12, theme.fontSizes.base), 0),
          }}
        />
        <Flex align="center">
          <Box>
            <Switcher
              isChecked={settings.runInternalNode}
              onChange={() => {
                toggleRunInternalNode(!settings.runInternalNode)
              }}
              bgOn={theme.colors.primary}
            />
          </Box>
          <div
            style={{
              ...margin(
                0,
                0,
                0,
                rem(theme.spacings.small12, theme.fontSizes.base)
              ),
            }}
          >
            <strong>{t('Run built-in node')}</strong>
            <div>{t('Use built-in node to have automatic updates')}</div>
          </div>
          {settings.runInternalNode && nodeFailed && (
            <div
              style={{
                ...margin(
                  0,
                  0,
                  0,
                  rem(theme.spacings.small12, theme.fontSizes.base)
                ),
              }}
            >
              <Text css={{color: theme.colors.warning}}>
                {t('Node failed to start')}
              </Text>
              <Button
                variant="secondary"
                css={{marginLeft: 10}}
                onClick={() => tryRestartNode()}
              >
                {t('Try restart')}
              </Button>
            </div>
          )}
        </Flex>
      </Box>
      <Box py={theme.spacings.large}>
        <Flex align="center">
          <Box>
            <Switcher
              isChecked={settings.useExternalNode}
              onChange={() => {
                toggleUseExternalNode(!settings.useExternalNode)
              }}
              bgOn={theme.colors.primary}
            />
          </Box>
          <div
            style={{
              ...margin(
                0,
                0,
                0,
                rem(theme.spacings.small12, theme.fontSizes.base)
              ),
            }}
          >
            <strong>{t('Connect to remote node')}</strong>
            <div>
              {t(
                'Specify the Node address if you want to connect to remote node'
              )}
            </div>
          </div>
        </Flex>
      </Box>
      <Box>
        <div className="P-node-mode">
          <h3>{t('Local node')}</h3>
          <ul>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <li onClick={() => setNodeModeData(1)}>
              <span
                className={`G-radio-button ${
                  nodeMode === 1 ? 'G-active-radio' : ''
                }`}
              />
              <p>TestNet</p>
            </li>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <li onClick={() => setNodeModeData(2)}>
              <span
                className={`G-radio-button ${
                  nodeMode === 2 ? 'G-active-radio' : ''
                }`}
              />
              <p>DevNet</p>
            </li>
          </ul>
        </div>
      </Box>
      {settings.useExternalNode && (
        <Box py={theme.spacings.xlarge}>
          <Flex align="center">
            <Label htmlFor="url" style={{width: 120}}>
              {t('Node address')}
            </Label>
            <Input
              id="url"
              value={state.url}
              onChange={e => dispatch({type: 'SET_URL', data: e.target.value})}
              style={{
                ...margin(0, theme.spacings.normal, 0, theme.spacings.small),
                width: rem(300),
              }}
            />
            <Button
              onClick={() => {
                saveExternalUrl(state.url)
                notify()
              }}
            >
              {t('Save')}
            </Button>
            <Divider vertical m={theme.spacings.small} />
            <FlatButton
              color={theme.colors.primary}
              onClick={() => {
                dispatch({type: 'SET_URL', data: BASE_API_URL})
                saveExternalUrl(BASE_API_URL)
                notify()
              }}
            >
              {t('Use default')}
            </FlatButton>
          </Flex>
          <Flex align="center" css={{marginTop: 10}}>
            <Label htmlFor="url" style={{width: 120}}>
              {`${t('Node api key')} `}
            </Label>
            <Box style={{position: 'relative'}}>
              <Input
                id="key"
                value={state.apiKey}
                type={revealApiKey ? 'text' : 'password'}
                onChange={e =>
                  dispatch({type: 'SET_API_KEY', data: e.target.value})
                }
                style={{
                  ...margin(0, theme.spacings.normal, 0, theme.spacings.small),
                  width: rem(300),
                }}
              />
              <Box
                style={{
                  background: theme.colors.gray2,
                  ...borderRadius('right', rem(6)),
                  cursor: 'pointer',
                  fontSize: rem(20),
                  position: 'absolute',
                  ...padding(0, rem(8)),
                  top: 0,
                  height: '100%',
                  right: '12px',
                }}
                onClick={() => setRevealApiKey(!revealApiKey)}
              >
                {revealApiKey ? (
                  <FiEyeOff style={{transform: 'translate(0, 50%)'}} />
                ) : (
                  <FiEye style={{transform: 'translate(0, 50%)'}} />
                )}
              </Box>
            </Box>
            <Button
              onClick={() => {
                saveExternalApiKey(state.apiKey)
                notify()
              }}
            >
              {t('Save')}
            </Button>
          </Flex>
        </Box>
      )}
      {!settings.useExternalNode && (
        <div>
          <SubHeading
            css={margin(theme.spacings.medium24, 0, theme.spacings.medium16, 0)}
          >
            {t('Built-in node log')}
          </SubHeading>
          <div
            ref={logsRef}
            direction="column"
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 300,
              overflow: 'auto',
              wordWrap: 'break-word',
              border: `1px solid ${theme.colors.muted}`,
            }}
          >
            {state.logs.map((log, idx) => (
              <Ansi key={idx}>{log}</Ansi>
            ))}
          </div>
        </div>
      )}

      <Modal
        show={showConfirmModal}
        onHide={() => {
          setConfirmModalShow(false)
        }}
      >
        <Box m="0 0 18px">
          <SubHeading>{t('Confirm action')}</SubHeading>
          <Text>
            <span>
              {t('The node and its data will be irreversible removed.')}
              <br />
            </span>
          </Text>
        </Box>
        <Flex align="center" justify="flex-end">
          <Box px="4px">
            <Button
              variant="secondary"
              onClick={() => {
                setConfirmModalShow(false)
              }}
            >
              {t('Cancel')}
            </Button>
          </Box>
          <Box px="4px">
            <Button
              onClick={() => {
                setConfirmModalShow(false)
                toggleRunInternalNode(false)
                purgeData()
              }}
            >
              {t('Submit')}
            </Button>
          </Box>
        </Flex>
      </Modal>
    </SettingsLayout>
  )
}

export default NodeSettings
