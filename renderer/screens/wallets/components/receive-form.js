import React, {useState} from 'react'
import {rem, margin, padding, wordWrap} from 'polished'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'
import axios from 'axios'
import {useTranslation} from 'react-i18next'
import theme from '../../../shared/theme'
import {
  Box,
  SubHeading,
  FormGroup,
  Field,
  Button,
  Text,
  Modal,
} from '../../../shared/components'
import Flex from '../../../shared/components/flex'

const faucetUrl = 'http://95.217.215.141:3020'

async function requestTestLA(address) {
  const data = {
    jsonrpc: '2.0',
    method: 'get_money',
    params: [address],
    id: 1,
  }
  const resp = await axios.post(faucetUrl, data, {crossdomain: true})
  console.log(resp.data)
}

function ReceiveForm({address, onClose}) {
  const [showConfirmModal, setConfirmModalShow] = useState(false)
  const {t} = useTranslation()
  return (
    <Box
      css={padding(rem(theme.spacings.large48), rem(theme.spacings.medium32))}
    >
      <Box
        css={{
          ...margin(theme.spacings.medium16, 0, theme.spacings.medium32),
        }}
      >
        <SubHeading
          css={{...margin(0, 0, theme.spacings.small8), ...wordWrap()}}
        >
          {t(`Receive LA`)}
        </SubHeading>

        <Box
          css={{
            ...margin(rem(theme.spacings.medium24)),
            textAlign: 'center',
          }}
        >
          <QRCode value={address} />
        </Box>

        <FormGroup>
          <WideField
            label={t('Address')}
            defaultValue={address}
            disabled
            allowCopy
          />
        </FormGroup>

        <Box
          css={{
            ...margin(rem(theme.spacings.medium24)),
            textAlign: 'center',
          }}
        >
          <Button
            onClick={() => {
              setConfirmModalShow(true)
            }}
          >
            Request test LA
          </Button>
        </Box>
      </Box>

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
              {t('Request some test amount of LA from faucet')}
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
                onClose()
                requestTestLA(address)
              }}
            >
              {t('Submit')}
            </Button>
          </Box>
        </Flex>
      </Modal>
    </Box>
  )
}

const WideField = props => <Field {...props} style={{width: rem(296)}} />

ReceiveForm.propTypes = {
  address: PropTypes.string,
  onClose: PropTypes.func,
}

export default ReceiveForm
