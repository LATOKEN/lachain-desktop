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
          <li title={t('connections')}> {t('connections')}</li>
          <li title={t('status')}> {t('status')}</li>
          <li title={t('address')}> {t('address')}</li>
          <li title={t('block')}> {t('block')}</li>
          <li title={t('pool')}> {t('pool')}</li>
          <li title={t('validatorAtMaxHeight')}>
            {' '}
            {t('validatorAtMaxHeight')}
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
            <li title={item.pool ? item.pool.toString() : 'x'}>
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
