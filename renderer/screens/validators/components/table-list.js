import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

function TableList({dataList = []}) {
  const {t} = useTranslation()

  return (
    <div className="table-block P-validators-table">
      <div className="table-header">
        <ul className="table-tr">
          <li title={t('ip')}>{t('ip')}</li>
          <li title={t('Connections')}> {t('Connections')}</li>
          <li title={t('Status')}> {t('Status')}</li>
          <li title={t('Address text')}> {t('Address text')}</li>
          <li title={t('Block')}> {t('Block')}</li>
          <li title={t('Pool')}> {t('Pool')}</li>
          <li title={t('Validator At Max Height')}>
            {' '}
            {t('Validator At Max Height')}
          </li>
        </ul>
      </div>
      <div className="table-body">
        {dataList.map((item, index) => (
          <ul key={index} className="table-tr">
            <li title={item.ip ? item.ip.toString() : 'x'}>{item.ip || '—'}</li>
            <li title={item.connection ? item.connection.toString() : 'x'}>
              {item.connections || '—'}
            </li>
            <li title={item.status ? item.status.toString() : 'x'}>
              {item.status || '—'}
            </li>
            <li title={item.address ? item.address.toString() : 'x'}>
              {item.address || '—'}
            </li>
            <li title={item.block ? item.block.toString() : 'x'}>
              {item.block || '—'}
            </li>
            <li title={item.txes ? item.txes.toString() : 'x'}>
              {item.txes || '—'}
            </li>
            <li
              title={
                item.validatorAtMaxHeight
                  ? item.validatorAtMaxHeight.toString()
                  : 'x'
              }
            >
              {item.validatorAtMaxHeight.toString() || '—'}
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}

TableList.propTypes = {
  dataList: PropTypes.array,
}

export default TableList
