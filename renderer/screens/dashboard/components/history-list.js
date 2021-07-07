import React from 'react'
import {useTranslation} from 'react-i18next'

function HistoryList() {
  const {t} = useTranslation()
  const data = [
    {
      token: '0x7042fd2a87cf1d2c1a57527edfb0ec3db8d84ae9',
      amount: 120,
      destination: '0x7042fd2a87cf1d2c1a57527edfb0ec3db8d84ae9',
    },
    {
      token: 'a0x7042fd2a87cf1d2c1a57527edfb0ec3db8d84ae9',
      amount: 120,
      destination: '0x7042fd2a87cf1d2c1a57527edfb0ec3db8d84ae9',
    },
    {
      token: 'a0x7042fd2a87cf1d2c1a57527edfb0ec3db8d84ae9',
      amount: 120,
      destination: '0x7042fd2a87cf1d2c1a57527edfb0ec3db8d84ae9',
    },
  ]

  return (
    <div className="table-block P-token-table">
      <div className="table-header">
        <ul className="table-tr">
          <li title={t('Token')}>{t('Token')}</li>
          <li title={t('Destination')}> {t('Destination')}</li>
          <li title={t('Amount')}> {t('Amount')}</li>
        </ul>
      </div>
      <div className="table-body">
        {data.map((item, index) => (
          <ul key={index} className="table-tr">
            <li>{item.token || '—'}</li>
            <li>{item.destination || '—'}</li>
            <li>{item.amount || '—'}</li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default HistoryList
